import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro"; // Or "gemini-1.5-pro" if enabled
const API_KEY = "AIzaSyAEppAU7irXj5aJPm55tvsrgj55Lnu0NIA"; // Replace with your actual key (don't expose it publicly)

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const chat = model.startChat({
    generationConfig: {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;
