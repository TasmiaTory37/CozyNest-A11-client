import React, { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthProvider';
import { FaSpinner } from 'react-icons/fa';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [loading, setLoading] = useState(true);

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
          .then(() => {
            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
            setBookings(bookings.filter(b => b._id !== id));
          });
      }
    });
  };

  const handleUpdateDate = (id) => {
    if (!newDate) {
      return Swal.fire('Error', 'Please select a new date.', 'error');
    }

    const formattedDate = new Date(newDate).toISOString().split('T')[0];

    fetch(`http://localhost:3000/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formattedDate })
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire('Updated!', 'Booking date updated successfully.', 'success');
        setEditingId(null);
        setNewDate(null);
        fetch(`http://localhost:3000/bookings?email=${user.email}`)
          .then(res => res.json())
          .then(setBookings);
      });
  };

  const handleReview = (roomId) => {
    window.location.href = `/rooms/${roomId}#review`;
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
      <h2 className="text-2xl font-bold mb-6">My Bookings 🛌</h2>
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
                      selected={newDate}
                      onChange={(date) => setNewDate(date)}
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
                      <button onClick={() => handleUpdateDate(b._id)} className="btn btn-sm bg-green-500 text-white">Save</button>
                      <button onClick={() => setEditingId(null)} className="btn btn-sm bg-gray-500 text-white">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditingId(b._id)} className="btn btn-sm bg-blue-500 text-white">Update Date</button>
                      <button onClick={() => handleCancel(b._id)} className="btn btn-sm bg-red-500 text-white">Cancel</button>
                      <button onClick={() => handleReview(b.roomId)} className="btn btn-sm bg-yellow-500 text-white">Review</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
