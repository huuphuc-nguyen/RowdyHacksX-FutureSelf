import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { supabase } from "../../client.js";
import Loading from '../../components/Loading/Loading.jsx'
import LetterCard from '../../components/LetterCard/LetterCard.jsx';
import background from '../../assets/background.jpg';
import GoalCard from '../../components/GoalCard/GoalCard.jsx';

const AllGoals = () => {
  const {user} = useUser();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch letters
      const { data: goals, error: goalsError } = await supabase
        .from('goal')
        .select('*')
        .eq('id_user', user.id)
        .order('delivery_date', { ascending: true }) ;
  
      if (goalsError) {
        console.error('Error fetching goals:', goalsError.message);
      } else {
        setGoals(goals);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
    setIsLoading(false);
  };
    useEffect(() => {
        fetchData();
        }
    , []);

  // Mark goal as completed
  const toggleComplete = (id) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    ));
  };

  const deleteGoal = (id) => {   
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <main 
        className={`min-h-screen py-10 w-full bg-cover bg-center bg-no-repeat bg-fixed grid place-items-center`}
        style={{ backgroundImage: `url(${background})` }}>
        <div className="fixed inset-0 bg-black opacity-30"></div>
        <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-5xl backdrop-blur-md">

        {/* Title Section */}
        <h2 className="text-3xl font-bold text-cyberYellow mb-8 text-center">
          My Future Goals
        </h2>

        {/* Loading Spinner */}
        {isLoading ? <Loading />: <>
            {/*Inprogress Goal List */}
            <ul className="space-y-8">
            {goals.filter(goal => !goal.done).map((goal) => (
                <GoalCard key={goal.id} goal={goal} onComplete={toggleComplete} onDelete={deleteGoal}/>
            ))}
            </ul>
            <div className='mb-8'></div>
            
            {/*Done Goal List */}
            <ul className="space-y-8">
            {goals.filter(goal => goal.done).map((goal) => (
                <GoalCard key={goal.id} goal={goal} onComplete={toggleComplete} onDelete={deleteGoal}/>
            ))}
            </ul>
            {/* Add New Goal Button */}
            <div className="flex justify-center mt-8">
            <Link
                to="/add-goal"
                className="bg-electricBlue text-darkCharcoal py-2 px-6 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
            >
                Add New Goal
            </Link>
            </div>
        </>}
        
      </div>
    </main>
    );
}

export default AllGoals;