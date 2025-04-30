
/* Remedies.jsx - Remedies page component for a React.js project, displaying a searchable list of Ayurvedic remedies filtered by dosha. Uses Tailwind CSS for styling. */

import { useState } from "react";
import RemedyCard from "../components/RemedyCard";

// Sample data for remedies
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
  },
  {
    id: "3",
    name: "Triphala Mixture",
    description: "A traditional Ayurvedic formula that supports digestion and detoxification.",
    ingredients: ["Triphala powder", "Warm water", "Honey"],
    instructions: "Mix 1 teaspoon of Triphala powder in warm water. Add honey if desired. Drink before bed.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata", "pitta", "kapha"],
    likes: 156,
  },
  {
    id: "4",
    name: "Cooling Cucumber-Mint Drink",
    description: "A refreshing drink that helps cool Pitta dosha and reduce inflammation.",
    ingredients: ["Cucumber", "Fresh mint leaves", "Lime juice", "Water", "Honey"],
    instructions: "Blend cucumber, mint, lime juice, and water. Strain and add honey to taste.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["pitta"],
    likes: 87,
  },
  {
    id: "5",
    name: "Ashwagandha Tea",
    description: "Helps reduce stress and anxiety while boosting energy and immunity.",
    ingredients: ["Ashwagandha powder", "Water", "Milk", "Cardamom", "Honey"],
    instructions:
      "Simmer ashwagandha in water for 15 minutes. Add milk and cardamom, simmer for 5 more minutes. Add honey.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata"],
    likes: 112,
  },
  {
    id: "6",
    name: "Cumin-Coriander-Fennel Tea",
    description: "A digestive tea that helps with bloating, gas, and indigestion.",
    ingredients: ["Cumin seeds", "Coriander seeds", "Fennel seeds", "Water"],
    instructions: "Boil equal parts of all three seeds in water for 5 minutes. Strain and drink after meals.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    doshas: ["vata", "pitta", "kapha"],
    likes: 143,
  },
];

export default function Remedies() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Ayurvedic Remedies</h1>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="border rounded-lg bg-white p-6">
          <h2 className="text-xl font-semibold text-amber-800 mb-2">Find the Perfect Remedy</h2>
          <p className="text-gray-600 mb-4">
            Search our collection of traditional Ayurvedic remedies for various health concerns
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <span className="absolute left-2.5 top-2.5 text-gray-500">🔍</span>
              <input
                type="search"
                placeholder="Search remedies..."
                className="w-full rounded-md border border-gray-300 pl-8 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button className="border-green-600 text-green-600 hover:bg-green-50 rounded-md px-4 py-2 border flex items-center gap-2">
              <span>🛠️</span> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "all" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All Remedies
          </button>
          <button
            onClick={() => setActiveTab("vata")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "vata" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Vata
          </button>
          <button
            onClick={() => setActiveTab("pitta")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "pitta" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Pitta
          </button>
          <button
            onClick={() => setActiveTab("kapha")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "kapha" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Kapha
          </button>
        </div>
      </div>

      {/* Remedies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remedies
          .filter((remedy) => activeTab === "all" || remedy.doshas.includes(activeTab))
          .map((remedy) => (
            <RemedyCard key={remedy.id} {...remedy} />
          ))}
      </div>
    </div>
  );
}
