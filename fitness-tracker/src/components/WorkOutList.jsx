import useWorkoutStore from "../store/useStore";

function WorkoutList() {
  const { workouts, removeWorkout } = useWorkoutStore();

  if (workouts.length === 0) {
    return <p className="text-gray-500">No workouts yet. Add one!</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      {workouts.map((w) => (
        <div key={w.id} className="p-3 bg-gray-100 rounded flex justify-between">
          <div>
            <p className="font-bold">{w.exercise}</p>
            <p>{w.duration} mins | {w.calories} cal</p>
          </div>
          <button
            onClick={() => removeWorkout(w.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
