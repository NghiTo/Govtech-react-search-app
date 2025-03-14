import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { describe, test, expect } from "vitest";

describe("Header Component", () => {
  test("renders Singapore logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("Singapore logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/src/assets/R-removebg-preview.png");
  });

  test("renders government website text", () => {
    render(<Header />);
    
    expect(screen.getByText("An Official Website of the")).toBeInTheDocument();
    expect(screen.getByText("Singapore Government")).toBeInTheDocument();
  });

  test("Singapore Government text is bold", () => {
    render(<Header />);
    const sgText = screen.getByText("Singapore Government");
    expect(sgText).toHaveClass("font-semibold");
  });
});
