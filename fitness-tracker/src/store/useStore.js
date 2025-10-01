import { create } from "zustand";

const useStore = create((set) => ({
  workouts: [],
  items: [],

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

  // Load exercises from JSON
  loadItems: async () => {
    try {
      const response = await fetch("/exercise.json");
      const data = await response.json();
      set({ items: data });
    } catch (error) {
      console.error("Error loading exercise data:", error);
    }
  },
}));

export default useStore;
