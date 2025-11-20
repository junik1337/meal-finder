"use client";

import { motion } from "framer-motion";

const CreativeLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[40vh] gap-6">
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-7xl"
      >
        🍲
      </motion.div>

      <motion.div
        className="text-3xl absolute mt-[-70px] text-gray-300"
        animate={{
          opacity: [0, 1, 0],
          y: [0, -40, -60],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        ♨️
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="text-xl font-bold text-yellow-600"
      >
        Cooking up delicious recipes…
      </motion.div>
    </div>
  );
};

export default CreativeLoading;
