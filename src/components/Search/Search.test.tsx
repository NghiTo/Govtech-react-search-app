import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi, afterEach, Mock } from "vitest";
import Search from "./Search";
import "@testing-library/jest-dom";
import { JSX } from "react";
import { getResult } from "../../apis/search.api";

vi.mock("../../apis/search.api", () => ({
  getResult: vi.fn().mockResolvedValue({ data: "mocked result" }),
  getSuggestion: vi
    .fn()
    .mockResolvedValue({ suggestions: ["mocked suggestion"] }),
}));

const renderWithQueryClient = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Search Component", () => {
  test("renders search input and button", () => {
    renderWithQueryClient(<Search />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value on typing", async () => {
    renderWithQueryClient(<Search />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "test");

    expect(input).toHaveValue("test");
  });

  test("calls getResult on search with correct query", async () => {
    renderWithQueryClient(<Search />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.type(input, "query");

    await userEvent.click(button);

    await waitFor(() => {
      expect(getResult).toHaveBeenCalledTimes(1);
    });
  });

  test("displays error message when getResult fails", async () => {
    (getResult as Mock).mockRejectedValueOnce(new Error("Mocked API Error"));

    renderWithQueryClient(<Search />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.type(input, "query");

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/mocked api error/i)).toBeInTheDocument();
    });

    expect(button).not.toBeDisabled();
  });

  test("clears input and suggestions when Clear button is clicked", async () => {
    renderWithQueryClient(<Search />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "test input");
    expect(input).toHaveValue("test input");

    const clearButton = screen.getByRole("button", { name: /clear/i });

    await userEvent.click(clearButton);

    expect(input).toHaveValue("");

    expect(screen.queryByTestId("suggestion-list")).not.toBeInTheDocument();

    expect(document.activeElement).toBe(input);
  });

  test("suggestion list is accessible by keyboard", async () => {
    renderWithQueryClient(<Search />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "mocked");

    await waitFor(() => {
      expect(screen.getByTestId("suggestion-list")).toBeVisible();
    });
  });
});
