import { useState } from "react";
import { useSettings } from "../hooks/useSettings";


export default function Settings() {
  const {
    notifications,
    setNotifications,
    theme,
    setTheme,
    language,
    setLanguage,
  } = useSettings();

  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("✅ Settings saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center bg-transparent p-6 mt-20">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 w-full max-w-2xl transition-all">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-red-400">
          App Settings
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Notifications */}
          <div className="flex justify-between items-center hover:bg-blue-300">
            <label className="text-gray-700 hover:text-white dark:text-gray-300 font-medium">
              Notifications
            </label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="h-5 w-5"
            />
          </div>

          {/* Theme */}
          <div className="flex justify-between items-center hover:bg-blue-300">
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white bg-white text-gray-800"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex justify-between items-center hover:border-blue-300">
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg "
          >
            Save Changes
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-center mt-4 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
