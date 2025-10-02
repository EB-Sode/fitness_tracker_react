import { create } from "zustand";
import api from "./services";

const useStore = create((set) => ({
  workouts: [],
  exercises: [],
  loading: false,
  error: null,

  // --- Workouts ---
  addWorkout: (workout) =>
    set((state) => ({ workouts: [...state.workouts, workout] })),

  removeWorkout: (id) =>
    set((state) => ({ workouts: state.workouts.filter((w) => w.id !== id) })),

  clearWorkouts: () => set({ workouts: [] }),

  // --- API Exercises ---
  fetchExercises: async (filters = { muscle: "biceps" }) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/", { params: filters });
      set({ exercises: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch exercises", loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useStore;
