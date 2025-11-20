import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CreativeLoading from "@/components/Loader";

describe("Loader Component", () => {
  it("should render loading text", () => {
    render(<CreativeLoading />);

    // Check if loading text is displayed
    const loadingText = screen.getByText(/Cooking up delicious recipes…/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("should render pot emoji", () => {
    render(<CreativeLoading />);

    // Check if the pot emoji is rendered
    const potEmoji = screen.getByText("🍲");
    expect(potEmoji).toBeInTheDocument();
  });

  it("should render steam emoji", () => {
    render(<CreativeLoading />);

    // Check if the steam emoji is rendered
    const steamEmoji = screen.getByText("♨️");
    expect(steamEmoji).toBeInTheDocument();
  });
});
