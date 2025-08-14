import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikErrors, FormikHelpers } from "formik";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./ScoringPage.module.css";

//решение cors
const API_BASE =
  import.meta.env.MODE === "development"
    ? "" // пусто, пойдёт через прокси
    : "https://alekseikutukov.github.io/NeoflexProject/"; // адрес бэка для GitHub Pages

interface ScoringFormValues {
  gender: string;
  maritalStatus: string;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: string;
  employerINN: string;
  salary: "";
  position: string;
  workExperienceTotal: string;
  workExperienceCurrent: string;
}

interface ScoringFormProps {
  onSuccess: () => void;
}

const ScoringPage: React.FC<ScoringFormProps> = ({ onSuccess }) => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: ScoringFormValues = {
    gender: "",
    maritalStatus: "",
    dependentAmount: -1,
    passportIssueDate: "",
    passportIssueBranch: "",
    employmentStatus: "",
    employerINN: "",
    salary: "",
    position: "",
    workExperienceTotal: "",
    workExperienceCurrent: "",
  };

  const validateForm = (values: ScoringFormValues) => {
    const errors: FormikErrors<ScoringFormValues> = {};
    const today = new Date();

    if (!values.gender) errors.gender = "Please select gender";
    if (!values.maritalStatus)
      errors.maritalStatus = "Please select your marital status";
    if (values.dependentAmount == null) {
      errors.dependentAmount = "Please select the number of children";
    }

    if (!values.passportIssueDate) {
      errors.passportIssueDate = "Please select a date";
    } else if (new Date(values.passportIssueDate) > today) {
      errors.passportIssueDate = "The issue date cannot be in the future";
    }

    if (!values.passportIssueBranch) {
      errors.passportIssueBranch = "Department code is required";
    } else if (!/^\d{3}-\d{3}$/.test(values.passportIssueBranch)) {
      errors.passportIssueBranch = "Incorrect format (eg 123-456)";
    }

    if (!values.employmentStatus)
      errors.employmentStatus = "Please select your employment status";

    if (!values.employerINN) {
      errors.employerINN = "INN is mandatory";
    } else if (!/^\d{12}$/.test(values.employerINN)) {
      errors.employerINN = "The TIN must consist of 12 digits.";
    }

    if (!values.salary || values.salary <= 0) {
      errors.salary = "Salary must be positive";
    }

    if (!values.position) errors.position = "Please select a position";

    if (!values.workExperienceTotal) {
      errors.workExperienceTotal = "Please enter your total length of service";
    } else if (!/^\d+$/.test(values.workExperienceCurrent)) {
      errors.workExperienceCurrent = "Please enter only numbers";
    } else if (values.workExperienceTotal.length > 2) {
      errors.workExperienceTotal = "Experience cannot exceed 99 years";
    } else if (Number(values.workExperienceTotal) > 99) {
      errors.workExperienceTotal = "Experience cannot exceed 99 years";
    }

    if (!values.workExperienceCurrent) {
      errors.workExperienceCurrent =
        "Please enter your current length of service";
    } else if (!/^\d+$/.test(values.workExperienceCurrent)) {
      errors.workExperienceCurrent = "Please enter only numbers";
    } else if (values.workExperienceCurrent.length > 2) {
      errors.workExperienceCurrent = "Experience cannot exceed 99 years";
    } else if (Number(values.workExperienceCurrent) > 99) {
      errors.workExperienceCurrent = "Experience cannot exceed 99 years";
    }

    return errors;
  };

  const handleSubmit = async (
    values: ScoringFormValues,
    { setSubmitting }: FormikHelpers<ScoringFormValues>
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        gender: values.gender,
        maritalStatus: values.maritalStatus,
        dependentAmount: values.dependentAmount,
        passportIssueDate: values.passportIssueDate,
        passportIssueBranch: values.passportIssueBranch,
        employmentStatus: values.employmentStatus,
        employerINN: values.employerINN,
        salary: values.salary,
        position: values.position,
        workExperienceTotal: values.workExperienceTotal,
        workExperienceCurrent: values.workExperienceCurrent,
      };

      const res = await fetch(
        `${API_BASE}/application/registration/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ошибка скоринга: ${res.status} — ${errText}`);
      }

      onSuccess();
    } catch (error) {
      console.error("Scoring form submission error:", error);
      alert("Ошибка отправки данных для скоринга.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.scoringFormContainer}>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {() => (
          <Form className={styles.scoringForm}>
            <div className={styles.scoringForm__header}>
              <h2 className={styles.scoringForm__title}>
                Continuation of the application
              </h2>
              <div className={styles.scoringForm__info}>Step 2 of 5</div>
            </div>
            <div className={styles.scoringForm__grid}>
              <div className={styles.scoringForm__gender}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="gender">
                    What's your gender<span className={styles.required}>*</span>
                  </label>
                  <Field as="select" name="gender" className={styles.select}>
                    <option value="" disabled></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.scoringForm__marital}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="maritalStatus">
                    Your marital status
                    <span className={styles.required}>*</span>
                  </label>
                  <Field
                    as="select"
                    name="maritalStatus"
                    className={styles.select}
                  >
                    <option value="" disabled></option>
                    <option value="MARRIED">Married</option>
                    <option value="SINGLE">Single</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOW_WIDOWER">Widow/Widower</option>
                  </Field>
                  <ErrorMessage
                    name="maritalStatus"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.scoringForm__dependents}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="dependentAmount">
                    Your number of dependents
                    <span className={styles.required}>*</span>
                  </label>

                  <Field
                    as="select"
                    name="dependentAmount"
                    className={styles.select}
                  >
                    <option value="-1" disabled></option>
                    <option value="0">No</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </Field>

                  <ErrorMessage
                    name="dependentAmount"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.scoringForm__passport}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="passportIssueDate">
                    Date of issue of the passport
                    <span className={styles.required}>*</span>
                  </label>
                  <Field
                    name="passportIssueDate"
                    type="date"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="passportIssueDate"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.scoringForm__division}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="passportIssueBranch">
                    Division code<span className={styles.required}>*</span>
                  </label>
                  <Field
                    name="passportIssueBranch"
                    type="text"
                    placeholder="000000"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="passportIssueBranch"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>

            <h3 className={styles.scoringForm__sectionTitle}>Employment</h3>

            <div className={styles.scoringForm__gridTwo}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="employmentStatus">
                  Your employment status
                  <span className={styles.required}>*</span>
                </label>
                <Field
                  as="select"
                  name="employmentStatus"
                  className={styles.select}
                >
                  <option value="" disabled></option>
                  <option value="UNEMPLOYED">Unemployed</option>
                  <option value="SELF_EMPLOYED">Self employed</option>
                  <option value="EMPLOYED">Employed</option>
                  <option value="BUSINESS_OWNER">Busines owner</option>
                </Field>
                <ErrorMessage
                  name="employmentStatus"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="employerINN">
                  Your employer INN<span className={styles.required}>*</span>
                </label>
                <Field
                  name="employerINN"
                  type="text"
                  placeholder="000000000000"
                  className={styles.input}
                />
                <ErrorMessage
                  name="employerINN"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="salary">
                  Your salary<span className={styles.required}>*</span>
                </label>
                <Field
                  name="salary"
                  type="text"
                  placeholder="For example 100 000"
                  className={styles.input}
                />
                <ErrorMessage
                  name="salary"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="position">
                  Your position<span className={styles.required}>*</span>
                </label>
                <Field as="select" name="position" className={styles.select}>
                  <option value="" disabled></option>
                  <option value="WORKER">Worker</option>
                  <option value="MID_MANAGER">Mid manager</option>
                  <option value="TOP_MANAGER">Top manager</option>
                  <option value="OWNER">Owner</option>
                </Field>
                <ErrorMessage
                  name="position"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="workExperienceTotal">
                  Your work experience total
                  <span className={styles.required}>*</span>
                </label>
                <Field
                  name="workExperienceTotal"
                  type="text"
                  maxLength={2}
                  placeholder="For example 10"
                  className={styles.input}
                />
                <ErrorMessage
                  name="workExperienceTotal"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="workExperienceCurrent">
                  Your work experience current
                  <span className={styles.required}>*</span>
                </label>
                <Field
                  name="workExperienceCurrent"
                  type="text"
                  maxLength={2}
                  placeholder="For example 2"
                  className={styles.input}
                />
                <ErrorMessage
                  name="workExperienceCurrent"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Continue
              </button>
            </div>
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
};

export default ScoringPage;
