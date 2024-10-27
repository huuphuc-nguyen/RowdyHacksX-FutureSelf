import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import background from "../../assets/background.jpg";

const AllGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Become a Full-Stack Developer",
      targetDate: "2024-12-31",
      completed: false,
    },
    {
      id: 2,
      title: "Run a Marathon",
      targetDate: "2025-05-20",
      completed: true,
    },
    // Add more goals here
  ]);

  // Mark goal as completed
  const toggleComplete = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  // Delete goal
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-deepPurple to-darkCharcoal text-metallicSilver flex items-center justify-center">
      <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-5xl backdrop-blur-md">
        <BackButton />
        {/* Title Section */}
        <h2 className="text-3xl font-bold text-cyberYellow mb-8 text-center">
          My Future Goals
        </h2>

        {/* Goal List */}
        <div className="space-y-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`bg-darkCharcoal rounded-lg p-6 border-l-4 ${
                goal.completed ? "border-neonPink" : "border-electricBlue"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold ${
                  goal.completed ? "text-neonPink" : "text-electricBlue"
                } mb-2`}
              >
                {goal.title}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-cyberYellow">
                  Target Date: {goal.targetDate}
                </span>
                <div className="space-x-4">
                  <button
                    onClick={() => toggleComplete(goal.id)}
                    className={`${
                      goal.completed ? "text-electricBlue" : "text-neonPink"
                    } hover:underline`}
                  >
                    {goal.completed ? "Mark as In Progress" : "Mark as Done"}
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-neonPink transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Goal Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/add-goal"
            className="bg-electricBlue text-darkCharcoal py-2 px-6 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
          >
            Add New Goal
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AllGoals;
