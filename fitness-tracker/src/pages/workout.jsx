import { useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";
import Layout from "../components/Layout";

export default function Workout() {
  const [workouts, setWorkouts] = useState([]);

  // Add workout to state
  const addWorkout = (newWorkout) => {
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  return (
    <Layout>
      <div className="p-10 min-h-screen bg-gray-100 text-gray-900 dark:bg-red-900 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-8 text-center">
            My Workouts
          </h1>

          {/* Form to add workouts */}
          <div className="mb-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 transition-colors duration-300">
            <WorkoutForm onAddWorkout={addWorkout} />
          </div>

          {/* Workout list categorized by day */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <WorkoutList workouts={workouts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
