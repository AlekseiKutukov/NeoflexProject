import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("компонент Checkbox", () => {
  it("Правильно отображает label", () => {
    render(<Checkbox checked={false} onChange={() => {}} label="I agree" />);
    expect(screen.getByText(/i agree/i)).toBeInTheDocument();
  });

  it("Чекбокс включен, при пропсе checked = true", () => {
    render(<Checkbox checked={true} onChange={() => {}} label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("Чекбокс выключен, при пропсе checked = false", () => {
    render(<Checkbox checked={false} onChange={() => {}} label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("onChange сработал при активации флага чекбокса", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={handleChange} label="Click me" />
    );
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
