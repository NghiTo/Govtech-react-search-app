import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner";
import { describe, test, expect } from "vitest";

describe("LoadingSpinner Component", () => {
  test("renders the loading spinner", () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
    
    expect(spinner).toHaveClass("w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin");
  });
});
