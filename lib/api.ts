import { MealsResponse } from "@/types";

export async function fetchMeals(query: string): Promise<MealsResponse> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch meals");
  }

  return res.json();
}
