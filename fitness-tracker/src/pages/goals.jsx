import Layout from "../components/Layout";
import GoalTracker from "../components/GoalTracker";

function Goals() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">🎯 Fitness Goals</h2>
      <p className="mb-4 text-gray-600">
        Set your fitness goals and track your progress here.
      </p>
      <GoalTracker />
    </Layout>
  );
}

export default Goals;
