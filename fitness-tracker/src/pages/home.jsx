import Layout from "../components/Layout";
import WorkOutForm from "../components/WorkOutForm";
import WorkOutList from "../components/WorkOutList";
import GoalTracker from "../components/GoalTracker";

// function Home() {
//   return (
//     <Layout>
//       <h2 className="text-2xl font-semibold mb-4">Track Your Workouts</h2>
//       <WorkOutForm />
//       <WorkOutList />
//       <GoalTracker />
//     </Layout>
//   );
// }

// export default Home;

export default function Home() {
  return (
    <Layout>
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-400 mb-4">
          Welcome to Fitness Tracker
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Track your workouts, monitor your progress, and stay motivated on your fitness journey.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-gray-800 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-red-400">0</h3>
          <p className="text-gray-400">Workouts Completed</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-red-400">0</h3>
          <p className="text-gray-400">Goals Achieved</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-red-400">0 hrs</h3>
          <p className="text-gray-400">Total Training Time</p>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-red-400 mb-3">Recent Workouts</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="border-b border-gray-700 pb-2">🏋️ Chest Day – 0 hr</li>
            <li className="border-b border-gray-700 pb-2">🏃 Cardio – 0 mins</li>
            <li className="pb-2">🧘 Yoga – 0 mins</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-red-400 mb-3">Upcoming Goals</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="border-b border-gray-700 pb-2">✅ Run 10km this week</li>
            <li className="border-b border-gray-700 pb-2">✅ 3 Strength Sessions</li>
            <li className="pb-2">✅ Daily Stretch Routine</li>
          </ul>
        </div>
      </section>
    </div>
    </Layout>
  );
}
