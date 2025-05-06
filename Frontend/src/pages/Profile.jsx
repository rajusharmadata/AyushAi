import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Save, AlertCircle, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";

// Simple UI components to match the app's style
const Card = {
  Root: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  ),
  Header: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  ),
  Title: ({ children, className }) => (
    <h2 className={className}>
      {children}
    </h2>
  ),
  Content: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  ),
  Footer: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  )
};

const Input = ({ id, type, placeholder, value, onChange, className, disabled }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${className} ${disabled ? 'bg-gray-100' : ''}`}
  />
);

const Button = ({ children, type, className, disabled, onClick, icon }) => (
  <button
    type={type || "button"}
    className={`flex items-center justify-center px-4 py-2 rounded-md transition-all duration-300 ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);

const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium ${className || 'text-green-700'} mb-1`}>
    {children}
  </label>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    bio: ""
  });

  // Avatar display with the first letter of the user's email
  const getAvatarLetter = () => {
    if (user && user.email && user.email.length > 0) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Generate a background color based on the email
  const getAvatarBgColor = () => {
    if (!user || !user.email) return "bg-green-500";
    
    // Simple hash function to get a consistent color
    let hash = 0;
    for (let i = 0; i < user.email.length; i++) {
      hash = user.email.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // List of background color classes
    const bgColors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", 
      "bg-amber-500", "bg-emerald-500", "bg-indigo-500",
      "bg-pink-500", "bg-teal-500", "bg-cyan-500"
    ];
    
    // Use the hash to select a color
    const colorIndex = Math.abs(hash) % bgColors.length;
    return bgColors[colorIndex];
  };

  // Check auth and fetch user data when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserProfile(token);
  }, [navigate]);

  // Fetch user profile data from backend
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('https://ayushai-1.onrender.com/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userData = response.data;
      setUser(userData);
      
      // Initialize form with user data
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        dateOfBirth: userData.dateOfBirth || "",
        bio: userData.bio || ""
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      // If backend request fails, try loading from localStorage as fallback
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (localUser.email) {
        setUser(localUser);
        setFormData({
          name: localUser.name || "",
          email: localUser.email || "",
          phone: localUser.phone || "",
          address: localUser.address || "",
          dateOfBirth: localUser.dateOfBirth || "",
          bio: localUser.bio || ""
        });
      } else {
        setError("Failed to load profile. Please try logging in again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError("");
    setSuccess("");
    setSaving(true);
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error. Please log in again.");
      setSaving(false);
      return;
    }

    try {
      const response = await axios.put(
        'https://ayushai-1.onrender.com/api/users/profile',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local storage with new user data
      localStorage.setItem('user', JSON.stringify({
        ...JSON.parse(localStorage.getItem('user') || "{}"),
        ...formData
      }));

      setUser(response.data);
      setSuccess("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Go back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-lg text-green-800">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button 
          onClick={handleBack}
          className="mb-6 text-green-700 hover:bg-green-100 rounded-full p-2"
          icon={<ArrowLeft className="h-5 w-5" />}
        >
          Back
        </Button>

        <Card.Root className="bg-white shadow-lg rounded-2xl border border-green-200 overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-green-500 to-emerald-400">
            <div className="absolute -bottom-16 left-6 flex items-end">
              <div className={`w-32 h-32 rounded-full border-4 border-white ${getAvatarBgColor()} flex items-center justify-center text-white text-5xl font-medium shadow-lg`}>
                {getAvatarLetter()}
              </div>
              <div className="ml-4 mb-4">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">
                  {user?.name || "Your Profile"}
                </h1>
                <p className="text-emerald-100">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <Card.Content className="pt-20 px-6 pb-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="ml-3 text-sm text-green-700">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="your.email@example.com"
                        disabled={true} // Email should not be editable
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Address
                </h2>
                
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[80px]"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  About Me
                </h2>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px]"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-2.5 font-medium shadow-md hover:shadow-lg"
                  disabled={saving}
                  icon={saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  );
}