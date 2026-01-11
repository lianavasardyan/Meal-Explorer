import Link from "next/link";


type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoriesResponse = {
  categories: Category[];
}

export default async function HomePage() {

  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch categories');

  const data: CategoriesResponse = await res.json();

  return (
    <div className="container mx-auto px-6 py-10 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <h1 className="text-center font-extrabold italic text-4xl text-green-800 mb-10 drop-shadow-md">
         Meal Categories
      </h1>
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.categories.map((category) => (<li key={category.idCategory}
          className="shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 bg-white rounded-2xl border border-green-200" >
          <img className="w-full h-48 object-cover rounded-xl mb-4"
            src={category.strCategoryThumb}
            alt={category.strCategory} />
          <h3 className="font-bold text-2xl text-green-900 mb-2">
            {category.strCategory}
          </h3>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {category.strCategoryDescription.length > 200 ? category.strCategoryDescription.slice(0, 200) + "..." : category.strCategoryDescription}
          </p>
          <Link className="text-green-600 font-semibold hover:text-green-800 transition-colors"
            href={`/category/${category.strCategory}`} >
             View detail
          </Link>
        </li>))}
      </ul>
    </div>);
}
