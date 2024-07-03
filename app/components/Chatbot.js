"use client";
import { useState } from "react";
import { getBasicResponse } from "../utils/ai/getBasicResponse";
import { getResponseFromVectors } from "../utils/ai/getResponseFromVectors";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setChatHistory((previousState) => [
      ...previousState,
      {
        owner: "user",
        value: input,
      },
    ]);
    setInput("");
    // const resp = await getBasicResponse(input);
    const resp = await getResponseFromVectors(input);
    console.log(resp);
    setChatHistory((previousState) => [
      ...previousState,
      {
        owner: "openai",
        value: resp,
      },
    ]);
  };
  const chatHistoryUI = chatHistory.map((data, index) => {
    return (
      <div key={index + data.value}>
        <p
          className={`text-${
            data.owner === "user" ? "right bg-slate-50" : "left bg-teal-50"
          } p-2 m-4 border shadow-inner text-base break-words`}
        >
          {data.value}
        </p>
      </div>
    );
  });
  return (
    <div>
      <div className="bg-zinc-200 p-5">
        <p className="font-bold italic text-blue-700 text-right text-xl">
          Ask me!
        </p>
      </div>
      <div className="pb-20">{chatHistoryUI}</div>
      <form
        onSubmit={onSubmitHandler}
        className="fixed bottom-0 left-0 w-full p-8"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border relative h-10 p-4 w-10/12"
        ></input>
        <button
          type="submit"
          className="w-2/12 bg-slate-600 hover:bg-slate-800 text-white h-10"
        >
          Chat
        </button>
      </form>
    </div>
  );
}
