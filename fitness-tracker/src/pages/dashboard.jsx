import { useMemo } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import useWorkoutStore from "../store/useStore";

export default function Dashboard() {
  const workoutHistory = useWorkoutStore((state) => state.workoutHistory);
  const workoutList = useWorkoutStore((state) => state.workoutList);

  const stats = useMemo(() => {
    const totalCompleted = workoutHistory.length;
    let totalMinutes = 0;
    Object.values(workoutList || {}).forEach(dayWorkouts => {
      dayWorkouts.forEach(workout => {
        totalMinutes += workout.duration || 0;
      });
    });
    return {
      totalCompleted,
      goalsAchieved: totalCompleted,
      totalTime: totalMinutes
    };
  }, [workoutHistory, workoutList]);

  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      weekData.push({
        day: days[date.getDay()],
        workouts: 0,
        date: date.toDateString()
      });
    }
    workoutHistory.forEach(workout => {
      if (workout.completedAt) {
        const date = new Date(workout.completedAt).toDateString();
        const day = weekData.find(d => d.date === date);
        if (day) day.workouts++;
      }
    });
    return weekData;
  }, [workoutHistory]);

  const recentWorkouts = useMemo(() => (
    [...workoutHistory]
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 3)
  ), [workoutHistory]);

  const upcomingGoals = useMemo(() => {
    const goals = [];
    Object.entries(workoutList || {}).forEach(([day, workouts]) => {
      workouts.slice(0, 3 - goals.length).forEach(workout => {
        goals.push({
          day,
          exercise: workout.exercise,
          duration: workout.duration,
          type: workout.type
        });
      });
    });
    return goals.slice(0, 3);
  }, [workoutList]);

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} mins`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const emoji = {
    cardio: "🏃",
    strength: "🏋️",
    flexibility: "🧘",
    powerlifting: "💪",
    stretching: "🤸"
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* LEFT IMAGE */}
          <aside className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:col-span-1 py-10">
            <img
              src="../exerciser.png"
              alt="Exerciser"
              className="w-48 h-48 rounded-full border-4 border-red-500 shadow-lg"
            />
          </aside>

          {/* MAIN DASHBOARD */}
          <main className="md:col-span-3 space-y-10">
            <div>
              <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-700 dark:text-gray-300">Your progress at a glance</p>
            </div>

            {/* Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Workouts Completed", value: stats.totalCompleted },
                { label: "Goals Achieved", value: stats.goalsAchieved },
                { label: "Total Planned Time", value: formatTime(stats.totalTime || 0) }
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-center transition-all"
                >
                  <h3 className="text-3xl font-bold text-red-600 dark:text-red-400">{s.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{s.label}</p>
                </div>
              ))}
            </section>

            {/* Recent Workouts + Upcoming Goals */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                  Recent Achievements
                </h2>
                {recentWorkouts.length ? (
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {recentWorkouts.map((w, i) => (
                      <li key={i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                        ✅ {w.exercise || "Workout"}{" "}
                        <span className="text-gray-500 text-xs ml-2">({w.day})</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No workouts completed yet.</p>
                )}
                <Link
                  to="/workhistory"
                  className="text-red-600 dark:text-red-400 hover:underline text-sm mt-3 inline-block"
                >
                  View Full History →
                </Link>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                  Upcoming Workouts
                </h2>
                {upcomingGoals.length ? (
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {upcomingGoals.map((g, i) => (
                      <li key={i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                        {emoji[g.type?.toLowerCase()] || "🏋️"} {g.exercise}
                        <span className="text-gray-500 text-xs ml-2">
                          ({g.day} • {g.duration} mins)
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No upcoming workouts scheduled.</p>
                )}
                <Link
                  to="/workout"
                  className="text-red-600 dark:text-red-400 hover:underline text-sm mt-3 inline-block"
                >
                  View All Workouts →
                </Link>
              </div>
            </section>

            {/* Weekly Progress Chart */}
            <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                Weekly Progress
              </h2>
              {weeklyData.length > 0 && workoutHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" dark:stroke="#444" />
                    <XAxis dataKey="day" stroke="#555" dark:stroke="#ccc" />
                    <YAxis stroke="#555" dark:stroke="#ccc" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f9fafb",
                        color: "#000",
                        border: "1px solid #ddd",
                        borderRadius: "8px"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="workouts"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ fill: "#ef4444", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-500 italic mb-2">No workout data available yet</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Complete workouts to see your progress here
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* CTA Buttons */}
            <section className="flex justify-center gap-6">
              <Link
                to="/services"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white dark:text-white shadow-md transition"
              >
                Explore our services
              </Link>
              <Link
                to="/workout"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-white shadow-md transition"
              >
                View Goals
              </Link>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}
