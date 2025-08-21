import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikErrors, FormikHelpers } from "formik";
import { useParams } from "react-router-dom";
import { useProgressStore } from "../../store/progressStore";
import StepOf from "../StepOf/StepOf";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./ScoringPage.module.css";

const API_BASE = import.meta.env.VITE_API_BASE;
interface EmploymentValues {
  employmentStatus: string;
  employerINN: string;
  salary: string;
  position: string;
  workExperienceTotal: string;
  workExperienceCurrent: string;
}

interface ScoringFormValues {
  gender: string;
  maritalStatus: string;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: EmploymentValues;
}

interface ScoringFormProps {
  onSuccess: () => void;
}

const ScoringPage: React.FC<ScoringFormProps> = ({ onSuccess }) => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentStep = useProgressStore((state) => state.setCurrentStep);

  const localStorageData = localStorage.getItem("loan-application-state");
  let accountIdFromLocalStorage = "";

  if (localStorageData) {
    try {
      const parsedData = JSON.parse(localStorageData);
      const offers = parsedData?.state?.offers;
      if (offers && offers.length > 0) {
        accountIdFromLocalStorage = String(offers[0].applicationId);
      }
    } catch (e) {
      console.error("Ошибка парсинга данных из localStorage", e);
    }
  }

  const initialValues = {
    gender: "",
    maritalStatus: "",
    dependentAmount: -1,
    passportIssueDate: "",
    passportIssueBranch: "",
    employment: {
      employmentStatus: "",
      employerINN: "",
      salary: "",
      position: "",
      workExperienceTotal: "",
      workExperienceCurrent: "",
    },
  };
  const validateForm = (values: ScoringFormValues) => {
    const errors: FormikErrors<ScoringFormValues> = {};
    const today = new Date();

    if (!values.gender) errors.gender = "Please select gender";
    if (!values.maritalStatus)
      errors.maritalStatus = "Please select your marital status";
    if (values.dependentAmount == null || values.dependentAmount < 0) {
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

    const employmentErrors: FormikErrors<EmploymentValues> = {};

    if (!values.employment.employmentStatus) {
      employmentErrors.employmentStatus =
        "Please select your employment status";
    }

    if (!values.employment.employerINN) {
      employmentErrors.employerINN = "INN is mandatory";
    } else if (!/^\d{12}$/.test(values.employment.employerINN)) {
      employmentErrors.employerINN = "The TIN must consist of 12 digits.";
    }

    if (!values.employment.salary) {
      employmentErrors.salary = "Salary is required";
    } else if (!/^\d+$/.test(values.employment.salary)) {
      employmentErrors.salary = "Salary must contain only digits";
    } else if (+values.employment.salary <= 0) {
      employmentErrors.salary = "Salary must be positive";
    }

    if (!values.employment.position) {
      employmentErrors.position = "Please select a position";
    }

    if (
      !values.employment.workExperienceTotal ||
      +values.employment.workExperienceTotal < 0 ||
      +values.employment.workExperienceTotal > 99
    ) {
      employmentErrors.workExperienceTotal =
        "Please enter your total length of service (0-99 years)";
    }

    if (
      !values.employment.workExperienceCurrent ||
      +values.employment.workExperienceCurrent < 0 ||
      +values.employment.workExperienceCurrent > 99
    ) {
      employmentErrors.workExperienceCurrent =
        "Please enter your current length of service (0-99 years)";
    } else if (
      values.employment.workExperienceCurrent >
      values.employment.workExperienceTotal
    ) {
      employmentErrors.workExperienceCurrent =
        "Current experience cannot be greater than total experience";
    }

    if (Object.keys(employmentErrors).length > 0) {
      errors.employment = employmentErrors;
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
        dependentAmount: +values.dependentAmount,
        passportIssueDate: values.passportIssueDate,
        passportIssueBranch: values.passportIssueBranch,
        employment: {
          employmentStatus: values.employment.employmentStatus,
          employerINN: values.employment.employerINN,
          salary: +values.employment.salary,
          position: values.employment.position,
          workExperienceTotal: values.employment.workExperienceTotal,
          workExperienceCurrent: values.employment.workExperienceCurrent,
        },
        account: accountIdFromLocalStorage,
      };

      // const payloadFree = {
      //   gender: "MALE",
      //   maritalStatus: "SINGLE",
      //   dependentAmount: 1,
      //   passportIssueDate: "2025-08-15",
      //   passportIssueBranch: "123-456",
      //   employment: {
      //     employmentStatus: "EMPLOYED",
      //     employerINN: "123456789012",
      //     salary: 100000,
      //     position: "WORKER",
      //     workExperienceTotal: 15,
      //     workExperienceCurrent: 4,
      //   },
      //   account: "11223344556677889900",
      // };

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

      // console.log("payload ", payload);
      setCurrentStep(2);
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
            <StepOf title={"Continuation of the application"} number={2} />

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
                <label
                  className={styles.label}
                  htmlFor="employment.employmentStatus"
                >
                  Your employment status
                  <span className={styles.required}>*</span>
                </label>
                <Field
                  as="select"
                  name="employment.employmentStatus"
                  className={styles.select}
                >
                  <option value="" disabled></option>
                  <option value="UNEMPLOYED">Unemployed</option>
                  <option value="SELF_EMPLOYED">Self employed</option>
                  <option value="EMPLOYED">Employed</option>
                  <option value="BUSINESS_OWNER">Busines owner</option>
                </Field>
                <ErrorMessage
                  name="employment.employmentStatus"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label
                  className={styles.label}
                  htmlFor="employment.employerINN"
                >
                  Your employer INN<span className={styles.required}>*</span>
                </label>
                <Field
                  name="employment.employerINN"
                  type="text"
                  placeholder="000000000000"
                  className={styles.input}
                />
                <ErrorMessage
                  name="employment.employerINN"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="employment.salary">
                  Your salary<span className={styles.required}>*</span>
                </label>
                <Field
                  name="employment.salary"
                  type="text"
                  placeholder="For example 100 000"
                  className={styles.input}
                />
                <ErrorMessage
                  name="employment.salary"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="employment.position">
                  Your position<span className={styles.required}>*</span>
                </label>
                <Field
                  as="select"
                  name="employment.position"
                  className={styles.select}
                >
                  <option value="" disabled></option>
                  <option value="WORKER">Worker</option>
                  <option value="MID_MANAGER">Mid manager</option>
                  <option value="TOP_MANAGER">Top manager</option>
                  <option value="OWNER">Owner</option>
                </Field>
                <ErrorMessage
                  name="employment.position"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label
                  className={styles.label}
                  htmlFor="employment.workExperienceTotal"
                >
                  Your work experience total
                  <span className={styles.required}>*</span>
                </label>
                <Field
                  name="employment.workExperienceTotal"
                  type="number"
                  min={0}
                  max={99}
                  placeholder="For example 10"
                  className={styles.input}
                />
                <ErrorMessage
                  name="employment.workExperienceTotal"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label
                  className={styles.label}
                  htmlFor="employment.workExperienceCurrent"
                >
                  Your work experience current
                  <span className={styles.required}>*</span>
                </label>
                <Field
                  name="employment.workExperienceCurrent"
                  type="number"
                  min={0}
                  max={99}
                  placeholder="For example 2"
                  className={styles.input}
                />
                <ErrorMessage
                  name="employment.workExperienceCurrent"
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
