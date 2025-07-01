import React, { useEffect, useState } from 'react';
import { FaSpinner, FaStar } from 'react-icons/fa';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://assignment-11-server-nine-nu.vercel.app/featured-rooms')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching featured rooms:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <span className="ml-2 text-xl text-blue-500">Loading...</span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-8 ">
      <h2 className="text-4xl font-bold text-center text-blue-500 mb-3">
        Featured Rooms
      </h2>
      <p className="text-lg text-center mb-8">
        Featured rooms are our top-rated accommodations, handpicked based on guest reviews and overall satisfaction.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map(room => (
          <div
            key={room._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full"
          >
            <img
              src={room.img}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-blue-500 mb-2">
                {room.name}
              </h3>

              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400" />
                <span className="ml-1 text-gray-700">
                  {room.reviewCount} review{room.reviewCount > 1 ? 's' : ''}
                </span>
              </div>

              <p className="text-gray-600 mb-4 flex-grow">
                {room.description.length > 100
                  ? room.description.slice(0, 100) + '…'
                  : room.description}
              </p>

              <p className="text-lg font-semibold text-red-500 mb-4">
                ৳{room.pricePerDay} / Day
              </p>

              <button
                onClick={() => window.location.href = `/roomdetails/${room._id}`}
                className="btn bg-blue-500 text-white hover:bg-blue-600  mt-auto"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
