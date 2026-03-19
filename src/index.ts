import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; 
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function runChatbot() {
  
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("No se encontró GROQ_API_KEY. Revisa la ruta de tu archivo .env");
  }

  const model = new ChatGroq({
    apiKey: apiKey, 
    model: "llama-3.3-70b-versatile", 
    temperature: 0,
  });


  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Eres un asistente técnico experto en programación. Respondes de forma concisa y con humor."],
    ["human", "{input}"],
  ]);


  const chain = prompt.pipe(model);

 

    const response = await chain.invoke({
      input: "¿donde viven los pinguinos como tux?",
    });

    console.log("Chatbot:", response.content);
  
   
  
}

runChatbot();