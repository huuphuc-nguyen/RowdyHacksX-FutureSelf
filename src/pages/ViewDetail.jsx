import React from "react";
import { useParams } from "react-router-dom";

export default function ViewDetail () {
  const { id } = useParams();
  // Sample letter data; in a real app, this would come from an API or context
  const letters = [
    {
      id: 1,
      title: "Letter to My Future Self",
      content: "Dear Future Me, remember to stay strong...",
      deliveryDate: "2024-06-01",
    },
    {
      id: 2,
      title: "Dreams and Goals",
      content:
        "I hope you have achieved your dreams and become the best version of yourself...",
      deliveryDate: "2025-01-15",
    },
    // Add more letter data here
  ];

  // Find the letter based on the id from the URL
  const letter = letters.find((letter) => letter.id === parseInt(id));

  if (!letter) {
    return <div>Letter not found!</div>; // Handle case where letter does not exist
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-deepPurple to-lightGray text-metallicSilver">
      <div className="bg-darkCharcoal/90 p-8 rounded-xl shadow-lg w-full max-w-3xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-electricBlue mb-4">
          {letter.title}
        </h2>
        <p className="mt-4 text-lg">{letter.content}</p>
        <p className="mt-6 text-cyberYellow">
          Delivery Date: {letter.deliveryDate}
        </p>
      </div>
    </div>
  );
};

