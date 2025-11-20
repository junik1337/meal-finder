import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meal } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const RecipeCard = ({ meal }: { meal: Meal }) => {
  return (
    <Card className="w-sm bg-yellow relative justify-between">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-2xl font-bold">{meal.strMeal}</CardTitle>
        <CardDescription className="self-center flex justify-center bg-green rounded-sm p-3">
          <Image
            src={meal.strMealThumb}
            width={700}
            height={700}
            className="max-w-3xs rounded-sm"
            alt={`${meal.strMeal}'s photo`}
          />
        </CardDescription>
        <CardAction className="bg-white absolute rounded-sm -right-2 font-semibold px-1 py-0.5 text-sm">
          {meal.strCategory}
        </CardAction>
      </CardHeader>
      <CardContent className="inline-flex flex-row gap-1.5 flex-wrap items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const ingredient = meal[`strIngredient${i}` as keyof Meal];
          return ingredient ? (
            <p
              className="bg-green font-semibold text-white p-1.5 text-sm rounded-sm"
              key={i}
            >
              #{ingredient}
            </p>
          ) : null;
        })}
        {meal.strIngredient6 && (
          <Link
            href="/"
            className="hover:underline"
          >
            ...
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button className="bg-white cursor-pointer text-black font-semibold hover:text-white">
          Show More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
