import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import NewsFeed from "./NewsFeed";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe("NewsFeed", () => {
  // убрали предупреждения в консоли из-за console.log
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it("рендерит заголовок и описание", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Ошибка API"));

    render(<NewsFeed />);

    expect(
      screen.getByText(/Current news from the world of finance/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We update the news feed every 15 minutes/i)
    ).toBeInTheDocument();
  });

  it("загружает и отображает новости", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        status: "ok",
        totalResults: 1,
        articles: [
          {
            title: "Test News",
            description: "This is a test description",
            url: "http://example.com",
            urlToImage: "http://example.com/image.jpg",
          },
        ],
      },
    });

    render(<NewsFeed />);

    await waitFor(() => {
      expect(screen.getByText("Test News")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test description")
      ).toBeInTheDocument();
    });
  });

  it("кнопки скролла отключены по умолчанию", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { status: "ok", totalResults: 0, articles: [] },
    });

    render(<NewsFeed />);

    await waitFor(() => {
      const [leftBtn, rightBtn] = screen.getAllByRole("button");
      expect(leftBtn).toBeDisabled();
      expect(rightBtn).toBeDisabled();
    });
  });

  it("нажимает кнопки скролла", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        status: "ok",
        totalResults: 1,
        articles: [
          {
            title: "Test News 2",
            description: "Another test description",
            url: "http://example2.com",
            urlToImage: "http://example2.com/image.jpg",
          },
        ],
      },
    });

    render(<NewsFeed />);

    await waitFor(() => {
      expect(screen.getByText("Test News 2")).toBeInTheDocument();
    });

    const [leftBtn, rightBtn] = screen.getAllByRole("button");
    fireEvent.click(leftBtn);
    fireEvent.click(rightBtn);

    expect(leftBtn).toBeInTheDocument();
    expect(rightBtn).toBeInTheDocument();
  });
});
