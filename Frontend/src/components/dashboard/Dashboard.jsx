import { useState, useEffect } from "react";
import { FaChartLine, FaCalendar, FaUser, FaBook } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    consultations: 0,
    upcomingAppointments: 0,
    completedSessions: 0,
    prescribedRemedies: 0
  });

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchData = async () => {
      try {
        // In a real application, you would fetch this data from your backend
        setStats({
          consultations: 15,
          upcomingAppointments: 3,
          completedSessions: 25,
          prescribedRemedies: 45
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Consultations</h3>
          <FaChartLine className="text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-600">{stats.consultations}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
          <FaCalendar className="text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-600">{stats.upcomingAppointments}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Completed Sessions</h3>
          <FaUser className="text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-600">{stats.completedSessions}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Prescribed Remedies</h3>
          <FaBook className="text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-600">{stats.prescribedRemedies}</p>
      </div>
    </div>
  );
};

export default Dashboard;
