import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, vi, expect } from "vitest";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

// Мокаем axios через vi.mock
vi.mock("axios");

// Приводим через unknown к нужному типу, только так смог заработать
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

// Основные курсы для тестов
const mockRates = {
  USD: 70,
  EUR: 80,
  KZT: 0.17,
  UAH: 2.5,
  HUF: 0.22,
  GBP: 90,
  JPY: 0.65,
};

describe("ExchangeRate component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedAxios.get.mockResolvedValue({
      data: {
        base_code: "RUB",
        time_last_update_utc: "Wed, 20 Aug 2025 12:00:00 +0000",
        conversion_rates: mockRates,
      },
    });
  });

  it("Отображает все основные валюты", async () => {
    render(<ExchangeRate />);

    await waitFor(() => {
      expect(screen.getByText("USD:")).toBeInTheDocument();
      expect(screen.getByText("EUR:")).toBeInTheDocument();
      expect(screen.getByText("KZT:")).toBeInTheDocument();
      expect(screen.getByText("UAH:")).toBeInTheDocument();
      expect(screen.getByText("HUF:")).toBeInTheDocument();
      expect(screen.getByText("GBP:")).toBeInTheDocument();
    });
  });

  it("Отображает время последнего обновления", async () => {
    render(<ExchangeRate />);
    const lastUpdateEl = await screen.findByText(/20.08.2025/i);
    expect(lastUpdateEl).toBeInTheDocument();
  });

  it("Корректно обрабатывает ошибки API", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    render(<ExchangeRate />);
    await waitFor(() => {
      expect(screen.getByText("USD: ...")).toBeInTheDocument();
      expect(screen.getByText("EUR: ...")).toBeInTheDocument();
    });
  });
});
