
/* RemedyCard.jsx - Component to display an Ayurvedic remedy card with details like name, description, ingredients, doshas, likes, and a details link. Uses Tailwind CSS for styling and react-router-dom for navigation. */

import { Link } from "react-router-dom";

export default function RemedyCard({ id, name, description, ingredients, instructions, imageUrl, doshas, likes = 0 }) {
  return (
    <div className="border rounded-lg bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 w-full">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-amber-800">{name}</h3>
          <div className="flex space-x-1">
            {doshas.map((dosha) => (
              <span
                key={dosha}
                className={`
                  inline-block border text-xs px-2 py-1 rounded-full
                  ${dosha === "vata" ? "border-blue-500 text-blue-500" : ""}
                  ${dosha === "pitta" ? "border-red-500 text-red-500" : ""}
                  ${dosha === "kapha" ? "border-green-500 text-green-500" : ""}
                `}
              >
                {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <div className="mb-2">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Key Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {ingredients.length > 3 && (
              <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                +{ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between px-4 pb-4">
        <button className="border-green-600 text-green-600 hover:bg-green-50 rounded-md px-4 py-2 border">
          <Link to={`/remedies/${id}`}>View Details</Link>
        </button>
        <button className="flex items-center gap-1 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-md px-2 py-1">
          <span>❤️</span>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
