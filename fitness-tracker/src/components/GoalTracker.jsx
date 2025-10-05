import useStore from "../store/useStore";

function GoalTracker() {
  const workouts = useStore((state) => state.workouts);

  // ✅ Safely flatten workouts grouped by day (if it's an object)
  const allWorkouts = Array.isArray(workouts)
    ? workouts
    : Object.values(workouts || {}).flat();

  // Example: track weekly calorie goal
  const weeklyGoal = 2000;

  // ✅ Prevent crash if calories missing
  const totalCalories = allWorkouts.reduce(
    (sum, w) => sum + (w.calories || 0),
    0
  );

  const progress = Math.min((totalCalories / weeklyGoal) * 100, 100);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Weekly Goal</h3>
      <p className="mb-1 text-gray-600">Goal: {weeklyGoal} cal</p>
      <p className="mb-3 text-gray-600">Burned: {totalCalories} cal</p>
      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className="bg-green-500 h-4 rounded transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default GoalTracker;
