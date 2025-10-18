import { useState, useEffect } from "react";
import useStore from "../store/useStore";

function WorkoutForm() {
  const addWorkout = useStore((state) => state.addWorkout);
  const {
    exercises = [],
    muscles = [],
    equipment = [],
    fetchExercises,
    fetchMuscles,
    fetchEquipment,
    loading,
    error,
  } = useStore((state) => state);

  const [category, setCategory] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");
  const [inputMode, setInputMode] = useState("api");
  let workoutData;

  useEffect(() => {
    if (!exercises.length) fetchExercises();
    if (!muscles.length) fetchMuscles();
    if (!equipment.length) fetchEquipment();
  }, [exercises.length, muscles.length, equipment.length, fetchExercises, fetchMuscles, fetchEquipment]);

  useEffect(() => {
    if (!loading && exercises.length === 0) {
      setCategory("");
      setSelectedValue("");
      setFilteredExercises([]);
    }
  }, [loading, exercises]);

  useEffect(() => {
    if (!category || !selectedValue) {
      setFilteredExercises([]);
      return;
    }

    const filtered = exercises.filter((ex) => {
      if (category === "muscle") {
        const primary = ex.muscles?.[0]?.name?.toLowerCase();
        const secondary = ex.muscles_secondary?.[0]?.name?.toLowerCase();
        return (
          primary === selectedValue.toLowerCase() ||
          secondary === selectedValue.toLowerCase()
        );
      } else if (category === "equipment") {
        return (
          ex.equipment?.[0]?.name?.toLowerCase() ===
          selectedValue.toLowerCase()
        );
      }
      return false;
    });

    setFilteredExercises(filtered);
  }, [category, selectedValue, exercises]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputMode === "api") {
      if (!selectedExerciseId || !duration || !day) {
        alert("Please complete all fields before adding the workout.");
        return;
      }
    } else {
      if (!selectedValue || !category || !duration || !day) {
        alert("Please fill out all manual input fields before adding the workout.");
        return;
      }
    }

    if (inputMode === "api") {
      const exerciseObj = exercises.find(
        (ex) => ex.id.toString() === selectedExerciseId
      );
      const exerciseName =
        exerciseObj.translations?.find((t) => t.language === 2)?.name ||
        "Unknown";

      const existing = useStore.getState().workoutList[day] || [];
      if (existing.some((w) => w.exercise === exerciseName && w.day === day)) {
        alert(`You already added ${exerciseName} for ${day}!`);
        return;
      }

      workoutData = {
        id: Date.now(),
        exercise: exerciseObj?.translations?.find((t) => t.language === 2)
          ?.name || "Unknown",
        muscle: exerciseObj?.muscles?.[0]?.name || "Unknown",
        type: exerciseObj?.category?.name || "General",
        difficulty: exerciseObj?.difficulty || "N/A",
        duration: parseInt(duration) || 0,
        day,
        image: exerciseObj?.images?.[0]?.image || "",
      };
    } else {
      const existing = useStore.getState().workoutList[day] || [];
      if (existing.some((w) => w.exercise === selectedValue && w.day === day)) {
        alert(`You already added ${selectedValue} for ${day}!`);
        return;
      }
      workoutData = {
        id: Date.now(),
        exercise: selectedValue,
        muscle: category,
        type: "Manual",
        difficulty: "Custom",
        duration: parseInt(duration) || 0,
        day,
        image: "",
      };
    }

    addWorkout(workoutData);

    setCategory("");
    setSelectedValue("");
    setFilteredExercises([]);
    setSelectedExerciseId(null);
    setDuration("");
    setDay("");
    setInputMode("api");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-2xl shadow-md max-w-lg mx-auto bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <div className="flex justify-center gap-6 text-red-600 dark:text-red-400">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            value="api"
            checked={inputMode === "api"}
            onChange={() => setInputMode("api")}
            className="accent-red-600 dark:accent-red-400"
          />
          Select from API
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            value="manual"
            checked={inputMode === "manual"}
            onChange={() => setInputMode("manual")}
            className="accent-red-600 dark:accent-red-400"
          />
          Enter Manually
        </label>
      </div>

      {/* Manual Input */}
      {inputMode === "manual" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Exercise name"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Target muscle"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          />
        </div>
      )}

      {/* API Input */}
      {inputMode === "api" && (
        <>
          {loading && (
            <p className="text-blue-500 text-center">Loading exercises...</p>
          )}
          {error && <p className="text-red-500 text-center">⚠️ {error}</p>}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSelectedValue("");
              setFilteredExercises([]);
            }}
            className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          >
            <option value="">-- Select Category Type --</option>
            <option value="muscle">Muscle</option>
            <option value="equipment">Equipment</option>
          </select>

          {category && (
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            >
              <option value="">-- Select {category} --</option>
              {(category === "muscle" ? muscles : equipment).map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          )}

          {filteredExercises.length > 0 && (
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            >
              <option value="">-- Select Exercise --</option>
              {filteredExercises.map((ex) => {
                const name =
                  ex.translations?.find((t) => t.language === 2)?.name ||
                  ex.name;
                return (
                  <option key={ex.id} value={ex.id}>
                    {name}
                  </option>
                );
              })}
            </select>
          )}
        </>
      )}

      <input
        type="number"
        placeholder="Duration (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
      />

      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="border p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
      >
        <option value="">-- Select Day --</option>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {selectedExerciseId && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200 transition">
          <p>
            <strong>Exercise:</strong>{" "}
            {exercises.find(
              (e) => e.id.toString() === selectedExerciseId.toString()
            )?.name || "N/A"}
          </p>
          <p>
            <strong>Day:</strong> {day || "Not selected"}
          </p>
          <p>
            <strong>Duration:</strong> {duration || "0"} mins
          </p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-300"
      >
        Add Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
