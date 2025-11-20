"use client";

import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { useMeals } from "@/hooks/useMeals";
import Loader from "./Loader";
import Error from "next/error";
import { useState } from "react";
import { useSearchStore } from "@/store/searchStore";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const Recipes = () => {
  const [search, setSearch] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");

  const addSearch = useSearchStore((state) => state.addSearch);
  const history = useSearchStore((state) => state.history);

  const { data, isLoading, isError } = useMeals(submittedQuery);

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
        <Error
          statusCode={500}
          title="Failed to fetch meals"
        />
      )}

      <div className="w-full flex flex-row gap-10 flex-wrap justify-center px-2.5 min-h-[50vh]">
        {isLoading ? (
          <Loader />
        ) : data?.meals ? (
          data.meals.map((meal, idx) => (
            <RecipeCard
              meal={meal}
              key={idx}
            />
          ))
        ) : (
          submittedQuery && <p className="text-gray-400">No meals found.</p>
        )}
      </div>
    </section>
  );
};

export default Recipes;
