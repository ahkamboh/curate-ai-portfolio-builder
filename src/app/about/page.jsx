"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaRegQuestionCircle,
  FaRedo,
  FaBook,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";


import { useUser, UserButton } from "@clerk/nextjs";
import { db } from "../../lib/firebase"; // Adjust the import path based on your project structure
import { collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import Link from "next/link";

function Card({ icon, text, onClick }) {
  return (
    <div
      className="flex-1 poppins-regular min-w-[180px] h-48 rounded-xl cursor-pointer bg-white/20 shadow-lg backdrop-blur-sm border border-white/30 text-white p-4 hover:bg-[#e70055] transition duration-500 flex flex-col justify-between"
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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Use Clerk's useUser hook to get user details
  const { user } = useUser();
  const userId = user?.id; // Clerk's user ID for the authenticated user

  useEffect(() => {
    if (userId) {
      // Fetch messages from Firebase for the authenticated user
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, where("userId", "==", userId));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userMessages = querySnapshot.docs.map((doc) => doc.data());
        setMessages(userMessages);
      });

      // Clean up the subscription on unmount
      return () => unsubscribe();
    }
  }, [userId]);

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

    const newUserMessage = { role: "user", content: message, userId };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setMessage("");

    // Save the new message to Firebase
    try {
      await addDoc(collection(db, "messages"), newUserMessage);
    } catch (error) {
      console.error("Error saving message to Firebase:", error);
    }

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
        userId,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // Save the assistant's response to Firebase
      await addDoc(collection(db, "messages"), assistantMessage);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
          userId,
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

  return (
    <div className="relative">
         <Link href={'/'} className="absolute top-0 gap-2 left-0 p-6 flex justify-center items-center group">
        <div className="d">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M39.9903 0.270225L30.2035 36.8334C30.1538 36.9993 29.9547 37.0491 29.8386 36.9329L23.2864 30.3771L28.1964 12.0541C28.2462 11.8881 28.0969 11.7387 27.931 11.7885L9.61815 16.7012L3.09917 10.1786C2.98306 10.0624 3.03282 9.86327 3.1987 9.81348L39.7249 0.00467392C39.8907 -0.02852 40.04 0.120853 39.9903 0.270225Z" fill="#fa0053" />
            <path opacity="0.5" d="M23.2861 30.3768L20.7648 39.8371C20.715 40.0031 20.516 40.0529 20.3998 39.9367L0.0632817 19.6054C-0.0528324 19.4892 -0.00306943 19.2901 0.162808 19.2403L9.61781 16.7009L23.2861 30.3768Z" fill="#fa0053" />
            <path d="M28.1957 12.0538L23.2857 30.3768L9.61743 16.7009L27.9303 11.7882C28.0962 11.7384 28.2454 11.8878 28.1957 12.0538Z" fill="#fa0053" />
          </svg>
        </div>
        <div className="font-bold text-2xl mt-1 ClashDisplay-Bold group-hover:tracking-wider transition-all duration-300 tracking-wide ">Curate</div>
      </Link>
      <div className="overflow-y-auto h-[calc(100vh-152px)] w-full relative sm:px-12 sm:pr-10 sm:pb-0 pb-12">
        <div className="max-w-3xl mx-auto">
          <div>
            <div className="sm:p-0 p-8 mt-3">
              <h1 id="user-name">
                Hello<span>, {user?.firstName || "User"}!</span>
              </h1>
              <h1 className="text-[#ffffff] Mixcase-500 text-4xl">
                How can I help you today?
              </h1>
            </div>
            <div className="flex justify-center mt-16 sm:p-0 pl-5">
              <div className="flex gap-2 scroll-hidden overflow-x-auto">
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
                  }
                />
              </div>
            </div>
          </div>
          <div className="p-4 poppins-regular text-sm w-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`sm:flex grid items-start pb-7 ${
                    msg.role === "user"
                      ? "flex-row-reverse sm:gap-3"
                      : "flex-row"
                  }`}
                >
                  <div className="rounded-full w-fit overflow-hidden object-cover text-white mt-1">
                    {msg.role === "user" ? (
                      <img
                        src={user?.imageUrl}
                        alt="User Profile"
                        className="h-10 w-10"
                      />
                    ) : (
                      <div className="rounded-full object-cover overflow-hidden">
                        <img
                          src="https://i.postimg.cc/8C4xcKQr/cuarteai-02-1.png"
                          alt="Bot Logo"
                          className="w-10 h-10"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={`ml-2 p-2 pb-1 max-w-md text-sm ${
                      msg.role === "user"
                        ? " bg-[#e70055]  rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 text-white"
                        : "text-white  bg-white/20 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30"
                    } rounded-3xl`}
                  >
                    {msg.content ? (
                      <ReactMarkdown
                        className="w-full prose prose-invert prose-sm max-w-none"
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold mb-2"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-xl font-bold mb-2" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-lg font-bold mb-1" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-4 mb-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-4 mb-2" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-2" {...props} />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-blue-300 hover:underline"
                              {...props}
                            />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-gray-500 pl-2 italic"
                              {...props}
                            />
                          ),
                          code: ({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) => {
                            const language = className
                              ? className.replace("language-", "")
                              : "";
                            return inline ? (
                              <code
                                className="rounded overflow-x-auto"
                                {...props}
                              >
                                {children}
                              </code>
                            ) : (
                              <CodeBlock
                                language={language}
                                value={String(children).replace(/\n$/, "")}
                              />
                            );
                          },
                          pre: ({ node, ...props }) => (
                            <pre
                              className="rounded overflow-x-auto"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <CircularProgress size={24} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
      <div
        className={`bg-[#e70055] poppins-regular text-white max-w-3xl min-h-16 fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] p-4 shadow-lg flex ${
          addClass ? "rounded-xl" : "rounded-full"
        } ${addClass ? "items-end" : "items-center"}`}
      >
        <textarea
          ref={textareaRef}
          placeholder="What do you know about curate ai?"
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

