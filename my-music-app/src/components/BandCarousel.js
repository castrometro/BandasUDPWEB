import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BandCarousel = ({ bandas }) => {
  const [currentBandIndex, setCurrentBandIndex] = useState(0);

  const handlePrevBand = () => {
    setCurrentBandIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : bandas.length - 3
    );
  };

  const handleNextBand = () => {
    setCurrentBandIndex((prevIndex) => 
      prevIndex < bandas.length - 3 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-300 ease-in-out"
        style={{ 
          transform: `translateX(-${currentBandIndex * (100 / 3)}%)`,
          width: `${(bandas.length * 100) / 3}%`
        }}
      >
        {bandas.map((banda, index) => (
          <div key={index} className="w-full sm:w-1/3 flex-shrink-0 px-2">
            <div className="h-24 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-800 font-medium">{banda}</span>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={handlePrevBand}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
        aria-label="Previous band"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button 
        onClick={handleNextBand}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
        aria-label="Next band"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default BandCarousel;