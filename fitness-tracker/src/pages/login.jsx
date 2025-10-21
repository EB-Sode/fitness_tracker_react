import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { Link } from "react-router-dom";

export default function LoginSignup() {

  //toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);

    // Store all form field values in one object
  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    weight: "",
    password: "",
    confirmPassword: "",
  });

  //handles input validation errors
  const [error, setError] = useState("");

  // React Router hook for page navigation  
  const navigate = useNavigate();

  // Get login and signup methods from authentication context
  const { login, signup } = useAuth();

  //handles submission for login and signup
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // resets any previous error messages

    // -----------------
    // LOGIN LOGIC
    // -----------------
    if (isLogin) {
      // Ensure username and password are filled in
      if (!form.username || !form.password) {
        setError("Please enter your username and password");
        return;
      }

      // Call login() from context (you define it in AuthContext)
      const success = login(form.username, form.password);

      // If login is successful → redirect to dashboard
      if (success) navigate("/");
      else setError("Invalid username or password"); // Otherwise show error
    }
  
 // -----------------
    // SIGNUP LOGIC
    // -----------------
    else {
      // Make sure all signup fields are filled
      if (
        !form.username ||
        !form.email ||
        !form.password ||
        !form.confirmPassword ||
        !form.age ||
        !form.weight
      ) {
        setError("Please fill in all fields");
        return;
      }

      // Confirm both password fields match
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Call signup() function from AuthContext (to "register" user)
      signup(
        form.username,
        form.password,
        form.email,
        form.age,
        form.weight
      );

      // Redirect to dashboard after signup
      navigate("/dashboard");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
    
      {/* Card container for form */}
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg p-8">
        {/* Title changes based on mode (Login or Signup) */}
        <h2 className="text-2xl font-bold text-center text-red-400 mb-6">
          {isLogin ? "Login to Fitness Tracker" : "Create Your Account"}
        </h2>

        {/* Show error message if present */}
        {error && (
          <p className="text-center text-red-400 bg-red-900/20 rounded p-2 mb-3">
            {error}
          </p>
        )}

 {/* Form starts here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Signup-only inputs (hidden on Login mode) */}
          {!isLogin && (
            <>
              {/* Email Field */}
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Age Field */}
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Weight Field */}
              <input
                type="number"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </>
          )}

          {/* Username Field (used in both Login and Signup) */}
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Password Field (used in both Login and Signup) */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Confirm Password (only for Signup) */}
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}

          {/* Submit Button (text changes based on mode) */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="text-center text-gray-400 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin); // Flip form mode
              setError(""); // Clear error on switch
            }}
            className="text-red-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        <div>
          
          <Link
          to="/"
          className=" px-4 py-2 text-gray-400 hover:underline rounded mt-10 text-semi-bold"
        >
          <p>
            Already logged in? <span className="text-blue-500">Home</span>
          </p>
          
        </Link>
        </div>
      </div>
    </div>
  );
}