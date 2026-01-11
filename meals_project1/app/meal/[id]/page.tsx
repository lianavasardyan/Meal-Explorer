import Image from "next/image";


type Params = {
    params: Promise<{id: string}>;
  };


 type Meal = {
    idMeal: string;
    strMeal:  string;
    strCategory:  string;
    strArea: string;
    strMealThumb:  string;
    strTags:  string;
    strYoutube:  string;
    [key: string]: any;
 };

type MealResponse = {
  meals: Meal[];
};


export default async function MealPage({params}: Params) {

    const {id} = await params;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {next: {revalidate: 60}});
    if(!res.ok) throw new Error(`Failed to fetch meal with id ${id}`);

    const data: MealResponse = await res.json(); // {meals: [Meal]}

    if(!data.meals || data.meals.length === 0){
      return <p>No Meal Found With ID {id}</p>
    }

    const meal = data.meals[0]; //{}

    const ingredients: {ingredient: string, measure: string}[] = [];
    
    for(let i=1; i<=20; i++){
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if(ing && ing.trim() !== ""){
        ingredients.push({
          ingredient: ing,
          measure: meas
        })
      }
    }


    return (
      <div className="container mx-auto px-6 py-10 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
        <h1 className="text-center font-extrabold text-4xl text-green-800 mb-6 drop-shadow-md">
          {meal.strMeal}
        </h1>
    
        <p className="text-center text-gray-700 mb-6">
          <span className="font-semibold text-green-700 mr-4">Category: {meal.strCategory}</span>
          <span className="font-semibold text-blue-700">Area: {meal.strArea}</span>
        </p>
    
        <div className="flex justify-center mb-8">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={400}
            height={300}
            className="rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform"
          />
        </div>
    
        <h2 className="text-2xl font-bold text-green-800 mb-4 border-b-2 border-green-300 inline-block">
          Ingredients
        </h2>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg p-3 text-gray-800 hover:shadow-xl transition-shadow"
            >
              <span className="font-semibold text-green-700">{item.ingredient}</span> —{" "}
              <span className="italic text-gray-600">{item.measure}</span>
            </li>
          ))}
        </ul>
    
        {meal.strYoutube && (
          <div className="text-center">
            <a
              target="_blank"
              href={meal.strYoutube}
              className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
               Watch on YouTube
            </a>
          </div>
        )}
      </div>
    )
    
    
}




