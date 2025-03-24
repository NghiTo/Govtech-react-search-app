import { render, screen } from "@testing-library/react";
import HomeLayout from "./HomeLayout";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

vi.mock("../Header/Header", () => ({
  default: () => <div data-testid="header">Header Component</div>,
}));

vi.mock("../Search/Search", () => ({
  default: () => <div data-testid="search">Search Component</div>,
}));

describe("HomeLayout", () => {
  it("renders Header and Search components correctly", () => {
    render(<HomeLayout />);

    expect(screen.getByTestId("header")).toBeInTheDocument();

    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("has correct container styles", () => {
    const { container } = render(<HomeLayout />);
    const div = container.firstChild;

    expect(div).toHaveClass("min-h-screen");
    expect(div).toHaveClass("flex");
    expect(div).toHaveClass("flex-col");
  });
});
