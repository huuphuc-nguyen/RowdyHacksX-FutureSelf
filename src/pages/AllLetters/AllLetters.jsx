import React from 'react';
import { Link } from 'react-router-dom';

const AllLetters = () => {
  const letters = [
    { id: 1, title: 'Letter to My Future Self', preview: 'Dear Future Me, remember to stay strong...', deliveryDate: '2024-06-01' },
    { id: 2, title: 'Dreams and Goals', preview: 'I hope you have achieved...', deliveryDate: '2025-01-15' },
    // Add more letter data here
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-deepPurple to-darkCharcoal text-metallicSilver flex items-center justify-center">
      <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-5xl backdrop-blur-md">
        
        {/* Title Section */}
        <h2 className="text-3xl font-bold text-cyberYellow mb-8 text-center">
          My Letters to the Future
        </h2>

        {/* Letter List */}
        <div className="space-y-6">
          {letters.map((letter) => (
            <div key={letter.id} className="bg-darkCharcoal rounded-lg p-6 border-l-4 border-electricBlue shadow-md">
              <h3 className="text-xl font-bold text-electricBlue mb-2">{letter.title}</h3>
              <p className="text-sm mb-4">{letter.preview}</p>
              <div className="flex justify-between items-center">
                <span className="text-cyberYellow">Delivery Date: {letter.deliveryDate}</span>
                <div className="space-x-4">
                  <Link
                    to={`/letters/${letter.id}`}
                    className="text-electricBlue hover:underline"
                  >
                    View Details
                  </Link>
                  <button className="text-neonPink hover:text-red-500 transition duration-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Letter Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/add-letter"
            className="bg-electricBlue text-darkCharcoal py-2 px-6 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
          >
            Add New Letter
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AllLetters;