import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { supabase } from "../../client.js";
import Loading from '../../components/Loading/Loading.jsx'
import LetterCard from '../../components/LetterCard/LetterCard.jsx';
import background from '../../assets/background.jpg';

const AllLetters = () => {
    const {user} = useUser();
    const [letters, setLetters] = useState([]);
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
            setLetters(letters.map(letter => ({...letter, preview: letter.content.length > 100 ? `${letter.content.substring(0, 100)}...`: letter.content})));
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

        const handleDelete = (deletedId) => {
            setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== deletedId));
          };

  return (
    <main 
        className={`min-h-screen py-10 w-full bg-cover bg-center bg-no-repeat bg-fixed grid place-items-center`}
        style={{ backgroundImage: `url(${background})` }}>
        
        <div className="fixed inset-0 bg-black opacity-30"></div>

        <div className="bg-darkCharcoal/50 p-8 rounded-xl shadow-lg w-full max-w-5xl backdrop-blur-md">
        
            {/* Title Section */}
            <h2 className="text-3xl font-bold text-cyberYellow mb-8 text-center">
            My Letters to the Future
            </h2>

            {/* Loading Spinner */}
            {isLoading ? <Loading />: <>
                {/* Letter List */}
                <ul className="space-y-8">
                    {letters.map((letter) => (
                        <LetterCard key={letter.id} letter={letter} onDelete={handleDelete}/>
                    ))}
                </ul>

                {/* Add New Letter Button */}
                <div className="flex justify-center mt-8">
                    <Link
                        to="/add-letter"
                        className="bg-electricBlue text-darkCharcoal py-2 px-6 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
                    >
                        Add New Letter
                    </Link>
                </div>
            </>}
        
      </div>
    </main>
  );
};

export default AllLetters;