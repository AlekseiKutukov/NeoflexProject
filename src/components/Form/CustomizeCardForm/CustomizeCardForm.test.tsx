import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CustomizeCardForm from "./CustomizeCardForm";

// Мокаем store
vi.mock("../../../store/applicationStore", () => ({
  useApplicationStore: {
    setState: vi.fn(),
  },
}));

// Мокаем fetch
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("CustomizeCardForm", () => {
  const onSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Рендерится с заголовком", () => {
    render(<CustomizeCardForm onSuccess={onSuccess} />);
    expect(
      screen.getByRole("heading", { name: /customize your card/i })
    ).toBeInTheDocument();
  });

  it("Показывает ошибки при пустых обязательных полях", async () => {
    render(<CustomizeCardForm onSuccess={onSuccess} />);
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText(/first name cannot be empty/i)
    ).toBeVisible();
    expect(await screen.findByText(/last name cannot be empty/i)).toBeVisible();
    expect(await screen.findByText(/email cannot be empty/i)).toBeVisible();
    expect(await screen.findByText(/birthdate cannot be empty/i)).toBeVisible();
    expect(
      await screen.findByText(/passport series cannot be empty/i)
    ).toBeVisible();
    expect(
      await screen.findByText(/passport number cannot be empty/i)
    ).toBeVisible();
  });

  it("Отправляет форму при валидных данных", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, offer: "test offer" }],
    });

    render(<CustomizeCardForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByPlaceholderText(/for example jhon/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/for example doe/i), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText(/test@gmail.com/i), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/дд.мм.гг/i), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("0000"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("000000"), {
      target: { value: "567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8080/application",
        expect.any(Object)
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
