import { create } from "zustand";

const useWorkoutStore = create((set) => ({
  workouts: [],

  // Add a new workout
  addWorkout: (workout) =>
    set((state) => ({
      workouts: [...state.workouts, workout],
    })),

  // Remove a workout
  removeWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id),
    })),

  // Clear all workouts
  clearWorkouts: () => set({ workouts: [] }),
}));

export default useWorkoutStore;
