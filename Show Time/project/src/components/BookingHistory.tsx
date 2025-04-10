import React from 'react';
import { useAuthStore } from '../store/auth';

export default function BookingHistory() {
  const bookingHistory = useAuthStore((state) => state.bookingHistory);

  if (bookingHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl mb-4">No booking history</h2>
        <p>Book some tickets to see your history here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl mb-4">Booking History</h2>
      {bookingHistory.map((booking, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">{booking.movie}</h3>
          <p>Theater: {booking.theater}</p>
          <p>Show Time: {booking.time}</p>
          <p>Seats: {booking.seats.join(', ')}</p>
          <p>Total Amount: ₹{booking.totalAmount}</p>
          <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}