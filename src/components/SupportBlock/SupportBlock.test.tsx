import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SupportBlock from "./SupportBlock";

// расширяем тип глобального объекта только для тестов, убрали ошибку
declare global {
  var __emailValue: string | undefined;
}

// мок для SubscribeForm
vi.mock("../UI/SubscribeForm/SubscribeForm", () => ({
  default: ({ onSubmit, isLoading, error }: any) => (
    <div>
      <input
        type="email"
        aria-label="email-input"
        onChange={(e) => (globalThis.__emailValue = e.target.value)}
      />
      <button
        onClick={() => onSubmit(globalThis.__emailValue)}
        disabled={isLoading}
      >
        Subscribe
      </button>
      {error && <p>{error}</p>}
    </div>
  ),
}));

const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("SupportBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("рендерит заголовки и ссылки", () => {
    render(
      <MemoryRouter>
        <SupportBlock />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /go to support and contact page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page newsletter/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page bank news/i })
    ).toBeInTheDocument();
  });

  it("показывает success сообщение если уже подписан (localStorage)", () => {
    localStorage.setItem("bank_newsletter_subscribed", "true");

    render(
      <MemoryRouter>
        <SupportBlock />
      </MemoryRouter>
    );

    expect(screen.getByText(/you are already subscribed/i)).toBeInTheDocument();
  });

  it("отправляет email и показывает success сообщение при успешной подписке", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    render(
      <MemoryRouter>
        <SupportBlock />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8080/email",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "test@example.com" }),
        })
      );
      expect(
        screen.getByText(/you are already subscribed/i)
      ).toBeInTheDocument();
      expect(localStorage.getItem("bank_newsletter_subscribed")).toBe("true");
    });
  });

  it("показывает ошибку при сетевой ошибке", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <SupportBlock />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("email-input"), {
      target: { value: "fail@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/network error\. could not connect/i)
      ).toBeInTheDocument();
    });
  });
});
