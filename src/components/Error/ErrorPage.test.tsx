import { render, screen } from "@testing-library/react";
import { vi, describe, afterEach, it, expect, MockedFunction } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import '@testing-library/jest-dom';

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
  };
});

describe("ErrorPage Component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders default error message when error is not a RouteErrorResponse", () => {
    (useRouteError as unknown as MockedFunction<typeof useRouteError>).mockReturnValue({});
    (isRouteErrorResponse as unknown as MockedFunction<typeof isRouteErrorResponse>).mockReturnValue(false);

    render(
      <MemoryRouter>
        <ErrorPage type=""/>
      </MemoryRouter>
    );

    expect(screen.getByText("Unexpected Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go Home/i })).toHaveAttribute("href", "/");
  });

  it("renders specific error message when error is a RouteErrorResponse", () => {
    const mockError = {
      status: 404,
      statusText: "Not Found",
      data: { message: "Page not found!" },
    };

    (useRouteError as unknown as MockedFunction<typeof useRouteError>).mockReturnValue(mockError);
    (isRouteErrorResponse as unknown as MockedFunction<typeof isRouteErrorResponse>).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorPage type=""/>
      </MemoryRouter>
    );

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByText("Page not found!")).toBeInTheDocument();
  });

  it("renders not-found error message when type prop is passed", () => {
    render(
      <MemoryRouter>
        <ErrorPage type="not-found" />
      </MemoryRouter>
    );

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("The page you are looking for does not exist.")).toBeInTheDocument();
  });
});
