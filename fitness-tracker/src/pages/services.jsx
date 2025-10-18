// src/pages/Services.jsx
import OurServices from "../components/OurServices";
import ContactUs from "../components/OurContact";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className=" flex-grow mx-auto bg-red-800 min-h-screen max-w-6xl mt-10">
      {/* Hero Header */}
      <section className="text-center py-16 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="flex justify-between mx-20">
        <h1 className="text-xl font-bold text-white">🏋️ Fitness Tracker</h1>
        
        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
      
        <Link
          to="/"
          className="px-1 py-0.5 text-sm rounded text-white hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our range of fitness programs, personal coaching, and expert advice designed to help you reach your goals.
        </p>
      </section>

      {/* Services and Contact Sections */}
      <OurServices />
      <ContactUs />

      <Footer />
    </div>
  );
}
