import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsFillPersonFill, BsFillKeyFill } from "react-icons/bs";
import background from "../../assets/background2.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../client.js";

const schema = yup.object().shape({
  userName: yup.string().required("Please enter your username"),
  passWord: yup.string().required("Please enter your password"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Single query to find user by username and password
      const { data: user, error } = await supabase
        .from("user")
        .select("*")
        .eq("name", data.userName)
        .eq("password", data.passWord)
        .single(); // Ensures we get only one result

      if (error || !user) {
        // Show an error if no user is found
        toast.error("Wrong username or password");
      } else {
        // Redirect to dashboard if login is successful
        navigate("/dashboard");
        reset();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main
      className={`h-lvh w-full bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="grid place-items-center h-full">
        <div className="border border-metallicSilver shadow-2xl rounded-xl h-[25rem] lg:w-[30rem] w-[22rem] bg-darkCharcoal/55 backdrop-blur-md">
          <form
            className="w-full h-full flex flex-col items-start justify-center py-5 lg:px-10 px-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold text-cyberYellow self-center">
              FutureSelf - Log In
            </h1>

            <label className="text-electricBlue mb-2 mt-8">Username</label>
            <div className="relative w-full">
              <input
                {...register("userName")}
                className="w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-metallicSilver/20 text-metallicSilver shadow-lg outline-none focus:border-neonPink focus:border-2"
              />
              <BsFillPersonFill className="text-lg text-electricBlue absolute top-2 left-2" />
            </div>
            <p className="text-sm text-neonPink font-semibold mt-1">
              {errors.userName?.message}
            </p>

            <label className="text-electricBlue mb-2 mt-10">Password</label>
            <div className="relative w-full">
              <input
                type="password"
                {...register("passWord")}
                className="w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-metallicSilver/20 text-metallicSilver shadow-lg outline-none focus:border-neonPink focus:border-2"
              />
              <BsFillKeyFill className="text-lg text-electricBlue absolute top-2 left-2" />
            </div>
            <p className="text-sm text-neonPink font-semibold mt-1">
              {errors.passWord?.message}
            </p>

            <button
              type="submit"
              className="self-center bg-electricBlue text-darkCharcoal rounded-lg px-4 py-2 mt-8 shadow-md hover:bg-cyberYellow hover:scale-105 duration-300"
            >
              {false ? "...Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
