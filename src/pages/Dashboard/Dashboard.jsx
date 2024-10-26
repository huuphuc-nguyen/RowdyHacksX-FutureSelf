import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-deepPurple to-darkCharcoal text-metallicSilver flex items-center justify-center">
      <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-5xl backdrop-blur-md">
        
        {/* Greeting Section */}
        <h2 className="text-3xl font-bold text-cyberYellow mb-8 text-center">
          Welcome Back, [User’s Name]
        </h2>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-darkCharcoal p-4 rounded-lg shadow-md text-center border border-electricBlue">
            <h3 className="text-lg font-bold text-electricBlue">Total Letters</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-darkCharcoal p-4 rounded-lg shadow-md text-center border border-neonPink">
            <h3 className="text-lg font-bold text-neonPink">Total Goals</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-darkCharcoal p-4 rounded-lg shadow-md text-center border border-cyberYellow">
            <h3 className="text-lg font-bold text-cyberYellow">Completed Goals</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>

        {/* Upcoming Letters */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-cyberYellow mb-4">Upcoming Letters</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-darkCharcoal rounded-lg p-3 border-l-4 border-electricBlue">
              <span>Letter to Future Me - 2024</span>
              <span className="text-electricBlue">Delivery Date: 2024-06-01</span>
            </li>
            {/* Add more letters here */}
          </ul>
          <Link to="/letters" className="text-neonPink hover:underline mt-4 inline-block">
            View All Letters
          </Link>
        </div>

        {/* Upcoming Goals */}
        <div>
          <h3 className="text-2xl font-bold text-cyberYellow mb-4">Upcoming Goals</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-darkCharcoal rounded-lg p-3 border-l-4 border-neonPink">
              <span>Become a Full-Stack Developer</span>
              <span className="text-neonPink">Target Date: 2024-12-31</span>
            </li>
            {/* Add more goals here */}
          </ul>
          <Link to="/goals" className="text-neonPink hover:underline mt-4 inline-block">
            View All Goals
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4 justify-center mt-8">
          <Link
            to="/add-letter"
            className="bg-electricBlue text-darkCharcoal py-2 px-6 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
          >
            Add New Letter
          </Link>
          <Link
            to="/add-goal"
            className="bg-neonPink text-darkCharcoal py-2 px-6 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
          >
            Add New Goal
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;