import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Activity, Users, LogOut, User, ChevronDown } from "lucide-react";
import AyushAI from "../assets/Ayushai.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    checkUserLoggedIn();
    
    // Add scroll event listener with throttling
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
          lastScrollY = window.scrollY;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Close profile dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  // Function to check if user is logged in
  const checkUserLoggedIn = () => {
    // Check localStorage for authentication token or user data
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token) {
      setIsLoggedIn(true);
      
      // If user data exists, get the username and email
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUsername(user.name || user.username || "User");
          setUserEmail(user.email || "user@example.com");
        } catch (error) {
          setUsername("User");
          setUserEmail("user@example.com");
        }
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setUserEmail("");
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
    setUserEmail("");
    setIsProfileDropdownOpen(false);
    
    // Close menu
    setIsMenuOpen(false);
    
    // Redirect to home page
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Get the first letter of the email for the avatar
  const getAvatarLetter = () => {
    if (userEmail && userEmail.length > 0) {
      return userEmail[0].toUpperCase();
    }
    return "U";
  };

  // Generate a consistent background color based on the email
  const getAvatarBgColor = () => {
    if (!userEmail) return "bg-green-500";
    
    // Simple hash function to get a consistent color
    let hash = 0;
    for (let i = 0; i < userEmail.length; i++) {
      hash = userEmail.charCodeAt(i) + ((hash << 5) - hash);
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

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Remedies", href: "/remedies", icon: Activity },
    { name: "Practitioners", href: "/practitioners", icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-gradient-to-r from-white/95 to-green-50/95 backdrop-blur-md shadow-lg py-2" 
            : "bg-gradient-to-r from-white/90 to-green-50/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center group">
              <div className="overflow-hidden rounded-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg">
                <img src={AyushAI} alt="AyushAi logo" className="h-12 md:h-14" />
              </div>
              <Link to="/" className="flex items-center ml-2">
                <span className="text-3xl md:text-4xl font-bold transition-all duration-500 tracking-tight">
                  <span className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 bg-clip-text text-transparent drop-shadow-sm">
                    Ayush
                  </span>
                  <span className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
                    AI
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-lg font-medium transition-all duration-300 px-4 py-2 rounded-lg overflow-hidden group ${
                    isActive(link.href)
                      ? "text-amber-800 bg-gradient-to-r from-amber-50 to-amber-100 shadow-sm"
                      : "text-gray-700 hover:text-amber-800 hover:bg-amber-50/70"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <link.icon className={`h-5 w-5 ${isActive(link.href) ? "text-amber-600" : "text-gray-500 group-hover:text-amber-600"}`} />
                    <span>{link.name}</span>
                  </div>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-amber-600 to-amber-400 scale-x-100"
                      : "bg-gradient-to-r from-amber-600 to-amber-400 scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Desktop Login/Signup Buttons or User Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative profile-dropdown">
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-3 px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/70 group border border-transparent hover:border-gray-200 hover:shadow-sm"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg shadow-md ${getAvatarBgColor()} transition-transform duration-300 group-hover:scale-105`}>
                      {getAvatarLetter()}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">{username}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{userEmail}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 animate-fadeIn z-50">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center space-x-2">
                        <User className="h-4 w-4 text-green-600" />
                        <span>My Profile</span>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <button className="relative overflow-hidden border border-green-500 text-green-600 px-6 py-2 rounded-md transition-all duration-300 hover:shadow-md hover:bg-green-50 group">
                      <span className="relative z-10 font-medium">Login</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </button>
                  </Link>
                  <Link to="/Signup">
                    <button className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:shadow-lg group">
                      <span className="relative z-10 font-medium">Sign Up</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-medium shadow-md ${getAvatarBgColor()}`}
                    onClick={toggleMenu}
                  >
                    {getAvatarLetter()}
                  </div>
                  <button 
                    onClick={toggleMenu} 
                    aria-label="Toggle menu"
                    className="p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors duration-300 border border-gray-200 shadow-sm"
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5 text-amber-700" />
                    ) : (
                      <Menu className="h-5 w-5 text-green-600" />
                    )}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={toggleMenu} 
                  aria-label="Toggle menu"
                  className="p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors duration-300 border border-gray-200 shadow-sm"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5 text-amber-700" />
                  ) : (
                    <Menu className="h-5 w-5 text-green-600" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu with slide-down animation */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen 
                ? 'max-h-screen opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-4'
            }`}
          >
            <div className="py-4 space-y-2 border-t border-green-100 mt-3 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
              {/* User Info for Mobile (when logged in) */}
              {isLoggedIn && (
                <div className="flex items-center space-x-3 px-4 py-3 mb-2 border-b border-green-100">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-xl shadow-md ${getAvatarBgColor()}`}>
                    {getAvatarLetter()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{username}</p>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">{userEmail}</p>
                  </div>
                </div>
              )}
              
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center space-x-3 mx-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-amber-800 bg-gradient-to-r from-amber-50 to-amber-100 font-medium shadow-sm"
                      : "text-gray-700 hover:text-amber-800 hover:bg-amber-50/70"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className={`h-5 w-5 ${isActive(link.href) ? "text-amber-600" : "text-gray-500"}`} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              
              {/* Profile link for mobile when logged in */}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 mx-2 px-4 py-3 rounded-lg transition-all duration-300 text-gray-700 hover:text-amber-800 hover:bg-amber-50/70"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">My Profile</span>
                </Link>
              )}
              
              {/* Auth Buttons (Mobile) */}
              <div className="mt-4 pt-4 border-t border-green-100 space-y-3 px-4">
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 relative overflow-hidden border border-red-500 text-red-600 hover:bg-red-50 w-full py-2.5 rounded-lg transition-all duration-300 group shadow-sm"
                  >
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span className="relative z-10 font-medium">Logout</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="block w-full">
                      <button className="relative overflow-hidden border border-green-500 text-green-600 hover:bg-green-50 w-full py-2.5 rounded-lg transition-all duration-300 group shadow-sm">
                        <span className="relative z-10 font-medium">Login</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>
                    </Link>
                    <Link to="/signup" className="block w-full">
                      <button className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white w-full py-2.5 rounded-lg transition-all duration-300 group shadow-sm">
                        <span className="relative z-10 font-medium">Sign Up</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Extra space to prevent content from hiding under the fixed navbar */}
      <div className={`${isScrolled ? 'h-16' : 'h-24'} transition-all duration-500`}></div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}