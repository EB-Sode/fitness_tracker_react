// src/components/Nutrition.jsx
import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Nutrition() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const healthyFoods = [
    {
      name: "Avocado",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/delish-230509-avocado-crab-boats-350-rv-lead-646bc7a1d5ab3.jpg?crop=0.6668742216687422xw:1xh;center,top",
      benefit: "Rich in healthy fats and fiber, great for heart health.",
    },
    {
      name: "Oatmeal",
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/oatmeal-500x375.jpg",
      benefit: "Boosts energy and helps regulate blood sugar levels.",
    },
    {
      name: "Broccoli",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VFrri0rHUmznoVmMzck6_sSQsJdfuvuDLw&s",
      benefit: "Loaded with vitamins and antioxidants that fight inflammation.",
    },
    {
      name: "Salmon",
      image:
        "https://healthyrecipesblogs.com/wp-content/uploads/2024/06/pan-fried-salmon-featured-new.jpg",
      benefit: "Excellent source of protein and omega-3 fatty acids.",
    },
  ];

  const tips = [
    "Eat more whole, unprocessed foods — fruits, vegetables, lean proteins, and whole grains.",
    "Stay hydrated! Aim for 6–8 glasses of water daily.",
    "Avoid skipping breakfast — it helps maintain energy and focus.",
    "Control portions; eat smaller, more frequent meals instead of heavy late-night ones.",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <Layout>
    <section className="flex-1 py-16 text-center" id="nutrition p-10">
      <h2 className="text-4xl font-bold text-red-200 mb-10">Nutrition & Healthy Living</h2>

      {/* Healthy Foods */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mb-12">
        {healthyFoods.map((food, index) => (
          <div
            key={index}
            className="bg-red-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">{food.name}</h3>
            <p className="text-gray-600 mt-2">{food.benefit}</p>
          </div>
        ))}
      </div>

      {/* General Tips */}
      <div className="max-w-3xl mx-auto mb-12 px-6">
        <h3 className="text-2xl font-semibold mb-4 text-red-200">Healthy Feeding Tips</h3>
        <ul className="text-left list-disc list-inside text-red-200 space-y-2">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Ask for Advice */}
      <div className="max-w-2xl mx-auto bg-red-900 rounded-2xl shadow-md p-8">
        <h3 className="text-2xl font-semibold text-red-200 mb-4">Ask for Specific Nutrition Advice</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here..."
            className="w-full h-32 p-4 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-gray rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {submitted && (
          <p className="text-green-600 mt-4 font-medium">
            ✅ Your question has been received! Our coaches will respond soon.
          </p>
        )}
      </div>
    </section>
    </Layout>
  );
}
