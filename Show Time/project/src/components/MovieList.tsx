import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useAuthStore } from '../store/auth';

const MOVIES = {
  english: [
    { 
      id: 1, 
      title: 'Inception',
      price: 200,
      rating: 4.8,
      poster: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    { 
      id: 2,
      title: 'The Dark Knight',
      price: 200,
      rating: 4.9,
      poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 3,
      title: 'Interstellar',
      price: 200,
      rating: 4.7,
      poster: 'https://images.unsplash.com/photo-1506355683710-bd071c0a5828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 4,
      title: 'The Matrix',
      price: 180,
      rating: 4.6,
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 5,
      title: 'Avatar',
      price: 200,
      rating: 4.5,
      poster: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    }
  ],
  hindi: [
    {
      id: 6,
      title: 'Pathaan',
      price: 200,
      rating: 4.5,
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 7,
      title: 'Jawan',
      price: 200,
      rating: 4.6,
      poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 8,
      title: 'Animal',
      price: 180,
      rating: 4.3,
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 9,
      title: 'Dunki',
      price: 180,
      rating: 4.4,
      poster: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 10,
      title: 'Tiger 3',
      price: 200,
      rating: 4.2,
      poster: 'https://images.unsplash.com/photo-1572177191856-3cde618dee1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    }
  ],
  telugu: [
    {
      id: 11,
      title: 'RRR',
      price: 200,
      rating: 4.9,
      poster: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 12,
      title: 'Pushpa',
      price: 200,
      rating: 4.7,
      poster: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 13,
      title: 'Salaar',
      price: 200,
      rating: 4.5,
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 14,
      title: 'Game Changer',
      price: 180,
      rating: 4.4,
      poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    },
    {
      id: 15,
      title: 'Guntur Kaaram',
      price: 180,
      rating: 4.3,
      poster: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      reviews: []
    }
  ]
};

export default function MovieList() {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showReview, setShowReview] = useState<any>(null);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleBooking = (movieId: number) => {
    if (!user) {
      alert('Please login to book tickets');
      return;
    }
    navigate(`/book/${movieId}`);
  };

  return (
    <>
      <div className="mb-8">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Cinema"
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {['english', 'hindi', 'telugu'].map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-6 py-2 rounded-full ${
              selectedLanguage === lang
                ? 'bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOVIES[selectedLanguage as keyof typeof MOVIES].map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-yellow-400" size={18} />
                <span>{movie.rating}/5</span>
              </div>
              <button
                onClick={() => handleBooking(movie.id)}
                className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
              >
                Book Tickets
              </button>
              <button
                onClick={() => setShowReview(movie)}
                className="w-full mt-2 bg-gray-700 py-2 rounded hover:bg-gray-600"
              >
                Reviews
              </button>
            </div>
          </div>
        ))}
      </div>

      {showReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl mb-4">Reviews for {showReview.title}</h2>
            <div className="mb-4">
              <h3 className="font-bold mb-2">Add Review</h3>
              <textarea
                className="w-full p-2 bg-gray-700 rounded"
                placeholder="Write your review..."
              />
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="cursor-pointer text-yellow-400"
                    size={24}
                  />
                ))}
              </div>
              <button className="mt-2 bg-red-600 px-4 py-2 rounded">
                Submit Review
              </button>
            </div>
            <button
              onClick={() => setShowReview(null)}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}