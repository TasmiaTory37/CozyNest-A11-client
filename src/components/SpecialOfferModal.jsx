import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import offersImage from "../assets/hotel.jpg"; 
const SpecialOfferModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = () => {
    setIsOpen(false);
    navigate("/rooms");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative">
        
        <div
          className="relative w-full h-full"
          style={{
            backgroundImage: `url(${offersImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
  
          }}
        >
         
          <div className="absolute inset-0  "></div>

        
          <div className="relative z-10 text-white text-center px-6 py-10 space-y-6">
          
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-red-500 "
            >
              &times;
            </button>

            <h2 className="text-xl font-bold uppercase tracking-wide animate-pulse">
              Special Offer Just For You!
            </h2>

            <h3 className="text-4xl font-extrabold  animate-bounce">25% OFF</h3>
            <p className=" text-black bg-blue-200 font-semibold text-base sm:text-lg px-4 py-2 rounded-md inline-block ">

                On all CozyNest room bookings this week
            </p>


            <div className=" py-3 px-4 mx-auto w-2/3">
              <span className="text-sm block font-bold">Use Code</span>
              <div className="text-xl font-bold bg-blue-200 inline-block text-black tracking-wide px-4 py-1 rounded-xl mt-1">COZYNEST25</div>
            </div>

            <button
              onClick={handleBookNow}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferModal;
