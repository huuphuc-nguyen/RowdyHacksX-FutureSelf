import React from 'react';

const AddLetter = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-deepPurple to-darkCharcoal text-metallicSilver flex items-center justify-center">
      <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-3xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyberYellow mb-6 text-center">
          Write a Letter to Your Future Self
        </h2>
        <form className="space-y-6">
          <textarea
            placeholder="Write your message here..."
            className="w-full p-4 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-neonPink focus:border-2"
            rows={6}
          ></textarea>
          <input
            type="date"
            className="w-full p-3 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-electricBlue focus:border-2"
          />
          <button
            type="submit"
            className="w-full bg-electricBlue text-darkCharcoal py-3 rounded-lg font-bold hover:bg-cyberYellow hover:scale-105 transition duration-300"
          >
            Save Letter
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddLetter;