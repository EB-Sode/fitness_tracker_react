import useWorkoutStore from "../store/useStore";

function GoalTracker() {
  const workouts = useWorkoutStore((state) => state.workouts);

  // Example: track weekly calorie goal
  const weeklyGoal = 2000;
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const progress = Math.min((totalCalories / weeklyGoal) * 100, 100);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-2">Weekly Goal</h3>
      <p className="mb-2">Goal: {weeklyGoal} cal</p>
      <p className="mb-2">Burned: {totalCalories} cal</p>
      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default GoalTracker;
