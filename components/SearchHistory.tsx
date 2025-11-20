"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (search: string) => void;
}

const SearchHistory = ({ history, onHistoryClick }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex gap-2 flex-wrap justify-center text-sm items-center"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        Last Searches:
      </motion.span>
      {history.map((item, i) => (
        <div key={i}>
          <Button
            size="sm"
            onClick={() => onHistoryClick(item)}
            className="bg-primary text-white px-2 py-0.5 rounded"
          >
            {item}
          </Button>
        </div>
      ))}
    </motion.div>
  );
};

export default SearchHistory;
