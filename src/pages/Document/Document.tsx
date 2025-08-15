import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Импортируем useNavigate
import styles from "./Document.module.css";
import Table from "../../components/Table/Table";
import Checkbox from "../../components/Checkbox/Checkbox";
import Spinner from "../../components/UI/Spinner/Spinner";
import AfterStep from "../../components/AfterStep/AfterStep";
import Modal from "../../components/Modal/Modal"; // Импортируем компонент модального окна

interface Payment {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

interface Credit {
  amount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  psk: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  paymentSchedule: Payment[];
}

interface ApplicationData {
  id: number;
  client: object;
  credit: Credit;
  status: string;
  creationDate: string;
  signDate: string | null;
  sesCode: string | null;
  statusHistory: object[];
}

const API_BASE =
  import.meta.env.MODE === "development"
    ? ""
    : "https://alekseikutukov.github.io/NeoflexProject/";

const Document: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate(); // Используем хук для навигации
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDenialConfirmed, setIsDenialConfirmed] = useState(false);

  useEffect(() => {
    const fetchPaymentSchedule = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/admin/application/${applicationId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch payment schedule.");
        }

        const data: ApplicationData = await res.json();

        const paymentSchedule = data?.credit?.paymentSchedule;

        if (paymentSchedule && Array.isArray(paymentSchedule)) {
          setPayments(paymentSchedule);
        } else {
          throw new Error("Invalid payment schedule data received.");
        }
      } catch (err) {
        setError("Failed to load payment schedule.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaymentSchedule();
  }, [applicationId]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/document/${applicationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAgreed: true }),
      });
      if (!res.ok) {
        throw new Error("Failed to send agreement.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send consent.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчики для модального окна
  const handleDenyClick = () => {
    setIsModalOpen(true);
    setIsDenialConfirmed(false); // Сброс состояния, чтобы показать первый этап модального окна
  };

  const handleDenyConfirm = () => {
    setIsDenialConfirmed(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDenialConfirmed(false);
  };

  const handleGoHome = () => {
    navigate("/"); // Перенаправляем пользователя на главную страницу
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <AfterStep
          title={"Documents are formed"}
          text={"Documents for signing will be sent to your email"}
        />
      </div>
    );
  }

  if (error) {
    return <AfterStep title={"Error"} text={error} />;
  }

  return (
    <section className={styles.document__container}>
      <div className={styles.document__header}>
        <h2 className={styles.document__title}>Payment Schedule</h2>
        <div className={styles.document__step}>Step 3 of 5</div>
      </div>
      <Table data={payments} />
      <div className={styles.document__footer}>
        <button
          className={styles.document__denyButton}
          onClick={handleDenyClick}
        >
          Deny
        </button>
        <div className={styles.document__agreementContainer}>
          <Checkbox
            checked={isAgreed}
            onChange={handleCheckboxChange}
            label={"I agree with the payment schedule"}
          />
          <button
            className={styles.document__sendButton}
            onClick={handleSend}
            disabled={!isAgreed}
          >
            Send
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          {!isDenialConfirmed ? (
            // Первый этап модального окна
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Deny application</h3>
              <p className={styles.modalText}>
                You exactly sure, you want to cancel this application?
              </p>
              <div className={styles.modalButtons}>
                <button
                  className={styles.modalDenyButton}
                  onClick={handleDenyConfirm}
                >
                  Deny
                </button>
                <button
                  className={styles.modalCancelButton}
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Второй этап модального окна
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Deny application</h3>
              <p className={styles.modalText}>
                Your application has been deny!
              </p>
              <button
                className={styles.modalGoHomeButton}
                onClick={handleGoHome}
              >
                Go home
              </button>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
};

export default Document;
