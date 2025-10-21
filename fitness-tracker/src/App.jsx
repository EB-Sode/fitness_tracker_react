import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import LoginSignup from "./pages/login";
import Workout from "./pages/workout";
import WorkoutList from "./components/WorkOutList";
import WorkoutDetails from "./components/WorkOutDetails";
import WorkoutHistory from "./components/WorkOutHistory";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Services from "./pages/services";
import Nutrition from "./pages/nutrition";
import AccountPage from "./pages/userAccount";
import { SettingsProvider } from "./context/SettingsContext";


function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workhistory"
            element={
              <ProtectedRoute>
                <WorkoutHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout-details/:category"
            element={
              <ProtectedRoute>
                <WorkoutDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout-details/:category/:value"
            element={
              <ProtectedRoute>
                <WorkoutDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout"
            element={
              <ProtectedRoute>
                <Workout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
            />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <WorkoutList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
               <Services />
              </ProtectedRoute>
            }
          />

          <Route
              path="/nutrition"
              element={
                <ProtectedRoute>
                <Nutrition />
                </ProtectedRoute>
              }
            />

          </Routes>

      </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
