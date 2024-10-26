import React from 'react';

const AddGoal = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-deepPurple to-darkCharcoal text-metallicSilver flex items-center justify-center">
      <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-3xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyberYellow mb-6 text-center">
          Set Your Future Goals
        </h2>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Enter your goal..."
            className="w-full p-3 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-electricBlue focus:border-2"
          />
          <input
            type="date"
            className="w-full p-3 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-neonPink focus:border-2"
          />
          <button
            type="submit"
            className="w-full bg-electricBlue text-darkCharcoal py-3 rounded-lg font-bold hover:bg-cyberYellow hover:scale-105 transition duration-300"
          >
            Add Goal
          </button>
        </form>

        {/* Goal List Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-cyberYellow mb-4">Your Goals</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-darkCharcoal rounded-lg p-3">
              <span>Become a Full-Stack Developer</span>
              <span className="text-cyberYellow">Due: 2024-12-31</span>
              <button className="text-neonPink hover:text-electricBlue ml-4">✕</button>
            </li>
            {/* Add more goals here */}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AddGoal;
