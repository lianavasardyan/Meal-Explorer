import AutocompleteMeals from "@/components/AutocompleteMeals";
import { PaginatedMeals } from "@/components/PaginatedMeals";
import Link from "next/link";


type MealBief = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

type MealsResponse = {
  meals: MealBief[];
};

type Params = {
  params: Promise<{category: string}>;
};

export default async function CaregoyPage({params}: Params) {

  const {category} = await params;
  
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {next: {revalidate: 60}});
  if(!res.ok) throw new Error(`Failed fetch meals for category ${category}`);

  const data: MealsResponse = await res.json();
 
  return (
    <div className="container mx-auto px-6 py-10 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <h1 className="text-center font-extrabold italic text-4xl text-green-800 mb-8 drop-shadow-md">
         Meals in {category}
      </h1>
      {
        data.meals ? (
          <>
            <div className="mb-6">
              <AutocompleteMeals meals={data.meals} />
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200">
              <PaginatedMeals meals={data.meals} />
            </div>
          </>
        ) : (
          <p className="text-center text-red-600 font-semibold mt-10">
             No Meals found for category <span className="italic">{category}</span>
          </p>
        )
      }
    </div>
  )
  
}
