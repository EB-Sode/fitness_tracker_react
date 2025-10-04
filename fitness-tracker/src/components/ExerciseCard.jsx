import { useState } from "react";
import useWorkoutStore from "../store/useStore";

function ExerciseCard({ exercise }) {
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const [day, setDay] = useState("Monday");
  const [duration, setDuration] = useState("");

  const handleAdd = () => {
    if (!duration) return; // prevent empty duration

    addWorkout({
      id: Date.now(),
      exercise: exercise.name,
      type: exercise.type,
      muscle: exercise.muscle,
      difficulty: exercise.difficulty,
      duration: parseInt(duration),
      day,
    });

    setDuration(""); // reset
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-white mb-2">{exercise.name}</h3>
  <p className="text-gray-400 text-sm">
        {exercise.type} • {exercise.muscle} • {exercise.difficulty}
      </p>

      {/* Day selector */}
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="mt-3 px-3 py-2 rounded bg-gray-700 text-white w-full"
      >
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>

      {/* Duration input */}
      <input
        type="number"
        placeholder="Duration (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="mt-3 px-3 py-2 rounded bg-gray-700 text-white w-full"
      />

      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition w-full"
      >
        Add to My Workouts
      </button>
    </div>
  );
}

export default ExerciseCard;
