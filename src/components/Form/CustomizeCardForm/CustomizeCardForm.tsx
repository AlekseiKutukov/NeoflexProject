import { useState } from "react";
import { useApplicationStore } from "../../../store/applicationStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikErrors, FormikHelpers } from "formik";
import Spinner from "../../UI/Spinner/Spinner";
import CheckIcon from "../../../assets/icons/CheckIcon.svg";
import CrossIcon from "../../../assets/icons/CrossIcon.svg";
import { forwardRef } from "react";
import type { Ref, ChangeEvent } from "react";
import styles from "./CustomizeCardForm.module.css";

interface CustomFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

interface CustomizeCardFormProps {
  onSuccess: () => void;
}

const CustomInput: React.FC<
  CustomFieldProps & {
    value: string | number;
    hasError: boolean;
    isTouched: boolean;
    isValid: boolean;
  }
> = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
  maxLength,
  hasError,
  isTouched,
  isValid,
  min,
  max,
}) => {
  return (
    <div className={styles.customizeCardForm__fieldGroup}>
      <label htmlFor={name} className={styles.customizeCardForm__label}>
        {label}
        {required && (
          <span className={styles.customizeCardForm__required}>*</span>
        )}
      </label>
      <div className={styles.customizeCardForm__inputWrapper}>
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${styles.customizeCardForm__input} ${hasError && isTouched ? styles.customizeCardForm__inputError : ""}`}
          maxLength={maxLength}
          min={min}
          max={max}
        />
        {isTouched && (
          <div className={styles.customizeCardForm__validationIcon}>
            {isValid && <img src={CheckIcon} alt="Valid" />}
            {hasError && <img src={CrossIcon} alt="Invalid" />}
          </div>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className={styles.customizeCardForm__error}
      />
    </div>
  );
};

const CustomSelect: React.FC<
  CustomFieldProps & { hasError: boolean; isTouched: boolean; isValid: boolean }
> = ({
  label,
  name,
  options = [],
  required,
  hasError,
  isTouched,
  isValid,
  onChange,
  value,
}) => {
  return (
    <div className={styles.customizeCardForm__fieldGroup}>
      <label htmlFor={name} className={styles.customizeCardForm__label}>
        {label}{" "}
        {required && (
          <span className={styles.customizeCardForm__required}>*</span>
        )}
      </label>
      <div className={styles.customizeCardForm__inputWrapper}>
        <Field
          name={name}
          as="select"
          className={`${styles.customizeCardForm__input} ${styles.customizeCardForm__select} ${hasError && isTouched ? styles.customizeCardForm__inputError : ""}`}
          onChange={onChange}
          value={value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        {isTouched && (
          <div className={styles.customizeCardForm__validationIcon}>
            {isValid && <img src={CheckIcon} alt="Valid" />}
            {hasError && <img src={CrossIcon} alt="Invalid" />}
          </div>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className={styles.customizeCardForm__error}
      />
    </div>
  );
};

interface FormValues {
  amount: number;
  term: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
}

const CustomizeCardForm = forwardRef(
  ({ onSuccess }: CustomizeCardFormProps, ref: Ref<HTMLDivElement>) => {
    const { amount, term, setAmount, setTerm } = useApplicationStore();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: FormValues = {
      amount: 150000,
      term: "6 month",
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      birthdate: "",
      passportSeries: "",
      passportNumber: "",
    };

    const validateForm = (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      const today = new Date();

      const minAmount = 150000;
      const maxAmount = 600000;
      if (values.amount < minAmount || values.amount > maxAmount) {
        errors.amount = `Amount must be between ${minAmount.toLocaleString("ru-RU")} and ${maxAmount.toLocaleString("ru-RU")}`;
      }

      const isLatin = (str: string) => /^[a-zA-Z\s.-]*$/.test(str);

      if (!values.firstName.trim()) {
        errors.firstName = "First name cannot be empty";
      } else if (!isLatin(values.firstName)) {
        errors.firstName = "Must be in Latin characters";
      }

      if (!values.lastName.trim()) {
        errors.lastName = "Last name cannot be empty";
      } else if (!isLatin(values.lastName)) {
        errors.lastName = "Must be in Latin characters";
      }

      if (values.middleName?.trim() && !isLatin(values.middleName)) {
        errors.middleName = "Must be in Latin characters";
      }

      if (!values.email.trim()) {
        errors.email = "Email cannot be empty";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.birthdate) {
        errors.birthdate = "Birthdate cannot be empty";
      } else {
        const birthDate = new Date(values.birthdate);
        if (isNaN(birthDate.getTime())) {
          errors.birthdate = "Invalid date";
        } else {
          const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          birthDate.setHours(0, 0, 0, 0);
          eighteenYearsAgo.setHours(0, 0, 0, 0);

          if (birthDate > eighteenYearsAgo) {
            errors.birthdate = "You must be at least 18 years old";
          }
        }
      }

      if (!values.passportSeries.trim()) {
        errors.passportSeries = "Passport series cannot be empty";
      } else if (!/^\d{4}$/.test(values.passportSeries)) {
        errors.passportSeries = "Must be 4 digits";
      }

      if (!values.passportNumber.trim()) {
        errors.passportNumber = "Passport number cannot be empty";
      } else if (!/^\d{6}$/.test(values.passportNumber)) {
        errors.passportNumber = "Must be 6 digits";
      }

      return errors;
    };

    const handleSubmit = async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      setIsLoading(true);
      try {
        setAmount(values.amount);
        setTerm(values.term);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onSuccess();
        // console.log("Form data to send:", values);
        // alert("Form submitted successfully!");
      } catch (error) {
        // console.error("Form submission error:", error);
        alert("Error submitting form.");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    };

    return (
      <div ref={ref} className={styles.customizeCardForm}>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({ values, setFieldValue, touched, errors }) => (
            <Form className={styles.customizeCardForm__form}>
              <div className={styles.customizeCardForm__topSection}>
                <div className={styles.customizeCardForm__left}>
                  <div className={styles.customizeCardForm__header}>
                    <h2 className={styles.customizeCardForm__title}>
                      Customize your card
                    </h2>
                    <div className={styles.customizeCardForm__info}>
                      Step 1 of 5
                    </div>
                  </div>

                  {/* Секция выбора суммы */}
                  <div className={styles.customizeCardForm__section}>
                    <div className={styles.customizeCardForm__sectionHeader}>
                      <h3 className={styles.customizeCardForm__sectionTitle}>
                        Select amount
                      </h3>
                    </div>
                    <div className={styles.customizeCardForm__sliderWrapper}>
                      <input
                        type="text"
                        name="amount"
                        value={values.amount}
                        onChange={(e) =>
                          setFieldValue("amount", Number(e.target.value))
                        }
                        onBlur={() =>
                          setFieldValue(
                            "amount",
                            Math.max(150000, Math.min(600000, values.amount))
                          )
                        }
                        min="150000"
                        max="600000"
                        className={`${styles.customizeCardForm__amountInput} ${touched.amount && errors.amount ? styles.customizeCardForm__inputError : ""}`}
                      />
                      {/* Slider для суммы */}
                      <input
                        type="range"
                        name="amount"
                        value={values.amount}
                        onChange={(e) =>
                          setFieldValue("amount", Number(e.target.value))
                        }
                        min="150000"
                        max="600000"
                        step="1000"
                        className={styles.customizeCardForm__rangeSlider}
                      />
                      <div
                        className={styles.customizeCardForm__amountDisplayRange}
                      >
                        <span className={styles.customizeCardForm__amountValue}>
                          150 000
                        </span>
                        <span className={styles.customizeCardForm__amountValue}>
                          600 000
                        </span>
                      </div>
                      {touched.amount && errors.amount && (
                        <div className={styles.customizeCardForm__error}>
                          {errors.amount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.customizeCardForm__right}>
                  <div
                    className={styles.customizeCardForm__chosenAmountDisplay}
                  >
                    You have chosen the amount
                  </div>
                  <span className={styles.customizeCardForm__chosenAmountValue}>
                    {values.amount.toLocaleString("ru-RU")} ₽
                  </span>
                  <div className={styles.customizeCardForm__underline}></div>
                </div>
              </div>

              {/* Секция контактной информации */}
              <div className={styles.customizeCardForm__sectionForm}>
                <h3 className={styles.customizeCardForm__sectionFormTitle}>
                  Contact Information
                </h3>
                <div className={styles.customizeCardForm__grid}>
                  <CustomInput
                    label="Your last name"
                    name="lastName"
                    placeholder="For Example Doe"
                    required
                    value={values.lastName}
                    hasError={!!(touched.lastName && errors.lastName)}
                    isTouched={!!touched.lastName}
                    isValid={!!(touched.lastName && !errors.lastName)}
                  />

                  <CustomInput
                    label="Your first name"
                    name="firstName"
                    placeholder="For Example Jhon"
                    required
                    value={values.firstName}
                    hasError={!!(touched.firstName && errors.firstName)}
                    isTouched={!!touched.firstName}
                    isValid={!!(touched.firstName && !errors.firstName)}
                  />

                  <CustomInput
                    label="Your patronymic"
                    name="middleName"
                    placeholder="For Example Victorovich"
                    value={values.middleName || ""}
                    hasError={!!(touched.middleName && errors.middleName)}
                    isTouched={!!touched.middleName}
                    isValid={!!(touched.middleName && !errors.middleName)}
                  />

                  <CustomSelect
                    label="Select term"
                    name="term"
                    required
                    options={[
                      { value: "6 month", label: "6 months" },
                      { value: "12 month", label: "12 months" },
                      { value: "18 month", label: "18 months" },
                      { value: "24 month", label: "24 months" },
                    ]}
                    onChange={(e) => setFieldValue("term", e.target.value)}
                    value={values.term}
                    hasError={!!(touched.term && errors.term)}
                    isTouched={!!touched.term}
                    isValid={!!(touched.term && !errors.term)}
                  />

                  <CustomInput
                    label="Your email"
                    name="email"
                    type="email"
                    placeholder="test@gmail.com"
                    required
                    value={values.email}
                    hasError={!!(touched.email && errors.email)}
                    isTouched={!!touched.email}
                    isValid={!!(touched.email && !errors.email)}
                  />

                  <CustomInput
                    label="Your date of birth"
                    name="birthdate"
                    type="date"
                    required
                    value={values.birthdate}
                    hasError={!!(touched.birthdate && errors.birthdate)}
                    isTouched={!!touched.birthdate}
                    isValid={!!(touched.birthdate && !errors.birthdate)}
                    max={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  />

                  <CustomInput
                    label="Your passport series"
                    name="passportSeries"
                    type="text"
                    placeholder="0000"
                    required
                    maxLength={4}
                    value={values.passportSeries}
                    hasError={
                      !!(touched.passportSeries && errors.passportSeries)
                    }
                    isTouched={!!touched.passportSeries}
                    isValid={
                      !!(touched.passportSeries && !errors.passportSeries)
                    }
                  />

                  <CustomInput
                    label="Your passport number"
                    name="passportNumber"
                    type="text"
                    placeholder="000000"
                    required
                    maxLength={6}
                    value={values.passportNumber}
                    hasError={
                      !!(touched.passportNumber && errors.passportNumber)
                    }
                    isTouched={!!touched.passportNumber}
                    isValid={
                      !!(touched.passportNumber && !errors.passportNumber)
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.customizeCardForm__submitButton}
              >
                Continue
              </button>
            </Form>
          )}
        </Formik>

        {isLoading && (
          <div className={styles.spinnerOverlay}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
);

export default CustomizeCardForm;
