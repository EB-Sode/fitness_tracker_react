import React from "react";
import useStore from "../store/useStore";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const WorkoutHistory = () => {
  const workoutHistory = useStore((state) => state.workoutHistory) || [];
  const clearWorkouts = useStore((state) => state.clearHistory);

  const sortedHistory = [...workoutHistory].sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your entire workout history? This action cannot be undone."
      )
    ) {
      clearWorkouts();
      localStorage.removeItem("workoutHistory");
    }
  };

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="p-6 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-md w-full max-w-4xl transition-colors duration-300">
        {/* Header Links */}
        <div className="flex justify-between max-w-6xl mx-auto mb-6">
          <Link
            to="/"
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all"
          >
            ← Back to Home
          </Link>
          <div>
            <Link
              to="/workout"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 m-1 transition-all"
            >
              Workout list →
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 m-1 transition-all"
            >
              Dashboard →
            </Link>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">
          Achievements 🗓️
        </h2>

        {/* Content */}
        {sortedHistory.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 italic">
            No workouts logged yet.
          </p>
        ) : (
          <>
            <ul className="space-y-3 mb-6">
              {sortedHistory.map((workout, index) => (
                <li
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all"
                >
                  <div>
                    <p className="text-red-600 dark:text-red-300 font-medium">
                      {workout.exercise || "Unnamed"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Day:{" "}
                      <span className="text-gray-800 dark:text-gray-200">
                        {workout.day || "N/A"}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                    Done on:{" "}
                    {workout.completedAt
                      ? new Date(workout.completedAt).toLocaleString("en-US", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Unknown date"}
                  </p>
                </li>
              ))}
            </ul>

            {/* Clear History Button */}
            <div className="flex justify-center">
              <button
                onClick={handleClearHistory}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
              >
                🧹 Clear History
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WorkoutHistory;
