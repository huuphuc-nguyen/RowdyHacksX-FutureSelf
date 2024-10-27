import React from 'react'
import { supabase } from "../../client.js";
import { toast } from "sonner";
import {format} from 'date-fns';
import { Link } from 'react-router-dom';

const GoalCard = ({goal, onComplete, onDelete}) => {
    const formattedDate = format(new Date(goal.delivery_date), 'MM/dd/yyyy');
    const handleDelete = async () => {
        const { error } = await supabase
        .from('goal')
        .delete()
        .eq('id', goal.id);

        if (error) {
            console.error('Error deleting letter:', error.message);
            toast.error('Uh-oh! Something went wrong in the timeline. Try again!');
        } else {
            toast.success('Goal erased! The path to the future just got clearer');
            onDelete(goal.id);
        }
    }

    const handleToggleComplete = async () => {
        const { error } = await supabase
        .from('goal')
        .update({ done: !goal.done })
        .eq('id', goal.id);

        if (error) {
            console.error('Error updating goal:', error.message);
            toast.error('Uh-oh! Something went wrong in the timeline. Try again!');
        } else {
            onComplete(goal.id);
            toast.success('Goal unlocked! Your future self just leveled up!');
        }
    }

  return (
    <div
              key={goal.id}
              className={`bg-darkCharcoal/50 py-8 rounded-lg p-6 border-l-4 ${
                goal.done ? 'border-neonPink' : 'border-electricBlue'
              } shadow-md`}
            >
              <h3 className={`text-lg font-bold mb-4 ${goal.done ? 'text-neonPink' : 'text-electricBlue'} mb-2`}>
                {goal.content}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-cyberYellow">Target Date: {formattedDate}</span>
                <div className="space-x-4">
                  <button
                    onClick={handleToggleComplete}
                    className={`${
                    
                      goal.done ? 'text-electricBlue' : 'text-neonPink'
                    } hover:underline`}
                  >
                    {goal.done ? 'Mark as In Progress' : 'Mark as Done'}
                  </button>
                  <Link
                    to={`/goals/${goal.id}`}
                    className="text-electricBlue hover:underline"
                    >
                    Details
                    </Link>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-neonPink transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
  )
}

export default GoalCard
