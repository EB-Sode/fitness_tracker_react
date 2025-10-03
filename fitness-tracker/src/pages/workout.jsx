import { useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";

export default function Workout() {
  const [workouts, setWorkouts] = useState([]);

  // Add workout to state
  const addWorkout = (newWorkout) => {
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-red-400 mb-6">My Workouts</h1>

      {/* Form to add workouts */}
      <div className="mb-10">
        <WorkoutForm onAddWorkout={addWorkout} />
      </div>

      {/* Workout list categorized by day */}
      <WorkoutList workouts={workouts} />
    </div>
  );
}
