import { useState } from "react";
import RemedyCard from "../components/RemedyCard";
import { FiSearch, FiHeart, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

// Enhanced sample data with more details
const remedies = [
  {
    id: "1",
    name: "Turmeric Milk (Golden Milk)",
    description: "A soothing drink that helps reduce inflammation and supports the immune system.",
    ingredients: ["Turmeric powder", "Milk", "Black pepper", "Honey", "Cinnamon"],
    instructions: "Heat milk, add turmeric, black pepper, and cinnamon. Simmer for 5 minutes. Add honey to taste.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata", "kapha"],
    likes: 124,
    duration: "10 mins",
    difficulty: "Easy",
    category: "Digestion"
  },

  {
    id: "2",
    name: "Ginger Tea",
    description: "Helps with digestion, nausea, and cold symptoms. A warming remedy for Vata and Kapha imbalances.",
    ingredients: ["Fresh ginger", "Water", "Lemon", "Honey", "Cinnamon stick"],
    instructions: "Boil water with sliced ginger for 10 minutes. Add lemon juice and honey to taste.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata", "kapha"],
    likes: 98,
    duration: "15 mins",
    difficulty: "Easy",
    category: "Immunity"
  },
  {
    id: "3",
    name: "Turmeric Milk (Golden Milk)",
    description: "A soothing drink that helps reduce inflammation and supports the immune system.",
    ingredients: ["Turmeric powder", "Milk", "Black pepper", "Honey", "Cinnamon"],
    instructions: "Heat milk, add turmeric, black pepper, and cinnamon. Simmer for 5 minutes. Add honey to taste.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata", "kapha"],
    likes: 124,
    duration: "10 mins",
    difficulty: "Easy",
    category: "Digestion"
  },
  {
    id: "4",
    name: "Turmeric Milk (Golden Milk)",
    description: "A soothing drink that helps reduce inflammation and supports the immune system.",
    ingredients: ["Turmeric powder", "Milk", "Black pepper", "Honey", "Cinnamon"],
    instructions: "Heat milk, add turmeric, black pepper, and cinnamon. Simmer for 5 minutes. Add honey to taste.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata", "kapha"],
    likes: 124,
    duration: "10 mins",
    difficulty: "Easy",
    category: "Digestion"
  },
  // Add more remedies here...
];

export default function Remedies() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter remedies based on search term
  const filteredRemedies = remedies.filter(remedy => 
    remedy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Discover Natural Healing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our collection of authentic Ayurvedic remedies for various health concerns
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search remedies..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {remedies.map((remedy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <FiHeart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{remedy.category}</h3>
              <p className="text-sm text-gray-600">
                {remedies.filter(r => r.category === remedy.category).length} remedies
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Remedies Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRemedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <RemedyCard
                {...remedy}
                duration={remedy.duration}
                difficulty={remedy.difficulty}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRemedies.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 mb-4">
              <FiSearch className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Remedies Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search term to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
