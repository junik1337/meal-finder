"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import HeroImage from "@/public/images/hero.png";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="flex flex-row items-center justify-between gap-10 py-12 flex-wrap-reverse md:flex-nowrap px-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl space-y-4 text-center sm:text-left mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold"
        >
          Meal Finder
        </motion.h1>

        <motion.p
          className="md:text-lg max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Find recipes from around the world with a simple search. Explore
          detailed meal information, save your favorites, and enjoy a smooth,
          beautifully animated experience. Powered by fast queries, intuitive
          state management, and delightful micro-interactions — cooking
          inspiration is just one search away.
        </motion.p>

        <Link href="/#Recipes">
          <Button
            size="lg"
            className="mt-4 text-base"
          >
            Explore Recipes
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-xl border-4 rounded-sm border-yellow px-1 mx-auto [box-shadow:10px_10px_#f3ca52]"
      >
        <Image
          src={HeroImage}
          width={800}
          height={600}
          priority
          className="object-cover"
          alt="Hero's image"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
