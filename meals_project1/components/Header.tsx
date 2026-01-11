import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors">
           My Meals App
        </Link>

        <nav className="flex gap-6 text-lg font-medium">
        </nav>
      </div>
    </header>
  );
}
