"use client";

import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { useMeals } from "@/hooks/useMeals";
import Loader from "./Loader";
import Error from "next/error";

const Recipes = () => {
  const { data, isLoading, isError } = useMeals("");

  if (isError) {
    return (
      <Error
        statusCode={500}
        title="Failed to fetch meals"
      />
    );
  }

  console.log(data?.meals);

  return (
    <section
      id="Recipes"
      className="flex flex-col items-center justify-center mt-10 space-y-20"
    >
      <Input
        placeholder="Search"
        className="max-w-md"
      />

      <div className="w-full flex flex-row gap-6 flex-wrap justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          data?.meals &&
          data?.meals?.map((item, idx) => (
            <RecipeCard
              meal={item}
              key={idx}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Recipes;
