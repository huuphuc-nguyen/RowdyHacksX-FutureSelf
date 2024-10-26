import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/background.jpg';
import ItemSection from '../../components/ItemSection/ItemSection';
import { date } from 'yup';

const Dashboard = () => {
    const list=[{
        content: 'Letter 1',
        date: '2022-12-12'
    },{
        content: 'Letter 2',
        date: '2022-12-12'
    },{
        content: 'Letter 3',
        date: '2022-12-12'
    },{
        content: 'Letter 4',
        date: '2022-12-12'
    },{
        content: 'Letter 5',
        date: '2022-12-12'
    }
    ]
  return (
    <main 
    className={`min-h-screen w-full bg-cover grid place-items-center bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
    style={{ backgroundImage: `url(${background})` }}>
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
        <ItemSection section='letters' itemlist={list}/>

        {/* Upcoming Goals */}
        <ItemSection section='goals' itemlist={list}/>

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