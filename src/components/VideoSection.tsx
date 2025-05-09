import React from 'react';
import VideoPlayer from './VideoPlayer';
import videoFile from '../assets/Untitled video - Made with Clipchamp.mp4';

const VideoSection = () => {
  return (
    <section id="video-section" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Complete DigiLocker Tutorial
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-2 md:p-4 shadow-lg">
            <VideoPlayer 
              src={videoFile}
              poster="https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg"
            />
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              This comprehensive tutorial walks you through all the essential features of DigiLocker, 
              from account setup to managing your documents securely in the digital vault.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;