// src/components/OurServices.jsx
import { Dumbbell, Salad, UserCheck } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

    // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };


return (
    <motion.section
      className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-center"
      id="services"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-4xl font-bold text-blue-400 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore with us
      </motion.h2>

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-red-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4 text-4xl">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
