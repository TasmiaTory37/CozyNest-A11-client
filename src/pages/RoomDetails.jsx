import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { FaSpinner, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';  

const RoomDetails = () => {
  useEffect(() => {
    document.title = "CozyNest | Room Details"; 
  }, []);

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();  

  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [roomRes, reviewsRes, bookingsRes] = await Promise.all([
          fetch(`https://assignment-11-server-nine-nu.vercel.app/rooms/${id}`),
          fetch(`https://assignment-11-server-nine-nu.vercel.app/rooms/${id}/reviews`),
          fetch(`https://assignment-11-server-nine-nu.vercel.app/rooms/${id}/bookings`)
        ]);

        if (!roomRes.ok) throw new Error('Failed to load room');
        const roomData = await roomRes.json();
        setRoom(roomData);

        if (reviewsRes.ok) {
          const rev = await reviewsRes.json();
          rev.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setReviews(rev);
        }

        if (bookingsRes.ok) {
          const book = await bookingsRes.json();
          const dates = book.map(b => new Date(b.date + 'T00:00:00'));
          setBookedDates(dates);
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    if (!bookingDate) {
      Swal.fire('Select a date', 'Please select a booking date.', 'warning');
      return;
    }

  
    const year  = bookingDate.getFullYear();
    const month = String(bookingDate.getMonth() + 1).padStart(2, '0');
    const day   = String(bookingDate.getDate()).padStart(2, '0');
    const localDate = `${year}-${month}-${day}`;

    try {
      const { data } = await axiosSecure.post('/bookings', {
        roomId: id,
        date: localDate,
        userEmail: user.email,
        roomName: room.name,
        img: room.img,
        price: room.pricePerDay
      });

      Swal.fire('Success', data.message || 'Your booking was successful!', 'success');
      setModalOpen(false);
      setBookedDates(d => [...d, bookingDate]);
    } catch (err) {
      Swal.fire(
        'Booking Failed',
        err.response?.data?.message || err.message || 'Booking failed',
        'error'
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 ">
      {/* Room Info */}
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
            {room.features?.map((f,i) => <li key={i}>{f}</li>)}
          </ul>
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => user ? setModalOpen(true) : navigate('/login')}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-blue-500">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <ul className="space-y-6">
            {reviews.map(r => (
              <li key={r._id} className="border p-4 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium">{r.username}</span>
                  <Rating
                    emptySymbol={<FaStar className="text-gray-300" />}
                    fullSymbol={<FaStar className="text-yellow-400" />}
                    initialRating={r.rating}
                    readonly
                  />
                </div>
                <p className="mb-2">{r.comment}</p>
                <small className="text-gray-500">{new Date(r.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <dialog id="booking_modal" className="modal modal-open">
          <form method="dialog" className="modal-box w-full max-w-3xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Confirm Your Booking</h3>
            <div className="space-y-3">
              <div><span className="font-medium">Room:</span> {room.name}</div>
              <div><span className="font-medium">Price:</span> ৳{room.pricePerDay}/Day</div>
              <div><span className="font-medium">Description:</span> {room.description}</div>
              <div>
                <span className="font-medium">Features:</span>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {room.features?.map((f,i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div>
                <label className="block font-medium mb-1">Select Booking Date:</label>
                <DatePicker
                  selected={bookingDate}
                  onChange={setBookingDate}
                  excludeDates={bookedDates}
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
