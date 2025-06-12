import React, { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const MyBookings = () => {
  useEffect(() => {
           document.title = "CozyNest | My Bookings"; 
         }, []);
         
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDates, setNewDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Updated: Only allow cancel if booking date is 2 or more days ahead of today
  const canCancelBooking = (bookingDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(bookingDateStr);
    bookingDate.setHours(0, 0, 0, 0);
    const diffTime = bookingDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 2; // changed from >= 1 to >= 2
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bookings/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              Swal.fire('Error', data.message || 'Cancellation not allowed.', 'error');
            } else {
              Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
              setBookings(bookings.filter(b => b._id !== id));
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
          });
      }
    });
  };

  const handleUpdateDate = (id) => {
    const selectedDate = newDates[id];
    if (!selectedDate) {
      return Swal.fire('Error', 'Please select a new date.', 'error');
    }

    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

    fetch(`http://localhost:3000/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formattedDate })
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire('Updated!', 'Booking date updated successfully.', 'success');
        setEditingId(null);
        setNewDates((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        fetch(`http://localhost:3000/bookings?email=${user.email}`)
          .then(res => res.json())
          .then(setBookings);
      });
  };

  const handleReviewSubmit = () => {
    if (!rating || !comment) {
      return Swal.fire('Error', 'Please add rating and comment.', 'error');
    }
    const review = {
      roomId: reviewModal.roomId,
      roomName: reviewModal.roomName,
      username: user.displayName,
      photo: user.photoURL || '',
      rating,
      comment,
      timestamp: new Date().toISOString()
    };

    fetch(`http://localhost:3000/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire('Thanks!', 'Review submitted.', 'success');
        setReviewModal(null);
        setRating(0);
        setComment("");
      });
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
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-500">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Room Name</th>
              <th>Price</th>
              <th>Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td><img src={b.img} alt="Room" className="w-16 h-16 rounded" /></td>
                <td>{b.roomName}</td>
                <td>৳{b.price}</td>
                <td>
                  {editingId === b._id ? (
                    <DatePicker
                      selected={newDates[b._id] || new Date(b.date)}
                      onChange={(date) =>
                        setNewDates((prev) => ({ ...prev, [b._id]: date }))
                      }
                      minDate={new Date()}
                      className="input input-sm input-bordered"
                    />
                  ) : (
                    b.date
                  )}
                </td>
                <td className="space-x-2">
                  {editingId === b._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateDate(b._id)}
                        className="btn btn-sm bg-green-500 text-white"
                        disabled={!newDates[b._id]}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-sm bg-gray-500 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(b._id);
                          setNewDates((prev) => ({ ...prev, [b._id]: new Date(b.date) }));
                        }}
                        className="btn btn-sm bg-blue-500 text-white"
                      >
                        Update Date
                      </button>
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="btn btn-sm bg-red-500 text-white"
                        disabled={!canCancelBooking(b.date)}
                        title={
                          canCancelBooking(b.date)
                            ? 'Cancel booking'
                            : 'Cancellation not allowed within 1 day of booking'
                        }
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setReviewModal(b)}
                        className="btn btn-sm bg-green-500 text-white"
                      >
                        Review
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reviewModal && (
        <dialog open className="modal modal-open">
          <form method="dialog" className="modal-box">
            <h3 className="text-lg font-bold mb-4 text-blue-500">Give Review for {reviewModal.roomName}</h3>
            <p className="mb-2"><strong>User:</strong> {user.displayName}</p>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Rating:</label>
              <Rating
                emptySymbol={<FaStar className="text-gray-300 text-2xl" />}
                fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
                initialRating={rating}
                onChange={setRating}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Comment:</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setReviewModal(null)}>Close</button>
              <button type="button" className="btn bg-blue-500 text-white" onClick={handleReviewSubmit}>Submit</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyBookings;
