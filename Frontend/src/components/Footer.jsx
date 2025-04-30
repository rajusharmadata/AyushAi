import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"; // adjust path as needed
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">About AyushAI</h3>
            <p className="text-sm text-gray-600">
              AyushAI combines ancient Ayurvedic wisdom with modern AI technology to provide personalized health
              recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-amber-800">Home</Link></li>
              <li><Link to="/chat" className="text-sm text-gray-600 hover:text-amber-800">Chat with AyushAI</Link></li>
              <li><Link to="/remedies" className="text-sm text-gray-600 hover:text-amber-800">Ayurvedic Remedies</Link></li>
              <li><Link to="/practitioners" className="text-sm text-gray-600 hover:text-amber-800">Find Practitioners</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-amber-800">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-amber-800">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-gray-600 hover:text-amber-800">Medical Disclaimer</Link></li>
            </ul>
          </div>

          {/* Language Selector */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">Language</h3>
            <div>
              <Button variant="outline" className="w-full justify-start text-gray-600 border-gray-300">
                <Globe className="mr-2 h-4 w-4" />
                <span>English</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} AyushAI. All rights reserved.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-green-200">
          <p className="text-xs text-gray-500 text-center">
            Disclaimer: AyushAI is not a substitute for professional medical advice, diagnosis, or treatment. Always
            seek the advice of your physician or other qualified health provider with any questions you may have
            regarding a medical condition.
          </p>
        </div>
      </div>
    </footer>
  );
}
