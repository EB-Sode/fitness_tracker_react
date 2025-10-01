import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Goals from "./pages/goals";
import LoginSignup  from "./pages/login";
// import WorkOutHistory from "./components/WorkOutHistory";
import WorkOutForm from "./components/WorkOutForm";
import GoalTracker from "./components/GoalTracker";
import WorkOutList from "./components/WorkOutList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/login" element={<LoginSignup />} />
        {/* <Route path="/workhistory" element={<WorkOutHistory />} /> */}
        <Route path="/workoutform" element={<WorkOutForm />} />
        <Route path="/goals" element={<GoalTracker />} />
        <Route path="/workoutlist" element={<WorkOutList />} />
      </Routes>
    </Router>
  );
}

export default App;
