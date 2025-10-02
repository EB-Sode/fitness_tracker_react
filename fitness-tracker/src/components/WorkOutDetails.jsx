import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import api from "../store/services"; // your axios setup

export default function WorkoutDetails() {
  const { category } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addWorkout = useStore((state) => state.addWorkout);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/", { params: { muscle: category } });
        setWorkouts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 capitalize text-red-400">
        {category} Workouts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={w.image || "https://via.placeholder.com/300"}
              alt={w.name}
              className="rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{w.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{w.instructions}</p>
            <button
              onClick={() => addWorkout(w)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
            >
              ➕ Add to My Workouts
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
