import React from "react";
import { Globe, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Since we can't use react-router-dom in this demo, let's use regular anchor tags
  // In your actual implementation, replace these with Link components
  
  return (
    <footer className="bg-green-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-100">About AyushAI</h3>
            <p className="text-green-200">
              AyushAI combines ancient Ayurvedic wisdom with modern AI technology to provide personalized health
              recommendations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Home
                </a>
              </li>
              <li>
                <a href="/chat" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Chat with AyushAI
                </a>
              </li>
              <li>
                <a href="/remedies" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Ayurvedic Remedies
                </a>
              </li>
              <li>
                <a href="/practitioners" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Find Practitioners
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-100">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Privacy Policy
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="/contact" className="text-green-200 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span>Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Language */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-100">Stay Connected</h3>
            <p className="text-green-200">Subscribe to our newsletter for Ayurvedic tips and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md text-green-800 focus:outline-none"
              />
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
            
            <div className="pt-4">
              <h4 className="text-green-100 font-medium mb-2">Language</h4>
              <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 px-3 py-2 rounded-md transition-colors">
                <Globe size={16} />
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-green-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-300 text-sm">
              © {currentYear} AyushAI. All rights reserved.
            </p>
            
            {/* Disclaimer */}
            <p className="text-green-400 text-xs mt-2 md:mt-0 text-center md:text-right max-w-lg">
              AyushAI is not a substitute for professional medical advice. Always
              consult with qualified health providers regarding medical conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}