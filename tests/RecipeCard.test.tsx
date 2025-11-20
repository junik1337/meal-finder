import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeCard from "@/components/RecipeCard";
import { Meal } from "@/types";
import { useFavoritesStore } from "@/store/FavoriteStore";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock the constants module
vi.mock("@/constants", () => ({
  countryToFlag: (area: string) => {
    return area === "Italian" ? "🇮🇹" : "🌍";
  },
  parseInstructions: (raw: string) => {
    return raw.split("\n").filter((s) => s.trim());
  },
}));

// Sample meal data for testing
const mockMeal: Meal = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strDrinkAlternate: null,
  strCategory: "Chicken",
  strArea: "Japanese",
  strInstructions: "Preheat oven to 350° F...",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  strTags: "Meat,Casserole",
  strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
  strSource: null,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
  strIngredient1: "soy sauce",
  strIngredient2: "water",
  strIngredient3: "brown sugar",
  strIngredient4: "ground ginger",
  strIngredient5: "minced garlic",
  strIngredient6: "cornstarch",
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strIngredient16: null,
  strIngredient17: null,
  strIngredient18: null,
  strIngredient19: null,
  strIngredient20: null,
  strMeasure1: "3/4 cup",
  strMeasure2: "1/2 cup",
  strMeasure3: "1/4 cup",
  strMeasure4: "1/2 teaspoon",
  strMeasure5: "1/2 teaspoon",
  strMeasure6: "4 Tablespoons",
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
  strMeasure16: null,
  strMeasure17: null,
  strMeasure18: null,
  strMeasure19: null,
  strMeasure20: null,
};

describe("RecipeCard Component", () => {
  beforeEach(() => {
    // Reset the favorites store before each test
    useFavoritesStore.setState({ favorites: [] });
  });

  it("should render meal name", () => {
    render(<RecipeCard meal={mockMeal} />);

    const mealName = screen.getByText(/Teriyaki Chicken Casserole/i);
    expect(mealName).toBeInTheDocument();
  });

  it("should render meal category", () => {
    render(<RecipeCard meal={mockMeal} />);

    // Get all elements with "Chicken" text and find the one that's the category badge
    const elements = screen.getAllByText(/Chicken/i);
    // The category should be in a smaller badge element
    const category = elements.find((el) => el.className.includes("absolute"));
    expect(category).toBeInTheDocument();
  });

  it("should render meal image with correct alt text", () => {
    render(<RecipeCard meal={mockMeal} />);

    const image = screen.getByAltText(/Teriyaki Chicken Casserole's photo/i);
    expect(image).toBeInTheDocument();
  });

  it("should render first 6 ingredients", () => {
    render(<RecipeCard meal={mockMeal} />);

    expect(screen.getByText(/soy sauce/i)).toBeInTheDocument();
    expect(screen.getByText(/water/i)).toBeInTheDocument();
    expect(screen.getByText(/brown sugar/i)).toBeInTheDocument();
    expect(screen.getByText(/ground ginger/i)).toBeInTheDocument();
    expect(screen.getByText(/minced garlic/i)).toBeInTheDocument();
    expect(screen.getByText(/cornstarch/i)).toBeInTheDocument();
  });

  it("should render favorite button", () => {
    render(<RecipeCard meal={mockMeal} />);

    // Find the button by checking for the Heart icon component
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should toggle favorite when favorite button is clicked", async () => {
    const user = userEvent.setup();
    render(<RecipeCard meal={mockMeal} />);

    // Get the favorite button (it should be the first button)
    const buttons = screen.getAllByRole("button");
    const favoriteButton = buttons[0];

    // Initially not favorited
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);

    // Click to add to favorites
    await user.click(favoriteButton);

    // Should be favorited now
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    expect(useFavoritesStore.getState().favorites[0].idMeal).toBe(
      mockMeal.idMeal
    );

    // Click again to remove from favorites
    await user.click(favoriteButton);

    // Should be removed
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it("should show ellipsis when there are more than 6 ingredients", () => {
    const mealWithManyIngredients: Meal = {
      ...mockMeal,
      strIngredient6: "cornstarch",
      strIngredient7: "chicken",
    };

    render(<RecipeCard meal={mealWithManyIngredients} />);

    // Check if ellipsis is shown
    const ellipsis = screen.getByText("...");
    expect(ellipsis).toBeInTheDocument();
  });
});
