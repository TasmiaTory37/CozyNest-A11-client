// AboutUs.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import about from '../assets/lotties/about.json';

const AboutUs = () => {
  useEffect(() => {
           document.title = "CozyNest | About Us"; 
         }, []);
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
     
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Lottie animationData={about} loop={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-blue-500 mb-4">Welcome to CozyNest</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            <strong>CozyNest</strong> is a hotel booking platform that helps you find and book comfortable rooms with ease. We aim to make your travel experience smooth, secure, and enjoyable.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
            With real guest reviews and a simple interface,<strong> CozyNest </strong>makes it easy to discover the perfect stay for your trip.
            </p>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
