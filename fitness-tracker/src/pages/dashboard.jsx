import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import WorkoutHistory from "../components/WorkOutHistory";

const data = [
  { day: "Mon", workouts: 2 },
  { day: "Tue", workouts: 1 },
  { day: "Wed", workouts: 3 },
  { day: "Thu", workouts: 2 },
  { day: "Fri", workouts: 1 },
  { day: "Sat", workouts: 2 },
  { day: "Sun", workouts: 0 },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-12 py-12 m-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* LEFT SECTION - IMAGE */}
          <aside className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:col-span-1 py-10">
            <img
              src="../exerciser.png"
              alt="Exerciser"
              className="w-100 h-100 rounded-full border-red-500 shadow-lg"
            />
          </aside>

          {/* RIGHT SECTION - DASHBOARD CONTENT */}
          <main className="md:col-span-2 space-y-10">
              <div>
                <h1 className="text-3xl font-bold text-red-400 mb-2">Welcome Back</h1>
                <p className="text-gray-300">Your progress at a glance</p>
            </div>
            {/* Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-800 rounded-xl shadow-md text-center">
                <h3 className="text-3xl font-bold text-red-400">12</h3>
                <p className="text-gray-400">Workouts Completed</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-xl shadow-md text-center">
                <h3 className="text-3xl font-bold text-red-400">4</h3>
                <p className="text-gray-400">Goals Achieved</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-xl shadow-md text-center">
                <h3 className="text-3xl font-bold text-red-400">20 hrs</h3>
                <p className="text-gray-400">Training Time</p>
              </div>
            </section>

            {/* Recent Workouts + Goals */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold text-red-400 mb-4">
                  Recent Workouts
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="border-b border-gray-700 pb-2">🏋️ Chest Day – 1 hr</li>
                  <li className="border-b border-gray-700 pb-2">🏃 Cardio – 30 mins</li>
                  <li className="pb-2">🧘 Yoga – 45 mins</li>
                </ul>
                <Link
                  to="/WorkOutList"
                  className="text-red-400 hover:underline text-sm mt-3 inline-block"
                >
                  View All Workouts →
                </Link>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold text-red-400 mb-4">
                  Upcoming Goals
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="border-b border-gray-700 pb-2">✅ Run 10km this week</li>
                  <li className="border-b border-gray-700 pb-2">✅ 3 Strength Sessions</li>
                  <li className="pb-2">✅ Daily Stretch Routine</li>
                </ul>
                <Link
                  to="/goals"
                  className="text-red-400 hover:underline text-sm mt-3 inline-block"
                >
                  View Goals →
                </Link>
              </div>
            </section>

            {/* Chart Section */}
            <section className="bg-gray-800 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Weekly Workouts
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="day" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="workouts"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* Call to Actions */}
            <section className="flex justify-center gap-6">
              <Link
                to="/workouts/new"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white shadow-md"
              >
                Add Workout
              </Link>
              <Link
                to="/goals/new"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-white shadow-md"
              >
                Set Goal
              </Link>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}
