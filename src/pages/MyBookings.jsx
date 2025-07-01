import React, { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyBookings = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDates, setNewDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    document.title = "CozyNest | My Bookings";
  }, []);

  const canCancelBooking = (bookingDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(bookingDateStr);
    bookingDate.setHours(0, 0, 0, 0);
    const diffTime = bookingDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 2;
  };

  useEffect(() => {
    if (authLoading || !user?.email || !token) return;

    setLoading(true);
    axiosSecure.get(`/bookings?email=${user.email}`)
      .then(({ data }) => {
        const bookingsArray = Array.isArray(data) ? data : data?.data || [];
        setBookings(bookingsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setBookings([]);
        setLoading(false);
      });
  }, [user, axiosSecure, authLoading, token]);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`)
          .then(({ data }) => {
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

    axiosSecure.patch(`/bookings/${id}`, { date: formattedDate })
      .then(() => {
        Swal.fire('Updated!', 'Booking date updated successfully.', 'success');
        setEditingId(null);
        setNewDates((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });

        return axiosSecure.get(`/bookings?email=${user.email}`);
      })
      .then(({ data }) => {
        const bookingsArray = Array.isArray(data) ? data : data?.data || [];
        setBookings(bookingsArray);
      })
      .catch(err => {
        Swal.fire('Error', 'Failed to update booking date.', 'error');
        console.error(err);
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
      userEmail: user.email, 
      rating,
      comment,
      timestamp: new Date().toISOString()
    };

    axiosSecure.post(`/reviews`, review)
      .then(() => {
        Swal.fire('Thanks!', 'Review submitted.', 'success');
        setReviewModal(null);
        setRating(0);
        setComment("");
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to submit review.', 'error');
      });
  };
  
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <span className="ml-2 text-xl text-blue-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-500">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr >
                <th>Image</th>
                <th>Room Name</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th className='text-center'>Actions</th>
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
                  <td className="space-x-2 flex justify-center">
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
                              : 'Cancellation not allowed within 2 days of booking'
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
      )}

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
