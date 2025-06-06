import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; 
import { FaSpinner } from 'react-icons/fa'; 

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-2 text-xl text-blue-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {rooms.map((room, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
          onClick={() => window.location.href = `/roomdetails/${room._id}`}
        >
          <img src={room.img} alt={room.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl text-blue-500 font-semibold">{room.name}</h3>
            <p className="text-gray-500 mb-2">{room.description}</p>
            <p className="text-sm text-red-500">৳ {room.pricePerDay} / Day</p>
            <p className="text-sm text-yellow-500 flex items-center gap-1 mt-2">
              <FaStar className="text-yellow-400" /> {room.ratings}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
