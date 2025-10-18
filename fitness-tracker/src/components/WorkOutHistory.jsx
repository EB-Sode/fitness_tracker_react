// src/components/WorkoutHistory.jsx
import React from "react";
import useWorkoutStore from "../store/useStore";
import { Link } from "react-router-dom";

const WorkoutHistory = () => {
  const workoutHistory = useWorkoutStore((state) => state.workoutHistory);

  // Sort in ascending order by date (oldest first)
  const sortedHistory = [...workoutHistory].sort(
    (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
  );

  if (sortedHistory.length === 0) {
    return (
      <div className="p-4 bg-gray-800 text-gray-400 rounded mt-4">
        No workouts logged yet.
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md w-full max-w-4xl">
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
        </div>
        </div>

      </div>
      <h2 className="text-lg font-semibold mb-3 text-red-400">
        Achievements 🗓️
      </h2>

      <ul className="space-y-3">
        {sortedHistory.map((workout, index) => (
          <li
            key={index}
            className="bg-gray-800 p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div>
              <p className="text-red-300 font-medium">{workout.exercise}</p>
              <p className="text-sm text-gray-400">
                Day: <span className="text-gray-200">{workout.day || "N/A"}</span>
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-2 sm:mt-0">
              Done on:{" "}
              {new Date(workout.completedAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default WorkoutHistory;
