import { useState, useEffect } from "react";
import useWorkoutStore from "../store/useStore";

function WorkoutForm() {
  const addWorkout = useWorkoutStore((state) => state.addWorkout);

  const [categories, setCategories] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");

  // Fetch categories (e.g. muscles, types, etc.)
  useEffect(() => {
    async function fetchCategories() {
      // Example: you may need to adjust endpoint
      const res = await fetch("https://api.api-ninjas.com/v1/exercises?muscle=biceps", {
        headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
      });
      const data = await res.json();

      // Extract unique categories from data
      const muscles = [...new Set(data.map((item) => item.muscle))];
      setCategories(muscles);
    }

    fetchCategories();
  }, []);

  // Fetch exercises when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    async function fetchExercises() {
      const res = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${selectedCategory}`, {
        headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
      });
      const data = await res.json();
      setExercises(data);
    }

    fetchExercises();
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExercise || !duration || !day) return;

    addWorkout({
      id: Date.now(),
      category: selectedCategory,
      exercise: selectedExercise,
      duration: parseInt(duration),
      day,
    });

    // Reset form
    setSelectedCategory("");
    setSelectedExercise("");
    setDuration("");
    setDay("");
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-inherit shadow rounded max-w-lg mx-auto">
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 w-full bg-gray-600 text-red-400 rounded"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Exercise Dropdown */}
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="border p-2 w-full bg-gray-600 text-red-300 rounded"
          disabled={!selectedCategory}
        >
          <option value="">-- Select Exercise --</option>
          {exercises.map((ex) => (
            <option key={ex.name} value={ex.name}>
              {ex.name}
            </option>
          ))}
        </select>

        {/* Duration */}
        <input
          type="number"
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 w-full rounded bg-gray-500 text-red-400"
        />

        {/* Day of the Week */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 w-full rounded bg-gray-500 text-red-400"
        >
          <option value="">-- Select Day --</option>
          {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Workout
        </button>
      </form>
  );
}

export default WorkoutForm;
