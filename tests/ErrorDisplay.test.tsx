import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorDisplay from "@/components/ErrorDisplay";

describe("ErrorDisplay Component", () => {
  it("should render error message", () => {
    const mockRetry = vi.fn();
    render(<ErrorDisplay onRetry={mockRetry} />);

    // Check if error message is displayed
    const errorMessage = screen.getByText(/Failed to fetch meals/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render retry button", () => {
    const mockRetry = vi.fn();
    render(<ErrorDisplay onRetry={mockRetry} />);

    // Check if retry button exists
    const retryButton = screen.getByRole("button", { name: /Retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", async () => {
    const mockRetry = vi.fn();
    const user = userEvent.setup();

    render(<ErrorDisplay onRetry={mockRetry} />);

    // Click the retry button
    const retryButton = screen.getByRole("button", { name: /Retry/i });
    await user.click(retryButton);

    // Check if onRetry was called
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});
