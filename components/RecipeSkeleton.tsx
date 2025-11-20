import { motion } from "framer-motion";

const RecipeSkeleton = () => {
  return (
    <div className="flex flex-row flex-wrap gap-8 w-full justify-items-center justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-[392px] bg-yellow/10 rounded-md p-4 space-y-4 animate-pulse"
        >
          <div className="h-6 w-1/2 bg-white/50 rounded" />
          <div className="h-56 w-full bg-white/40 rounded" />
          <div className="h-4 w-1/3 bg-white/50 rounded" />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeSkeleton;
