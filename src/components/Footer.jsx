import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 px-4 md:px-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3  gap-5 text-center md:text-left">

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p>Email: <a href="mailto:info@gardenspace.com" className="underline">info@cozynest.com</a></p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Location: Green Street, Green City</p>
        </div>

        {/* Terms */}
        <div className="grid place-items-center text-center max-w-xs h-full">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-white">

       <li>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive
                ? "block mb-2 text-blue-300 font-semibold"
                : "block mb-2 text-white"
            }
          >
           About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "block mb-2 text-blue-300 font-semibold"
                : "block mb-2 text-white"
            }
          >
           Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive
                ? "block mb-2 text-blue-300 font-semibold"
                : "block mb-2 text-white"
            }
          >
          Rooms
          </NavLink>
        </li>

          </ul>
        
        </div>
      </div>

        {/* Social Links */}
      <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl mb-3">
           <Link to='https://www.facebook.com/' className="hover:text-blue-600">
              <FaFacebook />
            </Link>
            <Link to='https://www.instagram.com/' className="hover:text-purple-600">
              <FaInstagram />
            </Link>
           
            <Link to='https://www.youtube.com/' className="hover:text-red-600">
              <FaYoutube />
            </Link>
            <Link to='https://www.linkedin.com/' className="hover:text-blue-700">
              <FaLinkedin />
            </Link>
          </div>
          <p className="text-xs">Experience comfort and convenience — book your next stay with us today.</p>
        </div>
      </div>




      <div className="text-center text-xs text-white mt-10">
        © {new Date().getFullYear()} CozyNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
