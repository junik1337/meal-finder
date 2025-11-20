import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "@/components/SearchForm";

describe("SearchForm Component", () => {
  it("should render search input and button", () => {
    const mockSubmit = vi.fn();
    const mockChange = vi.fn();
    const mockClear = vi.fn();

    render(
      <SearchForm
        search=""
        onSearchChange={mockChange}
        onSubmit={mockSubmit}
        onClear={mockClear}
      />
    );

    // Check if input field exists
    const searchInput = screen.getByPlaceholderText(/Search meals.../i);
    expect(searchInput).toBeInTheDocument();

    // Check if search button exists
    const searchButton = screen.getByRole("search");
    expect(searchButton).toBeInTheDocument();
  });

  it("should display the search value in input field", () => {
    const mockSubmit = vi.fn();
    const mockChange = vi.fn();
    const mockClear = vi.fn();

    render(
      <SearchForm
        search="pasta"
        onSearchChange={mockChange}
        onSubmit={mockSubmit}
        onClear={mockClear}
      />
    );

    // Check if input shows the search value
    const searchInput = screen.getByPlaceholderText(
      /Search meals.../i
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("pasta");
  });

  it("should call onSearchChange when typing in input", async () => {
    const mockSubmit = vi.fn();
    const mockChange = vi.fn();
    const mockClear = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchForm
        search=""
        onSearchChange={mockChange}
        onSubmit={mockSubmit}
        onClear={mockClear}
      />
    );

    // Type in the input
    const searchInput = screen.getByPlaceholderText(/Search meals.../i);
    await user.type(searchInput, "pizza");

    // Check if onChange was called for each character
    expect(mockChange).toHaveBeenCalled();
  });

  it("should call onSubmit when form is submitted", async () => {
    const mockSubmit = vi.fn((e) => e.preventDefault());
    const mockChange = vi.fn();
    const mockClear = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchForm
        search="burger"
        onSearchChange={mockChange}
        onSubmit={mockSubmit}
        onClear={mockClear}
      />
    );

    // Submit the form
    const searchButton = screen.getByRole("search");
    await user.click(searchButton);

    // Check if onSubmit was called
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call onClear when clear button is clicked", async () => {
    const mockSubmit = vi.fn();
    const mockChange = vi.fn();
    const mockClear = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchForm
        search="chicken"
        onSearchChange={mockChange}
        onSubmit={mockSubmit}
        onClear={mockClear}
      />
    );

    // Click the clear search button
    const clearButton = screen.getByText(/Clear search/i);
    await user.click(clearButton);

    // Check if onClear was called
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});
