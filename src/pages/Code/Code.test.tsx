import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import Code from "./Code";
import * as progressStore from "../../store/progressStore";
import * as routeGuard from "../../utils/routeGuard";

// Мокаем useProgressStore
const setCurrentStep = vi.fn();
vi.spyOn(progressStore, "useProgressStore").mockImplementation((selector) => {
  return selector({ setCurrentStep });
});

// Мокаем checkRouteAccess
vi.spyOn(routeGuard, "checkRouteAccess").mockImplementation(() => true);

describe("Code component", () => {
  const mockFetch = vi.fn();
  (globalThis as any).fetch = mockFetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("рендерит заголовок и 4 инпута", () => {
    render(
      <MemoryRouter initialEntries={["/code/1"]}>
        <Routes>
          <Route path="/code/:applicationId" element={<Code />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/please enter confirmation code/i)
    ).toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("отправляет код и показывает Congratulations при успехе", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    render(
      <MemoryRouter initialEntries={["/code/1"]}>
        <Routes>
          <Route path="/code/:applicationId" element={<Code />} />
        </Routes>
      </MemoryRouter>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/document/1/sign/code"),
        expect.any(Object)
      );
      expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
      expect(setCurrentStep).toHaveBeenCalledWith(5);
    });
  });

  it("показывает ошибку при неуспешной отправке кода", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    render(
      <MemoryRouter initialEntries={["/code/1"]}>
        <Routes>
          <Route path="/code/:applicationId" element={<Code />} />
        </Routes>
      </MemoryRouter>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    await waitFor(() => {
      expect(
        screen.getByText(/invalid confirmation code/i)
      ).toBeInTheDocument();
    });
  });

  it("показывает Spinner во время загрузки", async () => {
    let resolveFetch: any;
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    render(
      <MemoryRouter initialEntries={["/code/1"]}>
        <Routes>
          <Route path="/code/:applicationId" element={<Code />} />
        </Routes>
      </MemoryRouter>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    // Spinner отображается пока fetch не завершен
    expect(screen.getByTestId("spinner-container")).toBeInTheDocument();

    resolveFetch({ ok: true });

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});
