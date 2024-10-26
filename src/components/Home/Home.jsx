import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/background2.jpg';
import Typing from 'react-typing-effect';

const Home = () => {

  return (
 
    <main
    className="min-h-screen text-metallicSilver bg-cover bg-center"
    style={{
      backgroundImage: `url(${background})`, // Replace with your image path
      backgroundBlendMode: 'overlay',
      backgroundColor: 'rgba(29, 31, 32, 0.8)', // Dark overlay for readability
    }}
  >
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Typing
          text={["FutureSelf: Time Capsule"]}
          className="text-5xl font-bold text-cyberYellow mb-4"
          speed={50}
          eraseDelay={2000}
        />
        <p className="text-lg italic max-w-lg mb-6">
          Step into the future and set goals, memories, and aspirations for your future self.
        </p>
        <div className="flex space-x-4">
          <Link to="/signup" className="bg-electricBlue text-darkCharcoal rounded-lg px-6 py-3 hover:scale-105 hover:shadow-lg">
            Sign Up
          </Link>
          <Link to="/login" className="bg-neonPink text-darkCharcoal rounded-lg px-6 py-3 hover:scale-105 hover:shadow-lg">
            Log In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-darkCharcoal py-12">
        <h2 className="text-3xl font-bold text-center text-cyberYellow mb-8">Explore Your Future Self</h2>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 max-w-4xl mx-auto">
          <div className="bg-darkCharcoal rounded-lg p-6 text-center shadow-md w-full lg:w-1/3">
            <span className="text-cyberYellow text-4xl mb-4">📨</span>
            <h3 className="text-lg font-bold">Time Capsule</h3>
            <p>Write letters to your future self and receive them at key moments.</p>
          </div>
          <div className="bg-darkCharcoal rounded-lg p-6 text-center shadow-md w-full lg:w-1/3">
            <span className="text-electricBlue text-4xl mb-4">🎯</span>
            <h3 className="text-lg font-bold">Goal Tracker</h3>
            <p>Set goals and track milestones on your interactive timeline.</p>
          </div>
          <div className="bg-darkCharcoal rounded-lg p-6 text-center shadow-md w-full lg:w-1/3">
            <span className="text-neonPink text-4xl mb-4">🤖</span>
            <h3 className="text-lg font-bold">AI Insights</h3>
            <p>Get personalized advice and tips based on your aspirations.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkCharcoal text-center py-6 text-sm text-metallicSilver">
        <p>&copy; {new Date().getFullYear()} FutureSelf. All Rights Reserved.</p>
      </footer>
    </main>
  );
};

export default Home;