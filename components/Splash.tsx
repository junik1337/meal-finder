"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-green flex flex-col items-center justify-center z-9999">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl"
        >
          🍲
        </motion.div>

        <motion.div
          className="text-3xl absolute mt-[-70px] text-gray-400"
          animate={{ opacity: [0, 1, 0], y: [0, -30, -50] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        >
          ♨️
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-xl font-bold text-yellow mt-6"
        >
          Cooking up delicious recipes…
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SplashScreen;
