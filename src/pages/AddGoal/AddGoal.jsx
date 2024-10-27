import background from "../../assets/background2.jpg";
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { supabase } from '../../client';
import {useUser} from '../../context/UserContext'
import { useState } from "react";

const schema = yup.object().shape({
    content: yup
      .string()
      .required('Please write a message')
      .min(5, 'Message must be at least 10 characters long'),
    deliveryDate: yup
      .date()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .required('Please select a target date')
      .min(new Date(), 'Target date cannot be in the past')
  });

const AddGoal = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
      });

    const {user} = useUser();

    const [isSaving, setIsSaving] = useState(false);

    const onSubmit = async (data) => {
        setIsSaving(true);
        const {error} = await supabase.from('goal').insert([
            { 
                content: data.content,
                delivery_date: data.deliveryDate,
                id_user: user.id,
                done: false
            }
        ]);
        if (error) {
            console.error('Insert failed:', error.message);
            toast.error('Failed to save goal');
        } else {
          toast.success('Goal saved! Your journey to the future has begun!');
          reset(); 
        }
        setIsSaving(false);
      };

  return (
    <main 
    className={`min-h-screen w-full bg-cover grid place-items-center bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
    style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-darkCharcoal/50 p-8 rounded-xl shadow-lg w-full max-w-3xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyberYellow mb-6 text-center">
          Set Your Future Goals
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            type="text"
            {...register('content')}
            placeholder="Enter your goal..."
            className="w-full p-3 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
          />
            {errors.content && (
                <p className="text-sm text-neonPink font-semibold">{errors.content.message}</p>
            )}
          <input
            type="date"
            {...register('deliveryDate')}
            className="w-full p-3 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
          />
          {errors.deliveryDate && (
            <p className="text-sm text-neonPink font-semibold">{errors.deliveryDate.message}</p>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-electricBlue text-darkCharcoal/90 py-3 rounded-lg font-bold hover:bg-cyberYellow/80 hover:scale-105 transition duration-300"
          >
            {isSaving ? 'Saving...' : 'Add Goal'}
          </button>
        </form>

      </div>
    </main>
  );
};

export default AddGoal;
