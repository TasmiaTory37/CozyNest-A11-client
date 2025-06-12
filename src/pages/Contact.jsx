import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/lotties/contact.json'; // Make sure this path is correct

const Contact = () => {
  useEffect(() => {
           document.title = "CozyNest | Contact"; 
         }, []);
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-500">Get in Touch</h2>
        <p className="text-gray-600 mt-2">We’d love to hear from you! Reach out with any questions, feedback, or just to say hello.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl  drop-shadow p-8 grid lg:grid-cols-2 gap-10 items-center">
        
    
        <div className="hidden lg:block">
          <Lottie animationData={contactAnimation} loop={true} />
        </div>

 
        <form className="space-y-6 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message here..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center text-gray-600 space-y-1">
        <p><strong>Email:</strong> info@cozynest.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> Green Street, Green City</p>
      </div>
    </section>
  );
};

export default Contact;
