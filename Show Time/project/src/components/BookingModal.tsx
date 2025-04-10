import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';

const THEATERS = [
  { id: 1, name: 'PVR Cinemas' },
  { id: 2, name: 'INOX Movies' },
  { id: 3, name: 'Cinepolis' }
];

const SHOW_TIMES = ['10:00 AM', '2:00 PM', '6:00 PM', '9:30 PM'];

export default function BookingModal({ movie, onClose }: { movie: any; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedTheater, setSelectedTheater] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [splitBill, setSplitBill] = useState<boolean | null>(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [showTicket, setShowTicket] = useState(false);

  const user = useAuthStore((state) => state.user);
  const addBooking = useAuthStore((state) => state.addBooking);

  const handleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handlePayment = () => {
    if (enteredPin === user?.pin) {
      const booking = {
        movie: movie.title,
        theater: selectedTheater,
        time: selectedTime,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * movie.price,
        date: new Date().toISOString()
      };
      addBooking(booking);
      setShowTicket(true);
    } else {
      alert('Invalid PIN');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl mb-4">Select Theater</h3>
            <div className="grid gap-2">
              {THEATERS.map((theater) => (
                <button
                  key={theater.id}
                  onClick={() => {
                    setSelectedTheater(theater.name);
                    setStep(2);
                  }}
                  className="bg-gray-700 p-4 rounded hover:bg-gray-600"
                >
                  {theater.name}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl mb-4">Select Show Time</h3>
            <div className="grid grid-cols-2 gap-2">
              {SHOW_TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(3);
                  }}
                  className="bg-gray-700 p-4 rounded hover:bg-gray-600"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl mb-4">Select Seats</h3>
            <div className="mb-8 text-center p-4 bg-gray-700 rounded">SCREEN</div>
            <div className="grid grid-cols-9 gap-2 mb-8">
              {Array.from({ length: 324 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleSeatSelection(i + 1)}
                  className={`p-2 rounded ${
                    selectedSeats.includes(i + 1)
                      ? 'bg-red-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {selectedSeats.length > 0 && (
              <button
                onClick={() => setStep(4)}
                className="w-full bg-red-600 py-2 rounded"
              >
                Continue
              </button>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-xl mb-4">Split Bill?</h3>
            <div className="grid gap-2">
              <button
                onClick={() => {
                  setSplitBill(true);
                  setStep(5);
                }}
                className="bg-gray-700 p-4 rounded hover:bg-gray-600"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setSplitBill(false);
                  setStep(5);
                }}
                className="bg-gray-700 p-4 rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        );

      case 5:
        const totalAmount = selectedSeats.length * movie.price;
        const amountPerPerson = splitBill ? totalAmount / selectedSeats.length : totalAmount;

        return (
          <div>
            <h3 className="text-xl mb-4">Payment</h3>
            {splitBill && (
              <p className="mb-4">Amount per person: ₹{amountPerPerson}</p>
            )}
            <p className="mb-4">Total amount: ₹{totalAmount}</p>
            <input
              type="password"
              placeholder="Enter PIN"
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handlePayment}
                className="flex-1 bg-red-600 py-2 rounded"
              >
                Pay Now
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showTicket) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg max-w-lg w-full">
          <h2 className="text-2xl mb-4">Payment Successful!</h2>
          <div className="bg-gray-700 p-4 rounded mb-4">
            <h3 className="font-bold mb-2">{movie.title}</h3>
            <p>Theater: {selectedTheater}</p>
            <p>Show Time: {selectedTime}</p>
            <p>Seats: {selectedSeats.join(', ')}</p>
            <p>Total Amount: ₹{selectedSeats.length * movie.price}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 py-2 rounded"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-red-600 py-2 rounded"
            >
              Print Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl mb-4">{movie.title}</h2>
        {renderStep()}
      </div>
    </div>
  );
}