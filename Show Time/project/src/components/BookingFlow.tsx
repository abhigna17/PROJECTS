import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/auth';

const THEATERS = [
  { id: 1, name: 'PVR Cinemas - Central Mall' },
  { id: 2, name: 'INOX - Nexus Mall' },
  { id: 3, name: 'Cinepolis - City Center' },
  { id: 4, name: 'AGS Cinemas' },
  { id: 5, name: 'SPI Cinemas' },
  { id: 6, name: 'Carnival Cinemas' },
  { id: 7, name: 'Miraj Cinemas' },
  { id: 8, name: 'Asian Cinemas' },
  { id: 9, name: 'Prasads Multiplex' },
  { id: 10, name: 'Central Cinemas' }
];

const SHOW_TIMES = ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM'];

const getSeatPrice = (seatNumber: number) => {
  if (seatNumber <= 100) return 120;
  if (seatNumber <= 200) return 150;
  return 200;
};

export default function BookingFlow() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [splitBill, setSplitBill] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const user = useAuthStore((state) => state.user);
  const addBooking = useAuthStore((state) => state.addBooking);

  const handleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotalAmount = () => {
    return selectedSeats.reduce((total, seat) => total + getSeatPrice(seat), 0);
  };

  const handlePayment = () => {
    if (enteredPin === user?.pin) {
      const booking = {
        movieId,
        theater: selectedTheater,
        time: selectedTime,
        seats: selectedSeats,
        totalAmount: calculateTotalAmount(),
        date: new Date().toISOString()
      };
      addBooking(booking);
      navigate('/');
    } else {
      setPinError('Invalid PIN');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-3xl font-bold">Select Theater</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {THEATERS.map((theater) => (
                <button
                  key={theater.id}
                  onClick={() => {
                    setSelectedTheater(theater.name);
                    setStep(2);
                  }}
                  className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition"
                >
                  <h3 className="text-xl font-semibold">{theater.name}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-3xl font-bold">Select Show Time</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SHOW_TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(3);
                  }}
                  className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition"
                >
                  <span className="text-xl">{time}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-3xl font-bold">Select Seats</h2>
            </div>
            <div className="mb-8 text-center p-8 bg-gray-800 rounded-lg">SCREEN</div>
            <div className="grid grid-cols-10 gap-2 mb-8">
              {Array.from({ length: 300 }, (_, i) => {
                const seatNumber = i + 1;
                const price = getSeatPrice(seatNumber);
                return (
                  <button
                    key={i}
                    onClick={() => handleSeatSelection(seatNumber)}
                    className={`p-2 rounded relative group ${
                      selectedSeats.includes(seatNumber)
                        ? 'bg-green-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {seatNumber}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{price}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedSeats.length > 0 && (
              <div className="text-center">
                <p className="mb-4">Selected Seats: {selectedSeats.join(', ')}</p>
                <button
                  onClick={() => setStep(4)}
                  className="bg-green-600 px-8 py-3 rounded-lg text-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        );

      case 4:
        const totalAmount = calculateTotalAmount();
        return (
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setStep(3)} className="text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-3xl font-bold">Payment</h2>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">Selected Seats: {selectedSeats.length}</p>
              <p className="mb-4">Would you like to split the bill?</p>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setSplitBill(true)}
                  className={`flex-1 py-2 rounded ${
                    splitBill ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setSplitBill(false)}
                  className={`flex-1 py-2 rounded ${
                    !splitBill ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
              {splitBill && (
                <p className="mb-4">
                  Amount per person: ₹{(totalAmount / selectedSeats.length).toFixed(2)}
                </p>
              )}
              <p className="mb-4">Total amount: ₹{totalAmount}</p>
              {pinError && (
                <p className="text-red-500 mb-2">{pinError}</p>
              )}
              <input
                type="password"
                placeholder="Enter PIN"
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError('');
                }}
              />
              <button
                onClick={handlePayment}
                className="w-full bg-green-600 py-3 rounded-lg text-lg"
              >
                Pay Now
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      {renderStep()}
    </div>
  );
}