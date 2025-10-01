import { useState } from "react";
import Layout from "../components/Layout";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-red-400 mb-6">
          {isLogin ? "Login to Fitness Tracker" : "Create Your Account"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
