import { Link } from "react-router-dom"
import { supabase } from "../../client.js";
import { toast } from "sonner";
import { format } from 'date-fns';

const LetterCard = ({letter, onDelete}) => {
    const formattedDate = format(new Date(letter.delivery_date), 'MM/dd/yyyy');

    const handleDelete = async () => {
        const { error } = await supabase
        .from('letter')
        .delete()
        .eq('id', letter.id);

        if (error) {
            console.error('Error deleting letter:', error.message);
            toast.error('Uh-oh! Something went wrong in the timeline. Try again!');
        } else {
            toast.success('Letter deleted successfully');
            onDelete(letter.id);
        }
    }

  return (
    <li>
        <div className="bg-darkCharcoal/70 rounded-lg p-6 border-l-4 border-electricBlue shadow-md">
            <h3 className="text-xl font-bold text-electricBlue mb-2">{letter.title}</h3>
            <p className="text-sm mb-4 text-metallicSilver">{letter.preview}</p>
            <div className="flex justify-between items-center">
            <span className="text-cyberYellow">Delivery Date: {formattedDate}</span>
            <div className="space-x-4">
                <Link
                to={`/letters/${letter.id}`}
                className="text-electricBlue hover:underline"
                >
                View Details
                </Link>
                <button onClick={handleDelete} className="text-neonPink hover:text-red-500 transition duration-300">
                Delete
                </button>
            </div>
            </div>
        </div>
    </li>
  )
}

export default LetterCard
