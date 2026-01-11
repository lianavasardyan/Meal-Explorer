'use client'

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

type MealBief = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

type Props = {
  meals: MealBief[];
};

export function PaginatedMeals({ meals }: Props) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;


  const filtered = useMemo(() => meals.filter(m => {
    return m.strMeal.toLowerCase().includes(query.toLowerCase()) ||
      m.idMeal.includes(query);
  }), [meals, query]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);


  const next = () => setPage(prev => Math.min(totalPages, prev + 1));

  const prev = () => setPage(prev => Math.max(1, prev - 1));


  return (
    <div className="PaginatedMeals container mx-auto px-6 py-10 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <input
        type="text"
        placeholder=" Search Meal..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        className="w-full max-w-md mb-8 outline-none p-3 text-gray-700 border-2 border-green-300 text-lg rounded-lg shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {current.map((meal) => (
          <li
            key={meal.idMeal}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={400}
              height={300}
              className="w-full h-56 object-cover hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <Link
                href={`/meal/${meal.idMeal}`}
                className="block text-green-700 font-semibold text-lg hover:text-green-900 transition-colors"
              >
                {meal.strMeal}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-green-600 transition-colors"
          disabled={page === 1}
          onClick={prev}
        >
           PREV
        </button>
        <span className="font-semibold text-gray-700">
          Page {page} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-green-600 transition-colors"
          disabled={page === totalPages}
          onClick={next}
        >
          NEXT 
        </button>
      </div>
    </div>
  );

}
