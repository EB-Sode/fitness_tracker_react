import useStore from "../store/useStore";
import { Link } from "react-router-dom";

function WorkoutList() {
  const workoutList = useStore((state) => state.workoutList);
  const removeWorkout = useStore((state) => state.removeWorkout);
  const markWorkoutDone = useStore((state) => state.markWorkoutDone);
  const clearWorkouts = useStore((state) => state.clearWorkouts);
  
  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your entire workout list? This action cannot be undone."
      )
    ) {
      clearWorkouts();
      localStorage.removeItem("workoutList");
    }
  };

  return (
    <div className="p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500 min-h-screen">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">
        My Workout Goals
      </h2>

      {Object.keys(workoutList || {}).length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No workouts added yet.
        </p>
      ) : (
        Object.keys(workoutList).map((day) => (
          <div
            key={day}
            className="mb-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-500"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
              {day}
            </h3>
            <div className="space-y-3">
              {workoutList[day].map((workout) => (
                <div
                  key={workout.id}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow flex justify-between items-center transition-transform hover:scale-[1.01]"
                >
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {workout.exercise}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                      {workout.type} • {workout.muscle} • {workout.difficulty}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                      Duration: {workout.duration} mins
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => markWorkoutDone(day, workout.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Done ✅
                    </button>
                    <button
                      onClick={() => removeWorkout(day, workout.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <div className="flex justify-between items-center max-w-6xl mx-auto mt-10">
        <Link
          to="/workhistory"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-700 transition"
        >
          Check history
        </Link>
        <button
          onClick={handleClearHistory}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          🧹 Reset your list
        </button>
      </div>
    </div>
  );
}

export default WorkoutList;
