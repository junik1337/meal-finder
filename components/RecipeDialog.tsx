import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { countryToFlag, parseInstructions } from "@/constants";
import { Meal } from "@/types";
import { Youtube } from "lucide-react";
import Image from "next/image";

const RecipeDialog = ({ meal }: { meal: Meal }) => {
  const ingredients = Array.from({ length: 20 })
    .map((_, idx) => {
      const i = idx + 1;
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      if (ingredient && ingredient.trim() !== "") {
        return { ingredient, measure };
      }
      return null;
    })
    .filter(Boolean) as { ingredient: string; measure: string }[];

  const steps = parseInstructions(meal.strInstructions);

  return (
    <DialogContent className="text-black flex flex-col max-h-[92vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="inline-flex justify-between items-center my-4">
          <span className="text-2xl sm:text-4xl font-bold">
            <span className="bg-yellow px-1 rounded-full">
              {countryToFlag(meal.strArea)}
            </span>
            &nbsp;
            {meal.strMeal}
          </span>
          <span className="text-sm sm:text-base font-sans bg-green text-white font-bold px-1 py-0.5 rounded-sm">
            {meal.strCategory}
          </span>
        </DialogTitle>
        <DialogDescription className="mx-auto">
          <Image
            src={meal.strMealThumb}
            width={700}
            height={700}
            className="max-w-sm w-full rounded-sm"
            loading="eager"
            alt={`${meal.strMeal}'s photo`}
          />
        </DialogDescription>

        <div className="flex flex-col gap-2 mb-4">
          <h3 className="bg-yellow text-lg font-medium font-sans px-1 rounded-xs">
            Ingredients
          </h3>
          <ul className="space-y-1">
            {ingredients.map((item, i) => (
              <li
                key={i}
                className="text-sm font-sans text-black/60"
              >
                • <span className="font-semibold">{item.ingredient}</span>
                {item.measure ? (
                  <span className="font-base font-sans">
                    &nbsp;— {item.measure}
                  </span>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="bg-yellow text-lg font-medium font-sans px-1 rounded-xs">
            Instructions
          </h3>
          <ol className="space-y-2 list-disc list-inside">
            {steps.map((step, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed text-black/80"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            className="bg-red-500 text-white px-1 py-0.5 rounded-xs hover:underline inline-flex gap-2 items-center font-medium self-end"
          >
            <Youtube />
            <span>Watch on YouTube</span>
          </a>
        )}

        {meal.strSource && (
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-1 font-sans">Source</h3>
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {meal.strSource}
            </a>
          </div>
        )}
      </DialogHeader>
    </DialogContent>
  );
};

export default RecipeDialog;
