import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi } from "vitest";
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

  test("calls getResult on search", async () => {
    renderWithQueryClient(<Search />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.type(input, "query");
    fireEvent.click(button);

    await waitFor(() => {
      expect(getResult).toHaveBeenCalled();
    });
  });
});
