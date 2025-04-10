import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    pin: ''
  });
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      login(formData);
      setShowSuccessMessage(true);
      setIsSignup(false);
      setFormData({ fullName: '', email: '', pin: '' });
    } else {
      login(formData);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIsSignup(true)}
        className="text-white hover:text-gray-300"
      >
        Sign Up
      </button>
      <button
        onClick={() => setIsSignup(false)}
        className="text-white hover:text-gray-300"
      >
        Login
      </button>

      {isSignup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="PIN"
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              required
            />
            <div className="flex gap-4">
              <button type="submit" className="bg-red-600 px-4 py-2 rounded">
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isSignup && showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Account Created Successfully!</h2>
            <p className="mb-4">Please login to your account to continue.</p>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}