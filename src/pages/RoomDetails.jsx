import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { FaSpinner } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthProvider';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/rooms/${id}`)
      .then(res => res.json())
      .then(data => {
        setRoom(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load data',
          text: 'Please try again later.',
        });
      });
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bookingDate) {
      return Swal.fire({
        icon: 'warning',
        title: 'Select a date',
        text: 'Please select a booking date.'
      });
    }

    const response = await fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: id,
        date: bookingDate.toISOString().split('T')[0],
        userEmail: user.email,
        roomName: room.name,
        img: room.img,
        price: room.pricePerDay
      })
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed',
        text: 'Your booking was successful!'
      });
      setModalOpen(false);
    } else {
      const error = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: error.message || 'Room already booked on this date.Please choose another date.'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <span className="ml-2 text-xl text-blue-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img
          src={room.img}
          alt={room.name}
          className="w-full h-80 object-cover rounded-xl shadow"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2 text-blue-500">{room.name}</h2>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <p className="text-lg font-semibold mb-2">
            Price per day: <span className="text-green-600">৳{room.pricePerDay}</span>
          </p>
          <h4 className="font-semibold">Features:</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {room.features?.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                setModalOpen(true);
              }
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <dialog id="booking_modal" className="modal modal-open">
          <form method="dialog" className="modal-box w-full max-w-3xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Confirm Your Booking</h3>

            <div className="space-y-3">
              <div><span className="font-medium">Room:</span> {room.name}</div>
              <div><span className="font-medium">Price:</span> ৳{room.pricePerDay}</div>
              <div><span className="font-medium">Description:</span> {room.description}</div>
              <div>
                <span className="font-medium">Features:</span>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {room.features?.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div>
                <label className="block font-medium mb-1">Select Booking Date:</label>
                <DatePicker
                  selected={bookingDate}
                  onChange={date => setBookingDate(date)}
                  minDate={new Date()}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="modal-action mt-6">
              <button type="button" className="btn bg-red-500 text-white" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="button" className="btn bg-blue-500 text-white" onClick={handleBooking}>Confirm Booking</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default RoomDetails;
