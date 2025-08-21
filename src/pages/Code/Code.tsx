import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgressStore } from "../../store/progressStore";
import { checkRouteAccess } from "../../utils/routeGuard";
import Congratulations from "../../components/Congratulations/Congratulations";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Code.module.css";

const API_BASE = import.meta.env.VITE_API_BASE;

const Code: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentStep = useProgressStore((state) => state.setCurrentStep);
  const navigate = useNavigate();

  useEffect(() => {
    const desiredStep = 5;
    const isAccessGranted = checkRouteAccess(desiredStep, navigate);
    if (isAccessGranted) {
      setCurrentStep(desiredStep);
    }
  }, [navigate, setCurrentStep]);

  const handleSendCode = async (fullCode: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/document/${applicationId}/sign/code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Number(fullCode)),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid confirmation code.");
      }
      setCurrentStep(5);
      setIsSubmitted(true);
    } catch (err) {
      setError("Invalid confirmation code");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setError(null);
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value && index < 3) {
      const nextInput = document.getElementById(
        `code-input-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    const fullCode = newCode.join("");
    if (fullCode.length === 4) {
      handleSendCode(fullCode);
    }
  };

  if (isSubmitted) {
    return <Congratulations />;
  }

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <section className={styles.codeConfirmation__container}>
      <h2 className={styles.codeConfirmation__title}>
        Please enter confirmation code
      </h2>
      <div className={styles.codeConfirmation__inputs}>
        {code.map((value, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            className={`${styles.codeConfirmation__input} ${
              error ? styles.error : ""
            }`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                !e.currentTarget.value &&
                index > 0
              ) {
                const prevInput = document.getElementById(
                  `code-input-${index - 1}`
                ) as HTMLInputElement;
                if (prevInput) {
                  prevInput.focus();
                }
              }
            }}
            placeholder=" "
          />
        ))}
      </div>
      {error && <p className={styles.codeConfirmation__error}>{error}</p>}
    </section>
  );
};

export default Code;
