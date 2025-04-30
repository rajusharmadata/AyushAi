import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Remedies", href: "/remedies" },
    { name: "Practitioners", href: "/practitioners" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">
              Ayush<span className="text-amber-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
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
            <Link to="/login">
              <button className="border border-green-600 text-green-600 px-4 py-1 rounded hover:bg-green-50">
                Login
              </button>
            </Link>
            <Link to="/sinup">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">
                Sign Up
              </button>
            </Link>
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
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2 px-4">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
