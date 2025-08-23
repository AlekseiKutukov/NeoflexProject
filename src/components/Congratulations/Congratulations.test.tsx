import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Congratulations from "./Congratulations";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("компонент Congratulations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("рендерит изображение, заголовок, текст и кнопку", () => {
    render(<Congratulations />);

    expect(screen.getByAltText(/surprise image/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Congratulations! You have completed your new credit card./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your credit card will arrive soon. Thank you for choosing us!/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view other offers of our bank/i })
    ).toBeInTheDocument();
  });

  it("вызывает navigate('/') при клике на кнопку", () => {
    render(<Congratulations />);

    const button = screen.getByRole("button", {
      name: /view other offers of our bank/i,
    });

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
