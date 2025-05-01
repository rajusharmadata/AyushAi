import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Profile from "../components/profile/profile";
import Dashboard from "../components/dashboard/Dashboard";
import axios from 'axios';

const UserDashboard = () => {
  const { userId } = useParams();
  const [activeSection, setActiveSection] = useState('chat');
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch user-specific data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}/profile`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchUserData();
    fetchDashboardData();
  }, [userId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-amber-800 mb-6">AyushAI</h1>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveSection('chat')}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg ${
                activeSection === 'chat' ? 'bg-gray-100' : ''
              }`}
            >
              <span className="text-gray-700">Chat</span>
            </button>
            <button 
              onClick={() => setActiveSection('profile')}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg ${
                activeSection === 'profile' ? 'bg-gray-100' : ''
              }`}
            >
              <span className="text-gray-700">Profile</span>
            </button>
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg ${
                activeSection === 'dashboard' ? 'bg-gray-100' : ''
              }`}
            >
              <span className="text-gray-700">Dashboard</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {activeSection === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Chat with AyushAI</h2>
              {/* Chat component will go here */}
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>
              {userData ? (
                <Profile user={userData} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading profile...</p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'dashboard' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard</h2>
              {dashboardData ? (
                <Dashboard data={dashboardData} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading dashboard...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;