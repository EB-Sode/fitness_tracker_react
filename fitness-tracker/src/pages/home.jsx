import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";


export default function Home() {
  const { items, loadItems } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <Layout>
      {/* Sidebar Menu */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition"
      >
        ☰
      </button>
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col p-6 space-y-4 shadow-lg transform transition-transform duration-300 z-50
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-gray-400 hover:text-white mb-6"
          >
            ✕
          </button>


        <h2 className="text-2xl font-bold text-red-400 mb-6">Menu</h2>

        <Link
          to="/workhistory"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Workout History
        </Link>

        <Link
          to="/workoutform"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Add Workout
        </Link>

        <Link
          to="/goals"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Goals Tracker
        </Link>

        <Link
          to="/workoutlist"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Workout List
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br text-gray-200 p-10">
        <div className="max-w-7xl mx-auto px-6 py-10 mt-20">
        <h1 className="text-4xl font-bold text-red-400 mb-8 text-center">
          Fitness Activities
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-400">Loading activities...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="font-semibold">Purpose:</span> {item.purpose}
                  </p>
                  <p className="text-red-400 text-sm font-semibold">
                    Category: {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </main>
   
    </Layout>
  );
}
