import { forwardRef } from "react";
import type { Ref } from "react";
import styles from "./CustomizeCardForm.module.css";

const CustomizeCardForm = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className={styles.applicationFormContainer}>
      <h2>Заявка на кредитную карту</h2>
      <p>Пожалуйста, заполните все поля:</p>
      <form>
        <div>
          <label htmlFor="fullName">Полное имя:</label>
          <input type="text" id="fullName" name="fullName" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="phone">Телефон:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <button type="submit">Отправить заявку</button>
      </form>
      <div style={{ height: "500px" }}></div>
    </div>
  );
});

export default CustomizeCardForm;
