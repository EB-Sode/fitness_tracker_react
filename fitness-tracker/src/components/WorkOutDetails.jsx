import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useStore from "../store/useStore";
import ExerciseCard from "./ExerciseCard";

export default function WorkoutDetails() {
  const { category } = useParams();
  const { exercises, fetchExercises, loading, error } = useStore();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [type, setType] = useState("all");

  // Fetch all exercises once
  useEffect(() => {
    fetchExercises({});
  }, [fetchExercises]);

  // Determine grouping key based on category
  const groupedExercises = useMemo(() => {
    if (!category) return { all: exercises };

    return exercises.reduce((groups, exercise) => {
      let key = "Other";

      if (category === "muscle") key = exercise.muscle || "Other";
      else if (category === "type") key = exercise.type || "Other";
      else if (category === "difficulty") key = exercise.difficulty || "Other";

      if (!groups[key]) groups[key] = [];
      groups[key].push(exercise);
      return groups;
    }, {});
  }, [category, exercises]);

  // Filter function for search, type, and difficulty
  const filterExercises = (exerciseList) => {
    return exerciseList.filter((exercise) => {
      const name = exercise.name?.toLowerCase() || "";
      const exType = exercise.type?.toLowerCase() || "";
      const exDifficulty = exercise.difficulty?.toLowerCase() || "";

      const matchesSearch = name.includes(search.toLowerCase());
      const matchesDifficulty =
        difficulty === "all" || exDifficulty === difficulty.toLowerCase();
      const matchesType = type === "all" || exType === type.toLowerCase();

      return matchesSearch && matchesDifficulty && matchesType;
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-red-400 mb-6 capitalize">
        {category} Workouts
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/3 focus:outline-none"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/4 focus:outline-none"
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/4 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="stretching">Stretching</option>
          <option value="powerlifting">Powerlifting</option>
        </select>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Display grouped exercises */}
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

