"use client"
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

const accordionData: AccordionItem[] = [
  {
    question: "What is HeadlineAI?",
    answer: "HeadlineAI is an AI-based news application that offers users a conversational interface (CUI) to ask for news updates in a natural, human-like way. It features a landing page with login/signup functionality, and the CUI is only accessible to logged-in users.",
  },
  {
    question: "How does HeadlineAI ensure personalized interaction with users?",
    answer: "HeadlineAI personalizes interaction by offering a conversational user interface where users can ask news-related questions as if they were speaking to a person. It stores user credentials like email and password in local storage using PostgreSQL, which enables a personalized experience once logged in.",
  },
  {
    question: "What technology stack is used to build HeadlineAI?",
    answer: " HeadlineAI is built using Next.js for the frontend, TypeScript for type safety, PostgreSQL for storing user data, and FastAPI to create the backend API. The Web Speech API is used to enable voice input for the CUI.",
  },
  {
    question: "What happens if a user is not logged in to HeadlineAI?",
    answer: "If a user is not logged in, they can still access the landing page but will not have access to the conversational user interface. The CUI becomes available only after the user logs in.",
  },
  {
    question: "How does HeadlineAI handle user authentication and security?",
    answer: "HeadlineAI handles user authentication by storing email and password securely in PostgreSQL. During login, an access token is generated, allowing authenticated sessions. This ensures that only logged-in users can interact with the CUI for personalized news updates.",
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSetIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
  
    <div className="flex justify-center items-center min-h-96">
      <div className="w-full max-w-md mx-auto space-y-4">
        {accordionData.map((item, index) => (
          <div key={index} className="border rounded-lg shadow-lg">
            <button
              onClick={() => handleSetIndex(index)}
              className="w-full text-left px-4 py-2 font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              {item.question}
            </button>
            {activeIndex === index && (
              <div className="px-4 py-2 bg-white text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div><hr /></>
  );
};

export default Accordion;
