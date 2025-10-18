// src/components/OurServices.jsx
import { Dumbbell, Salad, UserCheck } from "lucide-react";

export default function OurServices() {
  const services = [
    {
      icon: <UserCheck className="w-10 h-10 text-blue-600" />,
      title: "Individual Coaching",
      description:
        "Get personalized coaching to meet your fitness goals with expert guidance and accountability.",
    },
    {
      icon: <Dumbbell className="w-10 h-10 text-blue-600" />,
      title: "Gym Sessions",
      description:
        "Join guided gym sessions to improve strength, endurance, and overall performance.",
    },
    {
      icon: <Salad className="w-10 h-10 text-blue-600" />,
      title: "Nutrition Advice",
      description:
        "Receive tailored nutrition plans to support your fitness journey and sustain healthy habits.",
    },
  ];

  return (
    <section className="py-16 bg-red-300 text-center" id="services">
      <h2 className="text-4xl font-bold text-blue-600 mb-10">Our Services</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-red-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4 ">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
