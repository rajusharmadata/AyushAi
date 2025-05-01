import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    dob: user.dob || "",
    address: user.address || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log("Updated profile:", formData);
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name || "User"}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-400" />
            <p className="text-gray-700">{user.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-gray-400" />
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="text-gray-400" />
            <p className="text-gray-700">{user.phone}</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendar className="text-gray-400" />
            <p className="text-gray-700">{user.dob}</p>
          </div>
          <div className="col-span-2 flex items-center space-x-3">
            <FaMapMarkerAlt className="text-gray-400" />
            <p className="text-gray-700">{user.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;