"use client";

import RecipeCard from "@/components/RecipeCard";
import RecipeSkeleton from "@/components/RecipeSkeleton";
import { Meal } from "@/types";
import { motion } from "framer-motion";

interface RecipeListProps {
  isLoading: boolean;
  meals: Meal[] | null | undefined;
  submittedQuery: string;
}

const RecipeList = ({ isLoading, meals, submittedQuery }: RecipeListProps) => {
  if (isLoading) {
    return <RecipeSkeleton />;
  }

  if (meals) {
    return (
      <motion.div
        className="w-full flex flex-row gap-10 flex-wrap justify-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {meals.map((meal, idx) => (
          <RecipeCard
            meal={meal}
            key={idx}
          />
        ))}
      </motion.div>
    );
  }

  if (submittedQuery) {
    return (
      <motion.p
        className="text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        No meals found.
      </motion.p>
    );
  }

  return null;
};

export default RecipeList;
