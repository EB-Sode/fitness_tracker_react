import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useStore from "../store/useStore";
import ExerciseCard from "./ExerciseCard";

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

  // Fetch everything once
  useEffect(() => {
    fetchExercises();
    fetchMuscles();
    fetchEquipment();
  }, [fetchExercises, fetchMuscles, fetchEquipment]);

  const groupedExercises = useMemo(() => {
  // ✅ Prevent crash if exercises is not an array
    if (!Array.isArray(exercises) || exercises.length === 0) return {};

  // ✅ Default: show all exercises when no category is selected
    if (!category) return { all: exercises };

    // ✅ Group exercises dynamically by category
    return exercises.reduce((groups, exercise) => {
      let key = "Other";

      if (category === "category") key = exercise.category?.name || "Other";
      else if (category === "muscle")
        key =
          exercise.muscles?.[0]?.name ||
          exercise.muscles_secondary?.[0]?.name || "Other";
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
          (e) =>
            e.name.toLowerCase() === selectedEquipment.toLowerCase()
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
    <div className="p-10">
      <div className="flex justify-between max-w-6xl mx-auto mb-6">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          ← Back to Home
        </Link>
        <div>
        <div>
        <Link
          to="/workout"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Go to My Workouts →
        </Link>
        <button
            onClick={() => refreshExercises()}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
        </div>
        </div>

      </div>

      <h1 className="text-3xl font-bold text-red-400 mb-6 capitalize">
        {category} Workouts
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/3 focus:outline-none"
        />

        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/4 focus:outline-none"
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
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/4 focus:outline-none"
        >
          <option value="all">All Muscles</option>
          {muscles.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {Object.keys(groupedExercises).map((groupKey) => {
        const filtered = filterExercises(groupedExercises[groupKey]);
        if (filtered.length === 0) return null;

        return (
          <div key={groupKey} className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4 capitalize">
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
    </div>
  );
}
