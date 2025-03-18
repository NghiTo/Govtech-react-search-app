import { render, screen } from "@testing-library/react";
import { vi, Mock, describe, afterEach, it, expect } from "vitest";
import ErrorPage from "./ErrorPage";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import '@testing-library/jest-dom';

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useRouteError: vi.fn(),
  isRouteErrorResponse: vi.fn(),
}));

describe("ErrorPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders default error message when error is not RouteErrorResponse", () => {
    (useRouteError as Mock).mockReturnValue({});
    (isRouteErrorResponse as unknown as Mock).mockReturnValue(false);

    render(<ErrorPage />);

    expect(screen.getByText("Unexpected Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("renders specific error message when RouteErrorResponse", () => {
    const mockError = {
      status: 404,
      statusText: "Not Found",
      data: { message: "Page not found!" },
    };

    (useRouteError as Mock).mockReturnValue(mockError);
    (isRouteErrorResponse as unknown as Mock).mockReturnValue(true);

    render(<ErrorPage />);

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByText("Page not found!")).toBeInTheDocument();
  });
});
