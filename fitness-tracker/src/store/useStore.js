import { create } from "zustand";
import api from "./services";

const CACHE_KEY = "exercises_cache";

const useStore = create((set) => ({
  workoutList: {},  // grouped by day
  workoutHistory: [], // completed workouts
  // workouts: [],
  // exercises: [],
  // loading: false,
  // error: null,

  // --- Workouts ---
  addWorkout: (workout) =>
    set((state) => {
      const day = workout.day || "Unassigned"; // default if no day provided
      return {
        workoutList: {
          ...state.workoutList,
          [day]: [...(state.workoutList[day] || []), workout],
        },
      };
    }),

  removeWorkout: (day, id) =>
    set((state) => ({
      workoutList: {
        ...state.workoutList,
        [day]: state.workoutList[day].filter((w) => w.id !== id),
      },
    })),

  markWorkoutDone: (day, workoutId) =>
    set((state) => {
      const workout = state.workoutList[day]?.find((w) => w.id === workoutId);
      if (!workout) return {};

      return {
        // remove from active list
        workoutList: {
          ...state.workoutList,
          [day]: state.workoutList[day].filter((w) => w.id !== workoutId),
        },
        // add to history
        workoutHistory: [
          ...state.workoutHistory,
          { ...workout, completedAt: new Date().toISOString() },
        ],
      };
    }),

  clearWorkouts: () => set({ workoutList: {}, workoutHistory: [] }),

  //---------------------------------------------------
  // --- API Exercises with localStorage caching ---------------------
  fetchExercises: async (filters = {}) => {
    set({ loading: true, error: null });

    try {
      // Check if cache exists
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        set({ exercises: parsed, loading: false });
        return;
      }

      // Otherwise fetch from API
      const res = await api.get("/", { params: filters });
      set({ exercises: res.data, loading: false });

      // Save to localStorage
      localStorage.setItem(CACHE_KEY, JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch exercises", loading: false });
    }
  },

  clearError: () => set({ error: null }),

  // --- Refresh cache manually ---
  refreshExercises: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/", { params: filters });
      set({ exercises: res.data, loading: false });

      // Replace cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      set({ error: "Failed to refresh exercises", loading: false });
    }
  },
}));

export default useStore;
