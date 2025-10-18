import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";



export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user || {});

  if (!user) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(form);
    setIsEditing(false);
  };

  return (

    <div className="max-w-md mx-auto mt-10 bg-gray-700 p-6 rounded-2xl shadow-lg text-gray-100">
      <h2 className="text-2xl font-bold text-center text-red-400 mb-6">
        Profile
      </h2>

      <div className="space-y-3">
        {/* Username */}
        <div>
          <label className="block text-gray-400 text-md">Username</label>
          {isEditing ? (
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
            />
          ) : (
            <p className="p-2 bg-gray-800 rounded">{user.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-400 text-md">Email</label>
          {isEditing ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
            />
          ) : (
            <p className="p-2 bg-gray-800 rounded">{user.email}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-400 text-md">Age</label>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
            />
          ) : (
            <p className="p-2 bg-gray-800 rounded">{user.age}</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-gray-400 text-md">Weight (kg)</label>
          {isEditing ? (
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
            />
          ) : (
            <p className="p-2 bg-gray-800 rounded">{user.weight}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
     
    </div>
  );
}
