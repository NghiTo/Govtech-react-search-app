import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { describe, test, expect, beforeEach } from "vitest";

describe("Header Component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("renders Singapore logo", () => {
    const logo = screen.getByAltText("Logo of the Singapore Government");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/src/assets/R-removebg-preview.png");
  });

  test("renders government website text", () => {
    expect(screen.getByText(/An Official Website of the/i)).toBeInTheDocument();
    expect(screen.getByText("Singapore Government")).toBeInTheDocument();
  });

  test("Singapore Government text is bold", () => {
    const sgText = screen.getByText("Singapore Government");
    expect(sgText).toHaveClass("font-semibold");
  });
});
