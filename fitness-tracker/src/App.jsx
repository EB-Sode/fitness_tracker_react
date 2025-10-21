import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";
import LoginSignup from "./pages/login.jsx";
import Workout from "./pages/workout.jsx";
import WorkoutDetails from "./components/WorkoutDetails.jsx";
import WorkoutHistory from "./components/WorkoutHistory.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Services from "./pages/services.jsx";
import Nutrition from "./pages/nutrition.jsx";
import AccountPage from "./pages/userAccount.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";


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
