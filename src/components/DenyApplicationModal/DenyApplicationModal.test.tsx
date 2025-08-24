import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("DenyApplicationModal", () => {
  const onClose = vi.fn();

  it("Отображает первый экран и обрабатывает отмену", () => {
    // Проверяем, что первый экран отображается
    expect(screen.getByText(/you exactly sure/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deny/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();

    // Проверяем, что клик по "Cancel" вызывает onClose
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("Переходит на второй экран и закрывает при клике на 'Go home'", () => {
    // Переходим на второй экран
    fireEvent.click(screen.getByRole("button", { name: /deny/i }));

    // Проверяем, что второй экран отображается
    expect(
      screen.getByText(/your application has been deny!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go home/i })
    ).toBeInTheDocument();

    // Проверяем, что клик по "Go home" вызывает onClose
    fireEvent.click(screen.getByRole("button", { name: /go home/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
