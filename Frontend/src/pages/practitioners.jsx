import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiMapPin, FiStar, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

// Sample data for practitioners
const practitioners = [
  // ... (existing practitioners data)
];

const PractitionerCard = ({ practitioner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* ... (existing PractitionerCard component) */}
    </motion.div>
  );
};

export default function Practitioners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  // Filter practitioners
  const filteredPractitioners = practitioners.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || practitioner.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || practitioner.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
    const matchesExperience = !selectedExperience || parseInt(practitioner.experience) >= parseInt(selectedExperience);
    
    return matchesSearch && matchesLocation && matchesSpecialization && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Find Ayurvedic Practitioners
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with experienced Ayurvedic practitioners for personalized healthcare
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search practitioners..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {/* Location Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="Enter city or area"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">All Specializations</option>
                <option value="panchakarma">Panchakarma Therapy</option>
                <option value="herbal">Herbal Medicine</option>
                <option value="yoga">Yoga Therapy</option>
                <option value="diet">Diet Consultation</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Any Experience</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
                <option value="15">15+ years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Practitioners */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">Featured Practitioners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPractitioners.map((practitioner) => (
            <PractitionerCard key={practitioner.id} practitioner={practitioner} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPractitioners.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 mb-4">
              <FiSearch className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Practitioners Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search filters to find practitioners.
            </p>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-amber-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ... (existing How It Works section) */}
        </div>
      </div>
    </div>
  );
}