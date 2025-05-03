import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import AyushAI from "../assets/Ayushai.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Function to check if user is logged in
  const checkUserLoggedIn = () => {
    // Check localStorage for authentication token or user data
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token) {
      setIsLoggedIn(true);
      
      // If user data exists, get the username
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUsername(user.name || user.username || "User");
        } catch (error) {
          setUsername("User");
        }
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Update state
    setIsLoggedIn(false);
    setUsername("");
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Redirect to home page
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Remedies", href: "/remedies" },
    { name: "Practitioners", href: "/practitioners" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ml-0">
            <img src={AyushAI} alt="AyushAi logo" className="h-12 rounded-2xl" />
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-green-600 mt-5">
                Ayush<span className="text-amber-600 mt-5">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-lg font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-amber-800 border-b-2 border-amber-800"
                    : "text-gray-600 hover:text-amber-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">{username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="border border-green-600 text-green-600 px-4 py-1 rounded hover:bg-green-50">
                    Login
                  </button>
                </Link>
                <Link to="/Signup">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium ${
                    isActive(link.href)
                      ? "text-amber-800 bg-amber-50 rounded-md"
                      : "text-gray-600 hover:text-amber-800 hover:bg-amber-50 rounded-md"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Auth Buttons (Mobile) */}
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2 px-4">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-2 mb-2 py-2">
                      <div className="bg-green-100 rounded-full p-1">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{username}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-800 w-full py-2 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="border border-green-600 text-green-600 hover:bg-green-50 w-full py-2 rounded">
                        Login
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
