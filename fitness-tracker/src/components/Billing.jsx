import { useState } from "react";

export default function BillingPage() {
  const [plan, setPlan] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSimulatedCheckout = () => {
    setLoading(true);
    setMessage("");

    // Simulate a payment process
    setTimeout(() => {
      setLoading(false);
      setMessage(`✅ Payment successful! You are now subscribed to the ${plan} plan.`);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gradient-to-r from-red-900 to-red-700 p-6 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Billing & Subscription
      </h1>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Basic Plan */}
        <div
          className={`p-6 rounded-2xl shadow-md border-2 transition-all duration-300
            ${plan === "basic" ? "border-blue-600" : "border-transparent"}
            bg-white dark:bg-gray-800 dark:border-gray-700`}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Basic Plan</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">#10,000 / month</p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <li>✔ Access to gym sessions</li>
            <li>✔ Nutrition tips</li>
            <li>❌ Personal coaching</li>
          </ul>
          <button
            onClick={() => setPlan("basic")}
            className={`w-full rounded-lg py-2 text-white transition 
              ${plan === "basic" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {plan === "basic" ? "Selected" : "Choose Plan"}
          </button>
        </div>

        {/* Standard Plan */}
        <div
          className={`p-6 rounded-2xl shadow-md border-2 transition-all duration-300
            ${plan === "standard" ? "border-green-600" : "border-transparent"}
            bg-white dark:bg-gray-800 dark:border-gray-700`}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Standard Plan</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">#20,000 / month</p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <li>✔ Gym sessions</li>
            <li>✔ Nutrition tips</li>
            <li>✔ Weekly coaching</li>
          </ul>
          <button
            onClick={() => setPlan("standard")}
            className={`w-full rounded-lg py-2 text-white transition 
              ${plan === "standard" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"}`}
          >
            {plan === "standard" ? "Selected" : "Choose Plan"}
          </button>
        </div>

        {/* Premium Plan */}
        <div
          className={`p-6 rounded-2xl shadow-md border-2 transition-all duration-300
            ${plan === "premium" ? "border-purple-600" : "border-transparent"}
            bg-white dark:bg-gray-800 dark:border-gray-700`}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Premium Plan</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">#35,000 / month</p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <li>✔ Unlimited gym sessions</li>
            <li>✔ Personal nutritionist</li>
            <li>✔ 1-on-1 weekly coaching</li>
          </ul>
          <button
            onClick={() => setPlan("premium")}
            className={`w-full rounded-lg py-2 text-white transition 
              ${plan === "premium" ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"}`}
          >
            {plan === "premium" ? "Selected" : "Choose Plan"}
          </button>
        </div>
      </div>

      <button
        onClick={handleSimulatedCheckout}
        disabled={loading}
        className="mt-8 bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        {loading ? "Processing..." : `Proceed with ${plan} plan`}
      </button>

      {message && (
        <p className="mt-6 text-green-600 dark:text-green-400 font-semibold">{message}</p>
      )}
    </div>
  );
}
