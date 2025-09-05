import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DenyApplicationModal from "./DenyApplicationModal";

// Мокаем react-router-dom, чтобы useNavigate не ломал тесты
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("DenyApplicationModal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("Отображает первый экран и обрабатывает отмену", () => {
    render(<DenyApplicationModal onClose={onClose} />);

    // Проверяем, что первый экран отображается
    expect(
      screen.getByText(
        /you exactly sure, you want to cancel this application\?/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deny/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();

    // Клик по Cancel вызывает onClose
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("Переходит на второй экран и закрывает при клике на 'Go home'", () => {
    render(<DenyApplicationModal onClose={onClose} />);

    // Кликаем Deny
    fireEvent.click(screen.getByRole("button", { name: /deny/i }));

    // Проверяем, что второй экран отобразился
    expect(
      screen.getByText(/your application has been deny!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go home/i })
    ).toBeInTheDocument();

    // Кликаем Go home, должен вызваться onClose
    fireEvent.click(screen.getByRole("button", { name: /go home/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
