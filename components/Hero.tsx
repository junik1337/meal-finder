import Image from "next/image";
import { Button } from "./ui/button";
import HeroImage from "@/public/images/hero.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-row items-center justify-between gap-10 py-12 flex-wrap-reverse md:flex-nowrap px-4">
      <div className="max-w-2xl space-y-4 text-center sm:text-left mx-auto">
        <h1 className="text-8xl font-bold">Meal Finder</h1>
        <p className="text-lg max-w-lg">
          Find recipes from around the world with a simple search. Explore
          detailed meal information, save your favorites, and enjoy a smooth,
          beautifully animated experience. Powered by fast queries, intuitive
          state management, and delightful micro-interactions — cooking
          inspiration is just one search away.
        </p>

        <Link href="/#Recipes">
          <Button
            size="lg"
            className="mt-4 text-base"
          >
            Explore Recipes
          </Button>
        </Link>
      </div>

      <Image
        src={HeroImage}
        width={800}
        height={600}
        className="object-cover w-full max-w-2xl"
        alt="Hero's image"
      />
    </section>
  );
};

export default Hero;
