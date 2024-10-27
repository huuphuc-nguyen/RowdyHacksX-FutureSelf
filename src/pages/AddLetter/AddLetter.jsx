import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { supabase } from '../../client';
import background from '../../assets/background2.jpg';
import {useUser} from '../../context/UserContext'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Please enter a title')
    .min(5, 'Title must be at least 5 characters long'),
  content: yup
    .string()
    .required('Please write a message')
    .min(10, 'Message must be at least 10 characters long'),
  deliveryDate: yup
    .date()
    .required('Please select a delivery date')
    .min(new Date(), 'Delivery date cannot be in the past')
});

const AddLetter = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const {user} = useUser();
  console.log(user);

  const onSubmit = async (data) => {

    const {error} = await supabase.from('letter').insert([
        { 
            title: data.title,
            content: data.content,
            delivery_date: data.deliveryDate,
            id_user: user.id
        }
    ]);
    if (error) {
        console.error('Insert failed:', error.message);
        toast.error('Failed to save letter');
    } else {
      toast.success('Letter saved! Prepare for delivery to the future!');
      reset(); 
    }
  };

  return (
    <main 
      className={`min-h-screen w-full bg-cover grid place-items-center bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
      style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-darkCharcoal/80 p-8 rounded-xl shadow-lg w-full max-w-3xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyberYellow mb-6 text-center">
          Write a Letter to Your Future Self
        </h2>
        
        {/* Form with validation */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title Input */}
          <input
            {...register('title')}
            placeholder="Enter your letter title..."
            className="w-full p-4 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-neonPink focus:border-2"
            rows={6}
          ></input>
          {errors.content && (
            <p className="text-sm text-neonPink font-semibold">{errors.content.message}</p>
          )}

          {/* Content Textarea */}
          <textarea
            {...register('content')}
            placeholder="Write your message here..."
            className="w-full p-4 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-neonPink focus:border-2"
            rows={6}
          ></textarea>
          {errors.content && (
            <p className="text-sm text-neonPink font-semibold">{errors.content.message}</p>
          )}

          {/* Delivery Date Input */}
          <input
            type="date"
            {...register('deliveryDate')}
            className="w-full p-3 rounded-lg bg-darkCharcoal text-metallicSilver outline-none focus:border-electricBlue focus:border-2"
          />
          {errors.deliveryDate && (
            <p className="text-sm text-neonPink font-semibold">{errors.deliveryDate.message}</p>
          )}

          {/* Submit Button */}
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
