"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaUserTie,
  FaRegQuestionCircle,
  FaRedo,
  FaInfoCircle ,
  FaBook,
  FaArrowRight,
} from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser, UserButton } from "@clerk/nextjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import Showdown
import Showdown from "showdown";

// Firebase imports
import { db } from "../../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

function Card({ icon, text, onClick }) {
  return (
    <div
      className="flex-1 poppins-regular min-w-[180px] h-48 rounded-xl cursor-pointer hover:bg-[#e70055ae]  text-white p-4 bg-white/20 shadow-lg backdrop-blur-sm border border-white/30 transition duration-500 flex flex-col justify-between"
      onClick={onClick}
    >
      <div>{text}</div>
      <div className="flex justify-end items-end">
        <div className="bg-[#e70055] p-2 rounded-full">{icon}</div>
      </div>
    </div>
  );
}

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={solarizedlight}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function Page() {
  const { user } = useUser();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [promptCount, setPromptCount] = useState(0);

  // Initialize Showdown converter
  const converter = new Showdown.Converter();

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      const shouldAddClass =
        textarea.scrollHeight > 50 || textarea.value.includes("\n");

      if (shouldAddClass !== addClass) {
        setAddClass(shouldAddClass);
      }
    }
  }, [message, addClass]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = { role: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setMessage("");

    try {
      setIsLoading(true);
      const response = await fetch("/api/curate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const responseData = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: responseData.message,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // Store the conversation in Firebase
      if (user) {
        await addDoc(collection(db, "conversations"), {
          userId: user.id,
          userMessage: newUserMessage,
          aiResponse: assistantMessage,
          timestamp: new Date(),
        });
      }

      // Increase the prompt count
      setPromptCount((prevCount) => prevCount + 1);

      // Show the review modal after two prompts
      if (promptCount === 1 && !reviewSubmitted) {
        setShowReviewModal(true);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleCardClick = (text) => {
    setMessage(text);
    sendMessage();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReviewSubmit = async () => {
    if (user) {
      try {
        await addDoc(collection(db, "reviews"), {
          userId: user.id,
          rating: rating,
          reviewText: reviewText,
          timestamp: new Date(),
        });
        console.log("Review submitted successfully");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }

    setShowReviewModal(false);
    setReviewSubmitted(true);
  };

  const handleReviewClose = () => {
    setShowReviewModal(false);
  };

  const fetchConversationHistory = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, "conversations"),
          where("userId", "==", user.id)
        );
        const querySnapshot = await getDocs(q);
        const history = [];
        querySnapshot.forEach((doc) => {
          history.push(doc.data());
        });
        // Sort history by timestamp
        history.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());

        // Update the messages state with the fetched history
        setMessages(
          history.flatMap((item) => [item.userMessage, item.aiResponse])
        );
      } catch (error) {
        console.error("Error fetching conversation history:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversationHistory();
    }
  }, [user]);

  return (
    <div className="relative ">
      <div className=" p-5 ">
        <UserButton />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-152px)] w-full relative  sm:px-12 sm:pr-10 sm:pb-0 pb-12  ">
        <div className="max-w-3xl mx-auto  ">
          <div>
            <div className="sm:p-0 p-8 mt-5">
              <h1 id="user-name">
                Hello{user && <span>, {user.firstName}!</span>}
              </h1>
              <h1 className="text-white Mixcase-500 text-4xl">
           You can ask about curate?
              </h1>
            </div>
            <div className="flex justify-center mt-16  sm:p-0 pl-5 ">
              <div className="flex  gap-2  scroll-hidden overflow-x-auto">
              <Card
                  icon={<FaInfoCircle className="text-2xl" />}
                  text="What is Curate?"
                  onClick={() => handleCardClick("What is Curate?")}
                />
                <Card
                  icon={<FaRegQuestionCircle className="text-2xl" />}
                  text="How do I set up my Curate account?"
                  onClick={() =>
                    handleCardClick("How do I set up my Curate account?")
                  }
                />
                <Card
                  icon={<FaRedo className="text-2xl" />}
                  text="How do I customize my portfolio?"
                  onClick={() =>
                    handleCardClick("How do I customize my portfolio?")
                  }
                />
                <Card
                  icon={<FaBook className="text-2xl" />}
                  text="What are the key features of Curate?"
                  onClick={() =>
                    handleCardClick("What are the key features of Curate?")
                  }/>
              </div>
            </div>
          </div>
          <div className="p-4 poppins-regular text-sm  w-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`sm:flex grid  items-start  pb-7 ${
                    msg.role === "user"
                      ? "flex-row-reverse sm:gap-3 "
                      : "flex-row"
                  }`}
                >
                  <div className=" rounded-full w-fit  overflow-hidden object-cover  text-white mt-1">
                    {msg.role === "user" ? (
                      <img
                        src={user?.imageUrl}
                        alt="User Profile"
                        onError={(e) =>
                          (e.target.src =
                            "https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Contained_Mark_Blue.png")
                        }
                        className="h-10 w-10"
                      />
                    ) : (
                      <div className=" rounded-full   object-cover overflow-hidden ">
                        <img
                          src="https://i.postimg.cc/8C4xcKQr/cuarteai-02-1.png"
                          alt="Bot Logo"
                          className=" w-10 h-10  "
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={`ml-2 p-2 pb-1 max-w-md  text-sm ${
                      msg.role === "user"
                        ? "bg-[#e70055] text-white"
                        : "text-white bg-white/20 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30"
                    } rounded-3xl`}
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(msg.content),
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
      <div
        className={`bg-[#e70055] poppins-regular text-white max-w-3xl min-h-16 fixed bottom-5 left-1/2 transform scroll-sp -translate-x-1/2 z-50 w-[90%] p-4 shadow-lg flex ${
          addClass ? "rounded-xl" : "rounded-full"
        } ${addClass ? "items-end" : "items-center"}`}
      >
        <textarea
          ref={textareaRef}
          placeholder="Enter a prompt here..."
          className="textarea-field bg-[#e70055] flex-grow p-2 border-none focus:outline-none resize-none overflow-y-auto"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          rows="1"
          style={{ maxHeight: "200px", minHeight: "14px" }}
        />
        <FaArrowRight
          className="ml-4 text-xl text-white cursor-pointer"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
