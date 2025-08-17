import type { NavigateFunction } from "react-router-dom";
import { useProgressStore } from "../store/progressStore";

interface LoanApplicationState {
  state: {
    offers: { applicationId: number }[];
  };
  version: number;
}

const getApplicationId = (): string | null => {
  const localStorageData = localStorage.getItem("loan-application-state");
  if (localStorageData) {
    try {
      const parsedData: LoanApplicationState = JSON.parse(localStorageData);
      const offers = parsedData?.state?.offers;
      if (offers && offers.length > 0) {
        return String(offers[0].applicationId);
      }
    } catch (e) {
      console.error("Ошибка парсинга данных из localStorage", e);
    }
  }
  return null;
};

const stepUrls: { [key: number]: string } = {
  1: "/loan",
  2: "/loan/:applicationId",
  3: "/loan/:applicationId/document",
  4: "/loan/:applicationId/document/sign",
  5: "/loan/:applicationId/code",
};

export const checkRouteAccess = (
  desiredStep: number,
  navigate: NavigateFunction
): boolean => {
  const { currentStep } = useProgressStore.getState();
  const applicationId = getApplicationId();

  if (!applicationId) {
    navigate(stepUrls[1], { replace: true });
    return false;
  }

  if (currentStep < desiredStep) {
    const targetUrlTemplate = stepUrls[currentStep + 1];

    const targetUrl = targetUrlTemplate
      ? targetUrlTemplate.replace(":applicationId", applicationId)
      : "/";

    console.warn(`Доступ запрещен. Перенаправление на шаг ${currentStep}`);
    navigate(targetUrl, { replace: true });
    return false;
  }

  return true;
};
