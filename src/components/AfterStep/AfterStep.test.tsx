import { render, screen } from "@testing-library/react";
import AfterStep from "./AfterStep";
import styles from "./AfterStep.module.css";

describe("компонент AfterStep", () => {
  it("Правильно отображает title и text", () => {
    //монтирует компонет в виртуальный dom
    render(<AfterStep title="Тестовый заголовок" text="Тестовый текст" />);
    //ПроверкаСуществуетЛи?(НайтиЭлемент.getByText("Test Title"))
    expect(screen.getByText("Тестовый заголовок")).toBeInTheDocument();
    expect(screen.getByText("Тестовый текст")).toBeInTheDocument();
  });

  it("Применяет правильные классы CSS", () => {
    render(<AfterStep title="Styled Title" text="Styled Text" />);

    const titleElement = screen.getByText("Styled Title");
    const textElement = screen.getByText("Styled Text");

    // Проверяем не "title", а styles.title т.к у нас css module
    expect(titleElement).toHaveClass(styles.title);
    expect(textElement).toHaveClass(styles.text);
  });
});
