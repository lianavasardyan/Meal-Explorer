'use client';

import { useState, useMemo, useRef, useEffect } from "react"
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

export default function AutocompleteMeals({ meals }: Props) {
  const [query, setQuery] = useState('');
  const [showDropworn, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query) return [];
    return meals.filter(m => m.strMeal.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {

      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }

    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, []);


  return (
    <div
      ref={wrapperRef}
      className="AutocomplateMeals max-w-[500px] relative"
    >
      <input
        type="text"
        placeholder="Search meals..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="w-full outline-none p-3 text-gray-700 border-2 border-green-300 text-lg rounded-lg shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
      />
      {showDropworn && filtered.length > 0 && (
        <ul
          className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 w-full"
        >
          {filtered.map((item) => (
            <li
              key={item.idMeal}
              className="flex items-center gap-3 p-2 hover:bg-green-50 cursor-pointer transition-colors rounded-md"
            >
              <Image
                src={item.strMealThumb}
                alt={item.strMeal}
                width={40}
                height={40}
                className="rounded-md shadow-sm"
              />
              <Link
                href={`/meal/${item.idMeal}`}
                className="text-gray-800 font-medium hover:text-green-700 transition-colors"
              >
                {item.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}
