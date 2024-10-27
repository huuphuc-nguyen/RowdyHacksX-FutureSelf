import express from "express";
import cors from "cors";
import cron from "node-cron";
import { supabase } from "./client.js";
import { getGroqChatCompletion } from "./groq.js";
import { sendScheduledEmail } from "../src/email.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { 
  res
    .status(200)
    .send('<h1 style="text-align: center; margin-top: 50px;">Server</h1>');
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

async function findDeliveryDate() {
  const date = new Date();
  const daysToAdd = 6;  // Adding days
  date.setDate(date.getDate() + daysToAdd);
  const formattedDate = date.toISOString().split("T")[0];
  console.log(formattedDate); 

  const { data: user, error } = await supabase
    .from("letter")
    .select("*")
    .eq("delivery_date", formattedDate)
    .single();

  if (!user || error) {
    return;
  }
  console.log("Through Text");
  const message =
    "Could you help refine this with additional bullet points and a motivating message and can you keep it short. Can you also just give me the answer and don't need to repeat the question: " +
    user.content;
  // const answer = await getGroqChatCompletion(message);
  // console.log(answer.choices[0].message.content);
  // return answer.choices[0].message.content
  // sendScheduledEmail({
  //   fromName: "Past Tommy",
  //   message: user.content,
  //   toEmail: "commycimmycony@gmail.com",
  // });
}

// sendScheduledEmail({
//   fromName: "Past Tommy",
//   message: "Hello123",
//   toEmail: "nhphuc236@gmail.com",
// });


// cron.schedule("* * * * * *", () => {
//   console.log("Running scheduled email task...");
//   findDeliveryDate();
// });
