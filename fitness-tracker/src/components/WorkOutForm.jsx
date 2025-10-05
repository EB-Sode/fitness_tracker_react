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


  const [category, setCategory] = useState(""); // "muscle" or "equipment"
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");


  // ✅ Fetch all base data from the store (uses localStorage caching)
  useEffect(() => {
    if (!exercises.length) fetchExercises();
    if (!muscles.length) fetchMuscles();
    if (!equipment.length) fetchEquipment();
  }, [exercises.length, muscles.length, equipment.length, fetchExercises, fetchMuscles, fetchEquipment]);

  // ✅ Reset form if exercises list is empty after loading
  useEffect(() => {
  if (!loading && exercises.length === 0) {
    setCategory("");
    setSelectedValue("");
    setFilteredExercises([]);
  }
  }, [loading, exercises]);


  // ✅ Filter exercises based on selected category/value
  useEffect(() => {
    if (!category || !selectedValue) {
      setFilteredExercises([]);
      return;
    }

    const filtered = exercises.filter((ex) => {
      if (category === "muscle") {
        const primary = ex.muscles?.[0]?.name?.toLowerCase();
        const secondary = ex.muscles_secondary?.[0]?.name?.toLowerCase();
        return primary === selectedValue.toLowerCase() || secondary === selectedValue.toLowerCase();
      } else if (category === "equipment") {
        return ex.equipment?.[0]?.name?.toLowerCase() === selectedValue.toLowerCase();
      }
      return false;
    });

    setFilteredExercises(filtered);
  }, [category, selectedValue, exercises]);

  // ✅ Submit workout
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Adding workout:", selectedExerciseId, duration, day);

    if (!selectedExerciseId || !duration || !day) return;

    const exerciseObj = exercises.find((ex) => ex.id.toString() === selectedExerciseId);
    const exerciseName = exerciseObj.translations?.find(t => t.language === 2)?.name || "Unknown";

    // Prevent duplicates for same day
    const existing = useStore.getState().workoutList[day] || [];
    if (existing.some((w) => w.exercise === exerciseName && w.day === day)) {
      alert(`You already added ${exerciseName} for ${day}!`);
      return;
    }
    addWorkout({
      id: Date.now(),
      exercise: exerciseName,
      muscle: exerciseObj?.muscles?.[0]?.name || "Unknown",
      type: exerciseObj?.category?.name || "General",
      difficulty: exerciseObj?.difficulty || "N/A",
      duration: parseInt(duration) || "0",
      day,
      image: exerciseObj?.images?.[0]?.image || "",
    });

    // Reset form
    setCategory("");
    setSelectedValue("");
    setFilteredExercises([]);
    setSelectedExerciseId(null);
    setDuration("");
    setDay("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-900 shadow-lg rounded max-w-lg mx-auto">
      {/* Category Select */}
      {loading && (
        <p className="text-blue-400 text-center">Loading exercises...</p>
      )}
      {error && (
        <p className="text-red-500 text-center">⚠️ {error}</p>
      )}
      

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSelectedValue("");
          setFilteredExercises([]);
        }}
        className="border p-2 w-full bg-gray-700 text-red-400 rounded"
      >
        <option value="">-- Select Category Type --</option>
        <option value="muscle">Muscle</option>
        <option value="equipment">Equipment</option>
      </select>

      {/* Value Select */}
      {category && (
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="border p-2 w-full bg-gray-700 text-red-300 rounded"
        >
          <option value="">-- Select {category} --</option>
          {(category === "muscle" ? muscles : equipment).map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}

      {/* Exercise Select */}
      {filteredExercises.length > 0 && (
        <select
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
          className="border p-2 w-full bg-gray-700 text-red-300 rounded"
        >
          <option value="">-- Select Exercise --</option>
          {filteredExercises.map((ex) => {
            const name = ex.translations?.find(t => t.language === 2)?.name || ex.name;
            return <option key={ex.id} value={ex.id}>{name}</option>;
          })}
        </select>
      )}

      {/* Duration */}
      <input
        type="number"
        placeholder="Duration (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 w-full rounded bg-gray-600 text-red-300"
      />

      {/* Day of the Week */}
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="border p-2 w-full rounded bg-gray-600 text-red-300"
      >
        <option value="">-- Select Day --</option>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* Summary */}
      {selectedExerciseId && (
        <div className="p-3 bg-gray-800 text-gray-200 rounded">
          <p><strong>Exercise:</strong> {exercises.find(e => e.id.toString() === selectedExerciseId.toString())?.name}</p>
          <p><strong>Day:</strong> {day || "Not selected"}</p>
          <p><strong>Duration:</strong> {duration || "0"} mins</p>
        </div>
      )}


      <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full">
        Add Workout
      </button>
    </form>
    
  );
}

export default WorkoutForm;
