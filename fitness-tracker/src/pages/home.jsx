import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";

export default function Home() {
  const {
    fetchExercises,
    fetchMuscles,
    fetchEquipment,
    loading,
    error,
    _exercises,
    _muscles,
    _equipment,
  } = useStore();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch all exercise data when Home loads
    fetchExercises();
    fetchMuscles();
    fetchEquipment();
  }, [fetchExercises, fetchMuscles, fetchEquipment]);

  return (
    <Layout>
      {/* Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col p-6 space-y-4 shadow-lg transform transition-transform duration-300 z-50
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="self-end text-gray-400 hover:text-white mb-6"
        >
          close
        </button>

        <h2 className="text-2xl font-bold text-red-400 mb-6">Our Tools</h2>

        <Link
          to="/workhistory"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Workout History
        </Link>

        <Link
          to="/workout"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Add Workout
        </Link>

        <Link
          to="/goals"
          className="px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Workout List
        </Link>
      </aside>

      <main className="flex-1 bg-transparent text-gray-200 p-10">
        <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
          <h1 className="text-4xl font-bold text-red-400 mb-12 text-center">
            Welcome to FitLife
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {/* Menu Button as Card */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform text-left"
            >
              <img
                src="images/woman.jpg"
                alt="Menu"
                className="w-1/3 h-full object-cover bg-gray-700"
              />
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">Our Tools</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Access trackers, workout history, and more.
                </p>
                <span className="text-red-400 font-semibold hover:underline">
                  Open Menu →
                </span>
              </div>
            </button>

            {/* Our Services */}
            <Link to="/services" className="text-red-400 font-semibold">
              <div className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform">
                <img
                  src="images/istockphoto-892126458-612x612.jpg"
                  alt="Services"
                  className="w-1/3 h-full object-cover bg-gray-700"
                />
                <div className="p-6 flex-1 text-center">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Our Services
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    Personalized plans, nutrition, and coaching.
                  </p>
                </div>
              </div>
            </Link>

            {/* Contact Coach */}
            <Link to="/services" className="text-red-400 font-semibold">
              <div className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform">
                <img
                  src="images/10-TIPS-TO-STAY-FOCUSED-WHILE-WORKING-OUT-AT-THE-GYM.webp"
                  alt="Coach"
                  className="w-1/3 h-full object-cover bg-gray-700"
                />
                <div className="p-6 flex-1 text-center">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Contact Coach
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    Get in touch with certified fitness trainers.
                  </p>
                </div>
              </div>
            </Link>

            {/* Nutrition manager */}
            <Link to="/nutrition" className="text-red-400 font-semibold">
              <div className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform">
                <img
                  src="images/Workouts-for-Men.jpg"
                  alt="Progress"
                  className="w-1/3 h-full object-cover bg-gray-700"
                />
                <div className="p-6 flex-1 text-center">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Nutrition manager
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    Monitor your feeding habits.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-red-400 mb-12 text-center">
            Choose a Filter to Explore Exercises
          </h1>

          {/* Loading / Error */}
          {loading && (
            <p className="text-center text-gray-400">Loading exercises...</p>
          )}
          {error && <p className="text-center text-red-400">{error}</p>}

          {/* Filter Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Filter: By Name */}
            <FilterCard title="Search by Name" link="/workout-details/name" />

            {/* Filter: By Muscle */}
            <FilterCard
              title="Target by Muscle"
              link="/workout-details/muscle"
            />

            {/* Filter: By Equipment */}
            <FilterCard
              title="By Equipment"
              link="/workout-details/equipment"
            />

            {/* Filter: Random Exercise */}
            <FilterCard
              title="Surprise Me!"
              link="/workout-details/random"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}

// --- Small Reusable Filter Card Component ---
function FilterCard({ title, link }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <Link to={link} className="text-red-400 hover:underline font-semibold">
        Explore →
      </Link>
    </div>
  );
}