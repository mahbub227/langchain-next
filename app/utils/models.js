import { ChatOpenAI } from "@langchain/openai";

export const OpenAIModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  verbose: false,
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
