"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchFormProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

const SearchForm = ({
  search,
  onSearchChange,
  onSubmit,
  onClear,
}: SearchFormProps) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center flex-wrap gap-6 justify-center max-w-xs md:max-w-4xl w-full px-2"
    >
      <div className="inline-flex gap-2 max-w-md w-full">
        <Input
          placeholder="Search meals..."
          className="max-w-md bg-white text-black"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div>
          <Button
            type="submit"
            role="search"
          >
            <Search />
          </Button>
        </div>
      </div>

      <button
        onClick={onClear}
        className="hover:underline cursor-pointer"
      >
        Clear search
      </button>
    </motion.form>
  );
};

export default SearchForm;
