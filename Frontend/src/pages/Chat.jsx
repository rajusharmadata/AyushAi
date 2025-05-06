import { useState, useRef, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { format } from "date-fns";
import axios from "axios";
import Navbar from "../components/navbar"; // Import your existing Navbar component

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! I'm AyushAI, your Ayurvedic health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("https://ayushai-1.onrender.com/api/chat", {
        message: input,
      });

      const data = response.data;

      let replyContent = "";

      if (Array.isArray(data) && data.length > 0) {
        replyContent = data
          .map((remedy, index) => {
            return `🩺 Remedy ${index + 1}:
🔹 Symptoms: ${remedy.symptoms.join(", ")}
🌿 Remedies: ${remedy.remedy.join(", ")}
📝 Description: ${remedy.description}`;
          })
          .join("\n\n");
      } else {
        replyContent = "No remedies found for your symptoms.";
      }

      const botMessage = {
        id: Date.now().toString(),
        content: replyContent,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        id: Date.now().toString(),
        content:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return format(date, "HH:mm");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-amber-800 mb-6">
            Chat with AyushAI
          </h1>

          <div className="border border-green-200 rounded-lg bg-white">
            <div className="h-[calc(100vh-220px)] overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                        message.sender === "user"
                          ? "bg-green-100 ml-2"
                          : "bg-amber-100"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <span className="text-green-600 text-sm font-bold">
                          U
                        </span>
                      ) : (
                        <span className="text-amber-600 text-sm font-bold">
                          B
                        </span>
                      )}
                    </div>
                    <div>
                      <div
                        className={`whitespace-pre-line p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-green-600 text-white rounded-tr-none"
                            : "bg-amber-50 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                      <div
                        className={`text-xs text-gray-500 mt-1 ${
                          message.sender === "user"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-4 justify-start">
                  <div className="flex items-start max-w-[80%]">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full mr-2 bg-amber-100">
                      <span className="text-amber-600 text-sm font-bold">B</span>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 text-gray-800 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 bg-amber-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-amber-600 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-amber-600 rounded-full animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your symptoms or health concerns..."
                  className="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 disabled:bg-green-400 disabled:cursor-not-allowed"
                  disabled={!input.trim() || isTyping}
                >
                  <AiOutlineSend className="w-6 h-6" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Note: This is a demo chatbot. In a real application, responses
                would be generated by an AI trained on Ayurvedic principles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}