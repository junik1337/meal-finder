import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
  it("should render the footer with copyright text", () => {
    render(<Footer />);

    // Check if the copyright text is displayed
    const copyrightText = screen.getByText(
      /© 2025 Meal Finder. All rights reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("should have a footer element", () => {
    const { container } = render(<Footer />);

    // Check if footer element exists
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });
});
