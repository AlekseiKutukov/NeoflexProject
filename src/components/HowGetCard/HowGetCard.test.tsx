import { render, screen } from "@testing-library/react";
import HowGetCard from "./HowGetCard";

describe("HowGetCard", () => {
  it("Компонент рендерится", () => {
    render(<HowGetCard />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
