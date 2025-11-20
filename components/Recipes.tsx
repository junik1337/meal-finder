"use client";

import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/searchStore";
import toast from "react-hot-toast";
import SearchForm from "@/components/SearchForm";
import SearchHistory from "@/components/SearchHistory";
import RecipeList from "@/components/RecipeList";
import ErrorDisplay from "@/components/ErrorDisplay";

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

  const handleHistoryClick = (searchTerm: string) => {
    setSearch(searchTerm);
    setSubmittedQuery(searchTerm);
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
        <SearchForm
          search={search}
          onSearchChange={setSearch}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />

        <SearchHistory
          history={history}
          onHistoryClick={handleHistoryClick}
        />
      </div>

      {isError && <ErrorDisplay onRetry={() => refetch()} />}

      <div className="w-full flex flex-row gap-10 flex-wrap justify-center px-2.5 min-h-[50vh]">
        <RecipeList
          isLoading={isLoading}
          meals={data?.meals}
          submittedQuery={submittedQuery}
        />
      </div>
    </section>
  );
};

export default Recipes;
