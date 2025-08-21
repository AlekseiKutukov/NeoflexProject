import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgressStore } from "../../store/progressStore";
import { checkRouteAccess } from "../../utils/routeGuard";
import Table from "../../components/Table/Table";
import Checkbox from "../../components/Checkbox/Checkbox";
import Spinner from "../../components/UI/Spinner/Spinner";
import AfterStep from "../../components/AfterStep/AfterStep";
import StepOf from "../../components/StepOf/StepOf";
import DenyApplicationModal from "../../components/DenyApplicationModal/DenyApplicationModal";
import styles from "./Document.module.css";
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

const API_BASE = import.meta.env.VITE_API_BASE;

const Document: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const setCurrentStep = useProgressStore((state) => state.setCurrentStep);
  const navigate = useNavigate();

  useEffect(() => {
    const desiredStep = 4;
    const isAccessGranted = checkRouteAccess(desiredStep, navigate);
    if (isAccessGranted) {
      setCurrentStep(desiredStep);
    }
  }, [navigate, setCurrentStep]);

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
      setCurrentStep(3);
    } catch (err) {
      setError("Failed to send consent.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDenyClick = () => {
    setIsDenyModalOpen(true);
  };

  const handleCloseDenyModal = () => {
    setIsDenyModalOpen(false);
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
      <StepOf title={"Payment Schedule"} number={3} />
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

      {isDenyModalOpen && (
        <DenyApplicationModal onClose={handleCloseDenyModal} />
      )}
    </section>
  );
};

export default Document;
