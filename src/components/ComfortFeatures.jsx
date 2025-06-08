import React from 'react';
import { motion } from 'framer-motion';
import { FaWifi, FaBell, FaSwimmingPool, FaDumbbell, FaShuttleVan, FaDog } from 'react-icons/fa';

const ComfortFeatures = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Comfort Features</h2>
      <p className="text-center text-gray-600 mb-10">
        Our hotel offers everything you need for a relaxing and convenient stay.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 border border-blue-500 hover:bg-amber-50 rounded-lg text-center shadow"
        >
          <FaWifi className="text-3xl text-blue-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Free Wi-Fi</h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 border border-blue-500 hover:bg-pink-50 rounded-lg text-center shadow"
        >
          <FaBell className="text-3xl text-yellow-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">24/7 Service</h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 border border-blue-500 hover:bg-cyan-50 rounded-lg text-center shadow"
        >
          <FaSwimmingPool className="text-3xl text-teal-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Pool & Spa</h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 border border-blue-500 hover:bg-fuchsia-50 rounded-lg text-center shadow"
        >
          <FaDumbbell className="text-3xl text-purple-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Fitness Center</h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 border border-blue-500 hover:bg-green-50 rounded-lg text-center shadow"
        >
          <FaShuttleVan className="text-3xl text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Airport Shuttle</h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 border border-blue-500 hover:bg-blue-50 rounded-lg text-center shadow"
        >
          <FaDog className="text-3xl text-pink-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Pet-Friendly</h3>
        </motion.div>
      </div>
    </section>
  );
};

export default ComfortFeatures;