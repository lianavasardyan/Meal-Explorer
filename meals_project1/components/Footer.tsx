export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-10">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl font-bold"> My Meals App</h2>

        <p className="text-sm text-gray-200 mt-4 md:mt-0">
          © {new Date().getFullYear()} My Meals App. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
