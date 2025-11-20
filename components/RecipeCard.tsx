import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meal } from "@/types";
import Image from "next/image";
import { countryToFlag } from "@/constants";
import RecipeDialog from "./RecipeDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Heart, HeartPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useFavoritesStore } from "@/store/FavoriteStore";

const RecipeCard = ({ meal }: { meal: Meal }) => {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(meal.idMeal)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 30 },
            show: { opacity: 1, scale: 1, y: 0 },
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.98 }}
          className="w-[392px] relative justify-between cursor-pointer"
        >
          <Card className="bg-yellow h-full">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(meal);
              }}
              size="icon"
              className="absolute bg-white text-red-500 right-2 top-10 rounded-full shadow-md"
            >
              {isFavorite ? <Heart fill="red" /> : <HeartPlus />}
            </Button>
            <CardHeader className="flex flex-col">
              <CardTitle className="text-2xl font-bold">
                <span className="bg-white px-1 rounded-full">
                  {countryToFlag(meal.strArea)}
                </span>
                &nbsp;
                {meal.strMeal}
              </CardTitle>
              <CardDescription className="self-center flex justify-center bg-green rounded-sm p-3">
                <Image
                  src={meal.strMealThumb}
                  width={700}
                  height={700}
                  className="max-w-3xs rounded-sm"
                  loading="eager"
                  alt={`${meal.strMeal}'s photo`}
                />
              </CardDescription>
              <CardAction className="bg-white font-sans absolute top-2 rounded-sm -right-2 font-bold px-1 py-0.5 text-sm">
                {meal.strCategory}
              </CardAction>
            </CardHeader>
            <CardContent className="inline-flex flex-row gap-1.5 flex-wrap items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const ingredient = meal[`strIngredient${i}` as keyof Meal];
                return ingredient ? (
                  <p
                    className="bg-green font-medium text-white p-1.5 font-sans text-sm rounded-sm"
                    key={i}
                  >
                    {ingredient}
                  </p>
                ) : null;
              })}
              {meal.strIngredient6 && (
                <span className="font-semibold">...</span>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      <RecipeDialog meal={meal} />
    </Dialog>
  );
};

export default RecipeCard;
