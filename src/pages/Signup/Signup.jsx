import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillKeyFill, BsEnvelopeFill } from 'react-icons/bs';
import background from '../../assets/background2.jpg';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Please enter your email'),
  userName: yup.string().required('Please enter your username'),
  passWord: yup.string().min(6, 'Password must be at least 6 characters').required('Please enter your password')
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    // try {
    //   await createUserWithEmailAndPassword(auth, data.email, data.passWord);
    //   alert('Account created successfully!');
    //   reset();
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  return (
    <main 
      className={`h-lvh w-full bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
      style={{ backgroundImage: `url(${background})` }}>
      <div className='grid place-items-center h-full'>
        <div className='border border-metallicSilver shadow-2xl rounded-xl h-[30rem] lg:w-[30rem] w-[22rem] bg-darkCharcoal/50 backdrop-blur-md'>
          <form
            className='w-full h-full flex flex-col items-start justify-center py-5 lg:px-10 px-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className='text-2xl font-bold text-cyberYellow self-center'>
              FutureSelf - Sign Up
            </h1>

            {/* Email Field */}
            <label className='text-electricBlue mb-2 mt-8'>Email</label>
            <div className='relative w-full'>
              <input
                {...register('email')}
                className='w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-darkCharcoal text-metallicSilver border border-electricBlue shadow-lg outline-none focus:border-neonPink focus:border-2'
              />
              <BsEnvelopeFill className='text-lg text-electricBlue absolute top-2 left-2' />
            </div>
            <p className='text-sm text-neonPink font-semibold mt-1'>{errors.email?.message}</p>

            {/* Username Field */}
            <label className='text-electricBlue mb-2 mt-8'>Username</label>
            <div className='relative w-full'>
              <input
                {...register('userName')}
                className='w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-darkCharcoal text-metallicSilver border border-electricBlue shadow-lg outline-none focus:border-neonPink focus:border-2'
              />
              <BsFillPersonFill className='text-lg text-electricBlue absolute top-2 left-2' />
            </div>
            <p className='text-sm text-neonPink font-semibold mt-1'>{errors.userName?.message}</p>

            {/* Password Field */}
            <label className='text-electricBlue mb-2 mt-10'>Password</label>
            <div className='relative w-full'>
              <input
                type="password"
                {...register('passWord')}
                className='w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-darkCharcoal text-metallicSilver border border-electricBlue shadow-lg outline-none focus:border-neonPink focus:border-2'
              />
              <BsFillKeyFill className='text-lg text-electricBlue absolute top-2 left-2' />
            </div>
            <p className='text-sm text-neonPink font-semibold mt-1'>{errors.passWord?.message}</p>

            <button
              type="submit"
              className='self-center bg-electricBlue text-darkCharcoal rounded-lg px-4 py-2 mt-8 shadow-md hover:bg-cyberYellow hover:scale-105 duration-300'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
