import React, { useEffect } from 'react';


const AboutUs = () => {
  useEffect(() => {
    document.title = "CozyNest | About Us";
  }, []);

  return (
    <section className="pt-20 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto  items-center">
    
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-500 mb-6">Welcome to CozyNest</h2>
          <p className="text-lg  mb-4  `${theme === 'dark' ? 'text-gray-800' : 'text-black'}`">
            <strong>CozyNest</strong> is a hotel booking platform that helps you find and book comfortable rooms with ease. We aim to make your travel experience smooth, secure, and enjoyable. With real guest reviews and a simple interface, <strong>CozyNest</strong> makes it easy to discover the perfect stay for your trip.
          </p>
         
           
         
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
