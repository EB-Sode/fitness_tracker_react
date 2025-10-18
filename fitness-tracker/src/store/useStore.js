import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./services";

const CACHE_KEY = "exercises_cache";

const useStore = create(
  persist(
      (set) => ({
        workoutList: {},  // grouped by day
        workoutHistory: [], // completed workouts
        muscles: [],
        exercises: [],
        equipment: [],
        images: [],
        loading: false,
        error: null,

      // --- Workouts ---
      // --- Workouts ---
    addWorkout: (workout) => {
        if (!workout.exercise) {
          console.warn("⚠️ Cannot add workout without exercise name:", workout);
          return;
        }

        set((state) => {
          const day = workout.day || "Unassigned";
          const updatedDayList = [...(state.workoutList[day] || []), workout];

          const newWorkoutList = {
            ...state.workoutList,
            [day]: updatedDayList,
          };

          console.log("✅ Workout added:", workout);
          console.log("📘 Updated List:", newWorkoutList);

          return { workoutList: newWorkoutList };
        });
      },

      removeWorkout: (day, workoutId) => {
        set((state) => {
          if (!state.workoutList[day]) return {};

          const updatedDayList = state.workoutList[day].filter((w) => w.id !== workoutId);
          const newWorkoutList = {
            ...state.workoutList,
            [day]: updatedDayList,
          };

          console.log(`🗑 Removed workout with id ${workoutId} from ${day}`);
          console.log("📘 Updated List:", newWorkoutList);

          return { workoutList: newWorkoutList };
        });
      },

      markWorkoutDone: (day, workoutId) => {
        set((state) => {
          const workout = state.workoutList[day]?.find((w) => w.id === workoutId);
          if (!workout) return {};

          // Create a "done" version of the workout
          const completedWorkout = {
            ...workout,
            completed: true,
            completedAt: new Date().toISOString(),
          };

          // Update active list — mark as done but keep it
          const updatedDayList = state.workoutList[day].map((w) =>
            w.id === workoutId ? { ...w, completed: true } : w
          );

          const newWorkoutList = {
            ...state.workoutList,
            [day]: updatedDayList,
          };

          // Append to history (avoid duplicates)
          const alreadyLogged = state.workoutHistory.some(
            (h) => h.id === workoutId && h.day === day
          );

          const updatedHistory = alreadyLogged
            ? state.workoutHistory
            : [...state.workoutHistory, completedWorkout].sort(
                (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
              );

          console.log(`✅ Marked ${workout.exercise} as done on ${day}`);
          console.log("📘 Active Workouts:", newWorkoutList);
          console.log("📚 Sorted History:", updatedHistory);

          return { workoutList: newWorkoutList, workoutHistory: updatedHistory };
        });
      },


    clearWorkouts: () => set({ workoutList: {} }),

    clearHistory: () => set({ workoutHistory: [] }),

    //-----------------------------------------------------
    // --- API Exercises with localStorage caching --------
    fetchExercises: async (filters = {}) => {
      set({ loading: true, error: null });

      try {
        // Check if cache exists and is recent (less than 10 days old)
        const cacheKey = `${CACHE_KEY}_${JSON.stringify(filters)}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const cacheTime = localStorage.getItem(`${CACHE_KEY}_timestamp`);
          const isExpired = !cacheTime || Date.now() - Number(cacheTime) > 24 * 10 * 60 * 60 * 1000; // 10 days

          if (!isExpired) {
            set({ exercises: parsed, loading: false });
            return;
          }
        }

        const res = await api.get("/exerciseinfo/", {
          params: { limit: 20, language: 2, ...filters },
        });

          // ✅ Ensure exercises is always an array
        const exercises = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
          ? res.data.results
          : [];

        localStorage.setItem(CACHE_KEY, JSON.stringify(exercises));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

        set({ exercises, loading: false });
      } catch (err) {
        console.error("❌ Error fetching exercises:", err);
        set({ error: "Failed to fetch exercises", loading: false });
      }
    },

    // --- Fetch Muscles
    fetchMuscles: async () => {
      try {
        const res = await api.get("/muscle/");
        set({ muscles: res.data.results });
      } catch (err) {
        console.error("Error fetching muscles:", err);
      }
    },

    // --- Fetch Equipment
    fetchEquipment: async () => {
      try {
        const res = await api.get("/equipment/");
        set({ equipment: res.data.results });
      } catch (err) {
        console.error("Error fetching equipment:", err);
      }
    },

    fetchImages: async () => {
      try {
        const res = await api.get("/exerciseimage/", { params: { limit: 200 } });
        set({ images: res.data.results });
      } catch (err) {
        console.error("Error fetching images", err);
      }
  },
    clearError: () => set({ error: null }),

      // --- Refresh cache manually ---
    refreshExercises: async (filters = {}) => {
      set({ loading: true, error: null });
      try {
        const res = await api.get("/exerciseinfo/", { params: { limit: 20, language: 2, ...filters } });

        // ✅ Handle both array and paginated responses
        const exercises = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
          ? res.data.results
          : [];

        set({ exercises, loading: false });

        // ✅ Replace cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(exercises));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (err) {
        console.error("❌ Refresh error:", err);
        set({ error: "Failed to refresh exercises", loading: false });
      }
    },
    }),
    {
      name: "workout-storage", // key name in localStorage
      partialize: (state) => ({ 
        workoutList: state.workoutList,
        workoutHistory: state.workoutHistory 
       }), //Store only workoutList

    }
  )
);

export default useStore;
