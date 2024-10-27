import express from "express";
import cors from "cors";
import cron from "node-cron";
import emailjs from "emailjs-com";
import { supabase } from "./client.js";
import { getGroqChatCompletion } from "./groq.js";
const app = express();
app.use(cors());
app.use(express.json());

// Home Route
const answer = await getGroqChatCompletion("what is this chatgpt version");
console.log(answer.choices[0].message.content);

app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1 style="text-align: center; margin-top: 50px;">Server</h1>');
});

const serviceId = "service_5op7fd9";
const templateId = "template_racnmro";
const publicKey = "r45fNu_IBqC6PAfXd";

// Email Sending Function
const sendScheduledEmail = async (data) => {
  const templateParams = { title: data.title, content: data.content };
  await emailjs.send(serviceId, templateId, templateParams, publicKey);
  emailjs
    .send(
      "YOUR_SERVICE_ID", // Your EmailJS Service ID
      "YOUR_TEMPLATE_ID", // Your EmailJS Template ID
      { message: "This is a scheduled email" }, // Sample data to be passed to the template
      "YOUR_USER_ID" // Your EmailJS User ID
    )
    .then(
      (result) => {
        console.log("Scheduled email sent successfully:", result.text);
      },
      (error) => {
        console.error("Failed to send scheduled email:", error.text);
      }
    );
};

// Schedule the Email Sending Job
// cron.schedule("* * * * * *", () => {
//   // This example runs every day at 9:00 AM
//   console.log("Running scheduled email task...");
//   sendScheduledEmail();
// });

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
