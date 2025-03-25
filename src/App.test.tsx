import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders Header and Search components through RouterProvider", () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
