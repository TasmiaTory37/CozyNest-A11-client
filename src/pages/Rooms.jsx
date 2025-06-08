import React, { useEffect, useState } from 'react';
import { FaStar, FaSpinner } from 'react-icons/fa';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');

  const fetchRooms = () => {
    setLoading(true);
    let url = 'http://localhost:3000/rooms';
    const params = [];
    if (minPrice) params.push(`minPrice=${minPrice}`);
    if (maxPrice) params.push(`maxPrice=${maxPrice}`);
    if (sortOrder) params.push(`sort=${sortOrder}`);
    if (params.length) url += `?${params.join('&')}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchRooms();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-2 text-xl text-blue-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filter & Sort Controls */}
      <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="input input-bordered input-sm w-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="input input-bordered input-sm w-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort by Price</label>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="input input-bordered input-sm"
          >
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-sm bg-blue-500 text-white mt-6">
            Apply
          </button>
        </div>
      </form>

      {/* Rooms Grid or No Results */}
      {rooms.length === 0 ? (
        <p className="text-center font-semibold text-red-500">
          No rooms available in this price range, please select another price range.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div
              key={room._id}
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
      )}
    </div>
  );
};

export default Rooms;