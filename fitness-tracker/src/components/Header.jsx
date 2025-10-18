import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between items-center mt-6 px-4 py-3 shadow-md rounded-b-lg backdrop-blur-sm">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-white">🏋️ Fitness Tracker</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center gap-8">
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
            to="/account"
            className={({ isActive }) =>
              `text-gray-100 hover:text-red-400 transition ${
                isActive ? "border-b-2 border-red-500 pb-1" : ""
              }`
            }
          >
            Account
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-100 hover:text-red-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md px-6 py-4 space-y-4 shadow-lg">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-100 hover:text-red-400 transition ${
                isActive ? "border-l-4 border-red-500 pl-2" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-100 hover:text-red-400 transition ${
                isActive ? "border-l-4 border-red-500 pl-2" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/goals"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-100 hover:text-red-400 transition ${
                isActive ? "border-l-4 border-red-500 pl-2" : ""
              }`
            }
          >
            Goals
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-100 hover:text-red-400 transition ${
                isActive ? "border-l-4 border-red-500 pl-2" : ""
              }`
            }
          >
            Login/Signup
          </NavLink>
        </div>
      )}
    </header>
  );
}
