import useStore from "../store/useStore";

function WorkoutHistory() {
  const history = useStore((state) => state.workoutHistory);

  return (
    <div className="p-6 border-dashed border-4 border-red-400 rounded-lg">
      <h2 className="text-2xl font-bold text-red-400 mb-6">Workout History</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No completed workouts yet.</p>
      ) : (
        <div className="space-y-3">
          {history.map((workout) => (
            <div
              key={workout.id}
              className="bg-gray-700 p-4 rounded-lg shadow"
            >
              <p className="text-white font-medium">{workout.exercise}</p>
              <p className="text-gray-400 text-sm">
                {workout.type} • {workout.muscle} • {workout.difficulty}
              </p>
              <p className="text-gray-300 text-sm">
                Duration: {workout.duration} mins
              </p>
              <p className="text-gray-500 text-xs">
                Completed at: {new Date(workout.completedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutHistory;
