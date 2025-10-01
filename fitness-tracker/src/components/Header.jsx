import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
     <div className="max-w-6xl mx-auto flex justify-between items-center">
     <h1 className="text-xl font-bold">🏋️ Fitness Tracker</h1>
      <nav className="flex justify-center gap-8 py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-100 hover:text-red-400 transition ${
              isActive ? "border-b-2 border-red-500 pb-1" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-gray-100 hover:text-red-400 transition ${
              isActive ? "border-b-2 border-red-500 pb-1" : ""
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            `text-gray-100 hover:text-red-400 transition ${
              isActive ? "border-b-2 border-red-500 pb-1" : ""
            }`
          }
        >
          Goals
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-gray-100 hover:text-red-400 transition ${
              isActive ? "border-b-2 border-red-500 pb-1" : ""
            }`
          }
        >
          Login/Signup
        </NavLink>
      </nav>
      </div>
    </header>
  );
}
