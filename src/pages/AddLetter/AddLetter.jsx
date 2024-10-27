import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { supabase } from '../../client';
import background from '../../assets/background2.jpg';
import { useUser } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

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
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required('Please select a delivery date')
    .min(new Date(), 'Delivery date cannot be in the past')
});

const DetailLetter = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema)
  });
  
  const { user } = useUser();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch letter data if `id` exists for editing
    if (id) {
      const fetchLetter = async () => {
        const { data, error } = await supabase
          .from('letter')
          .select('*')
          .eq('id', id)
          .single(); // Get only one letter
        
        if (error) {
          console.error('Error fetching letter:', error.message);
          toast.error('Failed to load letter');
        } else if (data) {
          // Set the form values with fetched data
          setValue('title', data.title);
          setValue('content', data.content);
          setValue('deliveryDate', data.delivery_date);
          setIsEditing(true); // Set editing state to true
        }
      };
      fetchLetter();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    let error;

    if (isEditing) {
      // Update existing letter
      ({ error } = await supabase
        .from('letter')
        .update({
          title: data.title,
          content: data.content,
          delivery_date: data.deliveryDate
        })
        .eq('id', id));
    } else {
      // Insert new letter
      ({ error } = await supabase
        .from('letter')
        .insert([
          { 
            title: data.title,
            content: data.content,
            delivery_date: data.deliveryDate,
            id_user: user.id
          }
        ]));
    }

    if (error) {
      console.error(isEditing ? 'Update failed:' : 'Insert failed:', error.message);
      toast.error(isEditing ? 'Failed to update letter' : 'Failed to save letter');
    } else {
      toast.success(isEditing ? 'Letter updated successfully!' : 'Letter saved! Prepare for delivery to the future!');
    }

    setIsSaving(false);
  };

  return (
    <main
      className={`min-h-screen w-full bg-cover grid place-items-center bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-darkCharcoal/50 p-8 rounded-xl shadow-lg w-full max-w-3xl backdrop-blur-md">
        <BackButton />
        <h2 className="text-3xl font-bold text-cyberYellow mb-6 text-center">
          {isEditing
            ? "Edit Your Letter"
            : "Write a Letter to Your Future Self"}
        </h2>

        {/* Form with validation */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Input */}
          <input
            {...register("title")}
            placeholder="Enter your letter title..."
            className="w-full p-4 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
          />
          {errors.title && (
            <p className="text-sm text-neonPink font-semibold">
              {errors.title.message}
            </p>
          )}

          {/* Content Textarea */}
          <textarea
            {...register("content")}
            placeholder="Write your message here..."
            className="w-full p-4 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
            rows={6}
          />
          {errors.content && (
            <p className="text-sm text-neonPink font-semibold">
              {errors.content.message}
            </p>
          )}

          {/* Delivery Date Input */}
          <input
            type="date"
            {...register("deliveryDate")}
            className="w-full p-3 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-electricBlue focus:border-2"
          />
          {errors.deliveryDate && (
            <p className="text-sm text-neonPink font-semibold">
              {errors.deliveryDate.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-electricBlue text-darkCharcoal py-3 rounded-lg font-bold hover:bg-cyberYellow/80 hover:scale-105 transition duration-300"
          >
            {isSaving
              ? "Saving..."
              : isEditing
              ? "Update Letter"
              : "Save Letter"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default DetailLetter;
