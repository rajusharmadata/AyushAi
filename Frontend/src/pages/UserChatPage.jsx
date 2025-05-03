import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../pages/Chat';
import axios from 'axios';

const UserChatPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/chat/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow-md h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-amber-800">AyushAI</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Welcome, {user.username}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Chat with AyushAI</h2>
          <Chat messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default UserChatPage;
