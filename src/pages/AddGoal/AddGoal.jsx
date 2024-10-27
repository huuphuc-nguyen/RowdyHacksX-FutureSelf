import background from "../../assets/background2.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { supabase } from "../../client";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import { useParams } from "react-router-dom";
import { getGroqChatCompletion } from "../../../server/groq";

const schema = yup.object().shape({
  content: yup
    .string()
    .required("Please write a message")
    .min(5, "Message must be at least 10 characters long"),
  deliveryDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Please select a target date")
    .min(new Date(), "Target date cannot be in the past"),
});

const AddGoal = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useUser();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchGoal = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("goal")
          .select("*")
          .eq("id", id)
          .single(); // Fetch a single goal
        
        if (error) {
          console.error("Error fetching goal:", error.message);
          toast.error("Failed to load goal data");
        } else if (data) {
          const message =
            "Break down this goal and make some bullet point for me. Can you also just give me the answer and don't need to repeat the question: " +
            data.content;
          const answer = await getGroqChatCompletion(message);
          console.log(answer.choices[0].message.content);
          setValue("content", data.content);
          setValue("deliveryDate", data.delivery_date);
          setValue("aiHint", answer.choices[0].message.content);
          setIsEditing(true); // Set editing state to true
          setGoal(data);
        }
        setIsLoading(false);
      };
      fetchGoal();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    let error;

    if (isEditing) {
      // Update existing goal
      ({ error } = await supabase
        .from("goal")
        .update({
          content: data.content,
          delivery_date: data.deliveryDate,
        })
        .eq("id", id));
    } else {
      // Insert new goal
      ({ error } = await supabase
        .from("goal")
        .insert([
          { 
            content: data.content,
            delivery_date: data.deliveryDate,
            id_user: user.id,
            done: false,
          }
        ]));
    }

    if (error) {
      console.error(isEditing ? "Update failed:" : "Insert failed:", error.message);
      toast.error(isEditing ? "Failed to update goal" : "Failed to save goal");
    } else {
      toast.success(isEditing ? "Goal updated successfully!" : "Goal saved! Your journey to the future has begun!");
      reset();
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
          {isEditing ? "Edit Your Goal" : "Set Your Future Goals"}
        </h2>

        {isLoading ? <Loading /> : <>
            
        </>}  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Content Input */}
          <input
            type="text"
            {...register("content")}
            placeholder="Enter your goal..."
            className="w-full p-3 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
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
            className="w-full p-3 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
          />
          {errors.deliveryDate && (
            <p className="text-sm text-neonPink font-semibold">
              {errors.deliveryDate.message}
            </p>
          )}

          {/* AI Hint */}
          <h2 className="text-3xl font-bold text-cyberYellow mb-6 text-center">
            {"AI Hint"}
        </h2>
          {(goal && !goal.done) && <>
            <textarea
                {...register("aiHint")}
                placeholder="Write your message here..."
                className="w-full p-4 rounded-lg bg-darkCharcoal/90 text-metallicSilver outline-none focus:border-neonPink focus:border-2"
                rows={6}
                />
          </>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-electricBlue text-darkCharcoal/90 py-3 rounded-lg font-bold hover:bg-cyberYellow/80 hover:scale-105 transition duration-300"
          >
            {isSaving ? "Saving..." : isEditing ? "Update Goal" : "Add Goal"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddGoal;
