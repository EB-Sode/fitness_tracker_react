import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useStore from "../store/useStore.js";
import ExerciseCard from "./ExerciseCard.jsx";
import Footer from "./Footer.jsx";

export default function WorkoutDetails() {
  const { category } = useParams();
  const {
    exercises,
    fetchExercises,
    fetchMuscles,
    fetchEquipment,
    refreshExercises,
    muscles,
    equipment,
    loading,
    error,
  } = useStore();

  const [search, setSearch] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [selectedMuscle, setSelectedMuscle] = useState("all");

  useEffect(() => {
    fetchExercises();
    fetchMuscles();
    fetchEquipment();
  }, [fetchExercises, fetchMuscles, fetchEquipment]);

  const groupedExercises = useMemo(() => {
    if (!Array.isArray(exercises) || exercises.length === 0) return {};

    if (!category) return { all: exercises };

    return exercises.reduce((groups, exercise) => {
      let key = "Other";

      if (category === "category") key = exercise.category?.name || "Other";
      else if (category === "muscle")
        key =
          exercise.muscles?.[0]?.name ||
          exercise.muscles_secondary?.[0]?.name ||
          "Other";
      else if (category === "equipment")
        key = exercise.equipment?.[0]?.name || "Bodyweight";

      if (!groups[key]) groups[key] = [];
      groups[key].push(exercise);
      return groups;
    }, {});
  }, [category, exercises]);

  const filterExercises = (exerciseList) => {
    return exerciseList.filter((exercise) => {
      const name = exercise.name?.toLowerCase() || "";
      const matchesSearch = name.includes(search.toLowerCase());

      const matchesEquipment =
        selectedEquipment === "all" ||
        exercise.equipment?.some(
          (e) => e.name.toLowerCase() === selectedEquipment.toLowerCase()
        );

      const matchesMuscle =
        selectedMuscle === "all" ||
        exercise.muscles?.some(
          (m) => m.name.toLowerCase() === selectedMuscle.toLowerCase()
        );

      return matchesSearch && matchesEquipment && matchesMuscle;
    });
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100 text-gray-900 dark:bg-red-950 dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-between max-w-6xl mx-auto mb-6">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-red-900 dark:text-white dark:hover:bg-gray-600 transition-colors duration-300"
        >
          ← Back to Home
        </Link>
        <div className="flex gap-3">
          <Link
            to="/workout"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Go to My Workouts →
          </Link>
          <button
            onClick={() => refreshExercises()}
            disabled={loading}
            className={`px-4 py-2 rounded text-white transition-colors duration-300 ${
              loading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6 capitalize">
        {category} Workouts
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white text-gray-900 border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 transition"
        />

        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white text-gray-900 border border-gray-300 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 transition"
        >
          <option value="all">All Equipment</option>
          {equipment.map((eq) => (
            <option key={eq.id} value={eq.name}>
              {eq.name}
            </option>
          ))}
        </select>

        <select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white text-gray-900 border border-gray-300 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 transition"
        >
          <option value="all">All Muscles</option>
          {muscles.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      )}
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      {Object.keys(groupedExercises).map((groupKey) => {
        const filtered = filterExercises(groupedExercises[groupKey]);
        if (filtered.length === 0) return null;

        return (
          <div key={groupKey} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 capitalize">
              {groupKey}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {filtered.map((exercise, i) => (
                <ExerciseCard key={i} exercise={exercise} />
              ))}
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
