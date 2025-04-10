import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from './store/auth';
import Login from './components/Login';
import MovieList from './components/MovieList';
import BookingHistory from './components/BookingHistory';
import BookingFlow from './components/BookingFlow';

function App() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/50 p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Show Time</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span>Welcome, {user.fullName}</span>
              <a href="/history" className="text-white hover:text-gray-300">
                Booking History
              </a>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-white hover:text-gray-300"
              >
                Logout <LogOut size={18} />
              </button>
            </>
          ) : (
            <Login />
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/book/:movieId" element={<BookingFlow />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;