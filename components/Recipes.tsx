"use client";

import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/searchStore";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import RecipeSkeleton from "./RecipeSkeleton";

const Recipes = () => {
  const [search, setSearch] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");

  const addSearch = useSearchStore((state) => state.addSearch);
  const history = useSearchStore((state) => state.history);

  const { data, isLoading, isError, refetch } = useMeals(submittedQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      setSubmittedQuery("");
      return;
    }

    addSearch(search);
    setSubmittedQuery(search);
  };

  const handleClear = () => {
    setSubmittedQuery("");
    setSearch("");
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch meals.");
    }
  }, [isError]);

  return (
    <section
      id="Recipes"
      className="flex flex-col items-center justify-center mt-10 space-y-20"
    >
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-wrap gap-6 justify-center max-w-4xl w-full px-2"
        >
          <div className="inline-flex gap-2 max-w-md w-full">
            <Input
              placeholder="Search meals..."
              className="max-w-md bg-white text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="submit"
              role="search"
            >
              <Search />
            </Button>
          </div>

          <button
            onClick={handleClear}
            className="hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </form>

        {history.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center text-sm items-center">
            <span>Last Searches:</span>
            {history.map((item, i) => (
              <Button
                size="sm"
                key={i}
                onClick={() => {
                  setSearch(item);
                  setSubmittedQuery(item);
                }}
                className="bg-primary  text-white px-2 py-0.5 rounded"
              >
                {item}
              </Button>
            ))}
          </div>
        )}
      </div>

      {isError && (
        <div className="flex flex-col items-center justify-center gap-3 mt-10">
          <p className="text-red-500 font-semibold">Failed to fetch meals</p>

          <Button
            size="lg"
            onClick={() => refetch()}
            className="text-lg"
          >
            Retry
          </Button>
        </div>
      )}

      <div className="w-full flex flex-row gap-10 flex-wrap justify-center px-2.5 min-h-[50vh]">
        {isLoading ? (
          <RecipeSkeleton />
        ) : data?.meals ? (
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
            {data.meals.map((meal, idx) => (
              <RecipeCard
                meal={meal}
                key={idx}
              />
            ))}
          </motion.div>
        ) : (
          submittedQuery && (
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              No meals found.
            </motion.p>
          )
        )}
      </div>
    </section>
  );
};

export default Recipes;
