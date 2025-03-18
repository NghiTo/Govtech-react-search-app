import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";
import "@testing-library/jest-dom";

describe("NotFound Component", () => {
  it("renders the 404 message and link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();

    expect(
      screen.getByText("Oops! The page you're looking for doesn't exist.")
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
