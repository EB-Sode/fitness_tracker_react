import { useState } from "react";
import Profile from "../components/UserProfile";
import Settings from "../components/Setting";
import BillingPage from "../components/Billing";
import Header from "../components/Header";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "settings":
        return <Settings />;
      case "billing":
        return <BillingPage />;
      default:
        return <Profile />;
    }
  };

  return (
    <div>
    <Header />
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-red-900 dark:bg-gray-900 transition-colors mt-20">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center md:text-left">
            My Account
          </h2>

          <nav className="flex md:flex-col gap-4 justify-center md:justify-start">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Profile
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Settings
            </button>

            <button
              onClick={() => setActiveTab("billing")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "billing"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Billing
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">{renderContent()}</main>
    </div>
    </div>
  );
}
