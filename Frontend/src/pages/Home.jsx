
/* Home.jsx - Home page component for a React.js project, showcasing AyushAI features with hero, features, testimonials, and CTA sections. Uses Tailwind CSS for styling and react-router-dom for navigation. */
 // Importing an image for the hero sectiona
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              Your Personal Ayurvedic Health Assistant
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              AyushAI combines ancient Ayurvedic wisdom with modern AI technology to provide personalized health
              recommendations based on your symptoms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2">
                <Link to="/chat">Try the Chatbot</Link>
              </button>
              <button className="border-green-600 text-green-600 hover:bg-green-50 rounded-md px-4 py-2 border">
                <Link to="/remedies">Explore Remedies</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-green-50 rounded-xl my-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">How AyushAI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Share Your Symptoms</h3>
              <p className="text-gray-600">
                Tell our AI chatbot about your health concerns and symptoms in simple language.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Get Ayurvedic Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your symptoms according to Ayurvedic principles and dosha types.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Receive Recommendations</h3>
              <p className="text-gray-600">Get personalized remedy suggestions, lifestyle tips, and dietary advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-50 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              "AyushAI helped me understand my digestive issues from an Ayurvedic perspective and suggested simple
              remedies that actually worked!"
            </p>
            <p className="font-semibold text-amber-800">- Priya S.</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              "I've been struggling with sleep issues for years. The personalized recommendations from AyushAI have made
              a significant difference in my sleep quality."
            </p>
            <p className="font-semibold text-amber-800">- Rahul M.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white rounded-xl my-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Ayurvedic Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create an account to save your consultations, track your progress, and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 rounded-md px-4 py-2">
              <Link to="/sinup">Sign Up Now</Link>
            </button>
            <button className="border-white text-white hover:bg-green-700 rounded-md px-4 py-2 border">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
