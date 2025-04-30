
import { useState, useRef, useEffect } from "react";

// Sample responses for the chatbot
const botResponses = [
  "Based on your symptoms, this could be related to a Vata imbalance. I recommend warm ginger tea with honey to help soothe your system.",
  "Your symptoms suggest a Pitta imbalance. Try cooling herbs like coriander and mint, and avoid spicy foods for a few days.",
  "This sounds like a Kapha imbalance. I recommend a tea with ginger, black pepper, and honey taken first thing in the morning.",
  "Have you tried triphala? It's an Ayurvedic formulation that might help with your digestive issues.",
  "Consider adding turmeric to your daily routine. It has anti-inflammatory properties that could help with your symptoms.",
  "Based on what you've described, I recommend consulting with an Ayurvedic practitioner for a personalized treatment plan.",
  "Try a warm compress with castor oil on the affected area. This is a traditional Ayurvedic remedy that might provide relief.",
  "Your symptoms might benefit from nasya therapy - applying medicated oil to the nasal passages. Would you like to know more about this?",
  "I recommend increasing your intake of warm, cooked foods and reducing cold, raw foods to help balance your doshas.",
  "Meditation and pranayama (breathing exercises) could help manage the stress that might be contributing to your symptoms.",
];

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm AyushAI, your Ayurvedic health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      // Get a random response from the predefined list
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Format timestamp to HH:MM
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Chat with AyushAI</h1>

        {/* Card-like container */}
        <div className="border border-green-200 rounded-lg bg-white">
          {/* Chat messages */}
          <div className="h-[500px] overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                      message.sender === "user" ? "bg-green-100 ml-2" : "bg-amber-100"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <span className="text-green-600 text-sm font-bold">U</span>
                    ) : (
                      <span className="text-amber-600 text-sm font-bold">B</span>
                    )}
                  </div>
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-green-600 text-white rounded-tr-none"
                          : "bg-amber-50 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bot typing indicator */}
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

          {/* Input area */}
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
                ➡️
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Note: This is a demo chatbot. In a real application, responses would be generated by an AI trained on
              Ayurvedic principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}