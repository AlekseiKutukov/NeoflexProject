import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import styles from "./DenyApplicationModal.module.css";

interface DenyApplicationModalProps {
  onClose: () => void;
}

const DenyApplicationModal: React.FC<DenyApplicationModalProps> = ({
  onClose,
}) => {
  const [isDenialConfirmed, setIsDenialConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleDenyConfirm = () => {
    setIsDenialConfirmed(true);
  };

  const handleGoHome = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal onClose={onClose}>
      {!isDenialConfirmed ? (
        // Первый этап: запрос на подтверждение
        <>
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
            <button className={styles.modalCancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        // Второй этап: сообщение об отказе
        <>
          <h3 className={styles.modalTitle}>Deny application</h3>
          <p className={styles.modalText}>Your application has been deny!</p>
          <div className={styles.modalButtons}>
            <button className={styles.modalGoHomeButton} onClick={handleGoHome}>
              Go home
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DenyApplicationModal;
