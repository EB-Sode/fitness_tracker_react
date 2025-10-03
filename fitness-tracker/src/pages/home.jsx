import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";


export default function Home() {
  const { fetchExercises, loading, error } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchExercises({ muscle: "chest" });
  }, [fetchExercises]);

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
          Goals Tracker
        </Link>

        <Link
          to="/workoutlist"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {/* Top Cards Section */}

          {/* Menu Button as Card */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform text-left"
          >
            <img
              src="https://cdn.gymaholic.co/articles/best-workout-plans-for-women/woman.jpg"
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
                src="https://media.istockphoto.com/id/892126458/photo/working-out-in-groups-gives-you-a-little-extra-boost.jpg?s=612x612&w=is&k=20&c=QUHIk-LkBB-pWR46ZoCdSR-9RNkoiYAonUhAzY1zdsI="
                alt="Services"
                className="w-1/3 h-full object-cover bg-gray-700"
              />
              <div className="p-6 flex-1 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Our Services</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Personalized plans, nutrition, and coaching.
                </p>
              </div>
            </div>
            </Link>
            {/* Contact Coach */}
            <Link to="/contact" className="text-red-400 font-semibold">
            <div className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform">
              <img
                src="https://www.meridian-fitness.co.uk/wp-content/uploads/2024/06/10-TIPS-TO-STAY-FOCUSED-WHILE-WORKING-OUT-AT-THE-GYM.webp"
                alt="Coach"
                className="w-1/3 h-full object-cover bg-gray-700"
              />
              <div className="p-6 flex-1 text-center">
                
                <h2 className="text-2xl font-bold text-white mb-3">Contact Coach</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Get in touch with certified fitness trainers.
                </p>
              </div>
            </div>
            </Link>

            {/* Progress Tracker */}
            <Link to="/progress" className="text-red-400 font-semibold">
            <div className="flex items-center bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform">
              <img
                src="https://media.theeverygirl.com/wp-content/uploads/2020/07/little-things-you-can-do-for-a-better-workout-the-everygirl-1.jpg"
                alt="Progress"
                className="w-1/3 h-full object-cover bg-gray-700"
              />
              <div className="p-6 flex-1 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Progress Tracker</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Monitor your goals and achievements.
                </p>
              </div>
            </div>
            </Link>
          </div>



          <h1 className="text-4xl font-bold text-red-400 mb-12 text-center">
            Choose a Filter to Explore Exercises
          </h1>

          {/* Loading / Error */}
          {loading && <p className="text-center text-gray-400">Loading exercises...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}

          {/* Filter Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Filter: By Name */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
              <h2 className="text-xl font-bold text-white mb-3">Search by Name</h2>
              <p className="text-gray-400 text-sm mb-4">Find specific exercises by their name.</p>
              <Link
                to="/workout-details/name"
                className="text-red-400 hover:underline font-semibold"
              >
                Explore →
              </Link>
            </div>

            {/* Filter: By Type */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
              <h2 className="text-xl font-bold text-white mb-3">Browse by Type</h2>
              <p className="text-gray-400 text-sm mb-4">
                Cardio, strength, stretching, and more.
              </p>
              <Link
                to="/workout-details/type"
                className="text-red-400 hover:underline font-semibold"
              >
                Explore →
              </Link>
            </div>

            {/* Filter: By Muscle */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
              <h2 className="text-xl font-bold text-white mb-3">Target by Muscle</h2>
              <p className="text-gray-400 text-sm mb-4">
                Biceps, chest, abs, legs, and more.
              </p>
              <Link
                to="/workout-details/muscle"
                className="text-red-400 hover:underline font-semibold"
              >
                Explore →
              </Link>
            </div>

            {/* Filter: By Difficulty */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
              <h2 className="text-xl font-bold text-white mb-3">Filter by Difficulty</h2>
              <p className="text-gray-400 text-sm mb-4">
                Beginner, intermediate, or expert routines.
              </p>
              <Link
                to="/workout-details/difficulty"
                className="text-red-400 hover:underline font-semibold"
              >
                Explore →
              </Link>
            </div>
          </div>
        </div>
      </main>
   
    </Layout>
  );
}
