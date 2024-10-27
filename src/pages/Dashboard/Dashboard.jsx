import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/background.jpg';
import ItemSection from '../../components/ItemSection/ItemSection';
import { useUser } from '../../context/UserContext';
import { supabase } from "../../client.js";
import Loading from '../../components/Loading/Loading.jsx'

const Dashboard = () => {
    const {user} = useUser();
    const [letters, setLetters] = useState([]);
    const [goals, setGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
          // Fetch letters
          const { data: letters, error: lettersError } = await supabase
            .from('letter')
            .select('*')
            .eq('id_user', user.id)
            .order('delivery_date', { ascending: true }) ;
      
          if (lettersError) {
            console.error('Error fetching letters:', lettersError.message);
          } else {
            setLetters(letters.map(letter => ({...letter, content: letter.content.length > 100 ? `${letter.content.substring(0, 100)}...`: letter.content})));
          }
      
          // Fetch goals
          const { data: goals, error: goalsError } = await supabase
            .from('goal')
            .select('*')
            .eq('id_user', user.id)
            .order('delivery_date', { ascending: true });
      
          if (goalsError) {
            console.error('Error fetching goals:', goalsError.message);
          } else {
            setGoals(goals.map(goal => ({...goal, content: goal.content.length > 100 ? `${goal.content.substring(0, 100)}...`: goal.content})));
            setCompletedGoals(goals.filter(goal => goal.done));
          }
        } catch (err) {
          console.error('Unexpected error:', err);
        }
        setIsLoading(false);
      };
      useEffect(() => {
        fetchData();
        }, []);

    return (
        <main 
        className={`min-h-screen py-10 w-full bg-cover bg-center bg-no-repeat bg-fixed grid place-items-center`}
        style={{ backgroundImage: `url(${background})` }}>

            <div className="fixed inset-0 bg-black opacity-30"></div>

            <div className="bg-darkCharcoal/70 p-8 rounded-xl shadow-lg w-full max-w-5xl backdrop-blur-md">
            
            {/* Greeting Section */}
            <h2 className="text-3xl font-bold text-cyberYellow mb-8 text-center">
            Welcome Back, {user.username}!
            </h2>

            {isLoading ? <Loading /> :
                <>
                    {/* Quick Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-metall p-4 rounded-lg shadow-md text-center border border-electricBlue">
                        <h3 className="text-lg font-bold text-electricBlue">Total Letters</h3>
                        <p className="text-2xl font-bold text-metallicSilver">{letters.length}</p>
                    </div>
                    <div className="bg-darkCharcoal p-4 rounded-lg shadow-md text-center border border-neonPink">
                        <h3 className="text-lg font-bold text-neonPink">Total Goals</h3>
                        <p className="text-2xl font-bold text-metallicSilver">{goals.length}</p>
                    </div>
                    <div className="bg-darkCharcoal p-4 rounded-lg shadow-md text-center border border-cyberYellow">
                        <h3 className="text-lg font-bold text-cyberYellow">Completed Goals</h3>
                        <p className="text-2xl font-bold text-metallicSilver">{completedGoals.length}</p>
                    </div>
                    </div>

                    {/* Upcoming Letters */}
                    {!isLoading && <ItemSection section='letters' itemlist={letters.slice(0,3)}/>}

                    {/* Upcoming Goals */}
                    {!isLoading && <ItemSection section='goals' itemlist={goals.filter(goal => !goal.done).slice(0,3)}/>}

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
                </>
            }
            </div>
        </main>
  );
};

export default Dashboard;