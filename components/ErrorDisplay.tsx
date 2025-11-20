"use client";

import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  onRetry: () => void;
}

const ErrorDisplay = ({ onRetry }: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-10">
      <p className="text-red-500 font-semibold">Failed to fetch meals</p>

      <Button
        size="lg"
        onClick={onRetry}
        className="text-lg"
      >
        Retry
      </Button>
    </div>
  );
};

export default ErrorDisplay;
