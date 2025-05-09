import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToVideo = () => {
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">DigiLocker</span> Tutorial
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Learn how to use DigiLocker efficiently with our step-by-step video tutorial.
            Master the digital document management system trusted by millions.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={scrollToVideo}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Watch Tutorial
            </button>
            <a 
              href="#key-points" 
              className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              View Key Points
            </a>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button 
            onClick={scrollToVideo}
            className="animate-bounce p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all"
            aria-label="Scroll down"
          >
            <ArrowDown className="text-blue-600 dark:text-blue-400" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;