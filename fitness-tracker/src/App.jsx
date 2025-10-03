import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Goals from "./pages/goals";
import LoginSignup  from "./pages/login";
// import WorkOutHistory from "./components/WorkoutHistory";
import GoalTracker from "./components/GoalTracker";
import WorkoutDetails from "./components/WorkOutDetails";
import Workout from "./pages/workout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/login" element={<LoginSignup />} />
        {/* <Route path="/workhistory" element={<WorkoutHistory />} /> */}
        <Route path="/workout-details/:category" element={<WorkoutDetails />} />
        <Route path="/workout-details/:category/:value" element={<WorkoutDetails />} />
        <Route path="/goals" element={<GoalTracker />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </Router>
  );
}

export default App;
