import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true 

});

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(question) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    model: "llama3-8b-8192",
  });
}
