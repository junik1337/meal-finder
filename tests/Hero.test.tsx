import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe("Hero Component", () => {
  it("should render the main heading", () => {
    render(<Hero />);

    // Check if main heading is displayed
    const heading = screen.getByText(/Meal Finder/i);
    expect(heading).toBeInTheDocument();
  });

  it("should render the description text", () => {
    render(<Hero />);

    // Check if description text is present
    const description = screen.getByText(/Find recipes from around the world/i);
    expect(description).toBeInTheDocument();
  });

  it("should render Explore Recipes button", () => {
    render(<Hero />);

    // Check if button exists
    const button = screen.getByRole("button", { name: /Explore Recipes/i });
    expect(button).toBeInTheDocument();
  });

  it("should have link to recipes section", () => {
    render(<Hero />);

    // Check if link points to recipes section
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/#Recipes");
  });

  it("should render hero image", () => {
    render(<Hero />);

    // Check if image is rendered with correct alt text
    const image = screen.getByAltText(/Hero's image/i);
    expect(image).toBeInTheDocument();
  });
});
