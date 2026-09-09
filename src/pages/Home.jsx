import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
          Events worth showing up for
        </p>

        <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">
          Find your next <span className="text-indigo-600">favorite day.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
          Discover thoughtful gatherings, book your place, and make room for
          something memorable.
        </p>

        <Link
          to="/customer/dashboard"
          className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          Explore events
        </Link>
      </div>
    </div>
  );
}