import useStore from "../store/useStore";

function WorkoutList() {
  const workoutList = useStore((state) => state.workoutList);
  const removeWorkout = useStore((state) => state.removeWorkout);
  const markWorkoutDone = useStore((state) => state.markWorkoutDone);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-400 mb-6">My Workouts</h2>

      {Object.keys(workoutList || {}).length === 0 ? (
        <p className="text-gray-400">No workouts added yet.</p>
      ) : (
        Object.keys(workoutList).map((day) => (
          <div key={day} className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">{day}</h3>
            <div className="space-y-3">
              {workoutList[day].map((workout) => (
                <div
                  key={workout.id}
                  className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">{workout.exercise}</p>
                    <p className="text-gray-400 text-sm">
                      {workout.type} • {workout.muscle} • {workout.difficulty}
                    </p>
                    <p className="text-gray-300 text-sm">
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
                      onClick={() => removeWorkout(workout.id)}
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
    </div>
  );
}

export default WorkoutList;
