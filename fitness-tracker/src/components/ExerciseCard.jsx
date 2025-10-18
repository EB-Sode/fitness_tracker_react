import { useState } from "react";
import useStore from "../store/useStore";

function ExerciseCard({ exercise }) {
  const addWorkout = useStore((state) => state.addWorkout);
  const [day, setDay] = useState("Monday");
  const [duration, setDuration] = useState("");

  const name = exercise.translations?.find(t => t.language === 2)?.name || "Unnamed";
  const image = exercise.images?.[0]?.image || null;

  const handleAdd = () => {
    if (!duration) return;

    addWorkout({
      id: Date.now(),
      exercise: name,
      type: exercise.category?.name || "General",
      muscle: exercise.muscles?.[0]?.name || "Universal",
      duration: parseInt(duration),
      day,
      image,
    });

    setDuration("");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
        {/* Exercise image */}
        {image && <img src={image} alt={name} className="w-full h-40 object-cover rounded mb-3" />}
        
        {/* Other details */}
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>

      <p className="text-gray-400 text-sm">
        {exercise.category?.name || "General"} •{" "}
        {exercise.muscles?.[0]?.name || "Universal"} •{" "}
        {exercise.level || "N/A"}
      </p>

      {/* Day selector */}
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="mt-3 px-3 py-2 rounded bg-gray-700 text-white w-full"
      >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
          <option key={d}>{d}</option>
        ))}
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
        className="mt-4 px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-600 transition w-full"
      >
        Add to My Workouts
      </button>
    </div>
  );
}

export default ExerciseCard;
