import { useState } from "react";
import useWorkoutStore from "../store/useStore";

function WorkoutForm() {
  const addWorkout = useWorkoutStore((state) => state.addWorkout);

  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise || !duration || !calories) return;

    addWorkout({
      id: Date.now(),
      exercise,
      duration: parseInt(duration),
      calories: parseInt(calories),
    });

    setExercise("");
    setDuration("");
    setCalories("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white shadow rounded">
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Duration (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Calories burned"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
