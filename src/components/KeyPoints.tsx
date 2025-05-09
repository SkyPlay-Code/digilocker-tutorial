import React, { useState, useRef } from 'react';
import { Clock } from 'lucide-react';

interface Timestamp {
  id: number;
  time: number;
  label: string;
  description: string;
}

const KeyPoints = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // In a real implementation, these would come from your data or CMS
  const timestamps: Timestamp[] = [
    { 
      id: 1, 
      time: 7, 
      label: 'Creating Your Account', 
      description: 'How to register and set up your DigiLocker account securely.' 
    },
    { 
      id: 2, 
      time: 21, 
      label: 'Find name', 
      description: 'Find your name in the list of users in given xl file' 
    },
    { 
      id: 3, 
      time: 30, 
      label: 'Access Code', 
      description: 'Access code is given in the list of users' 
    },
    { 
      id: 4, 
      time: 52, 
      label: 'Complete Registration', 
      description: 'Complete the registration process by entering the access code and confirming the details' 
    },
    { 
      id: 5, 
      time: 65, 
      label: 'Doing login', 
      description: 'Now you can login to your DigiLocker account' 
    },
    { 
      id: 6, 
      time: 76, 
      label: 'Chaning pin', 
      description: 'You can change your pin by clicking on the forgot pin button' 
    },
    { 
      id: 7, 
      time: 85, 
      label: 'Uploading Documents', 
      description: 'Step-by-step guide to uploading and organizing your documents.' 
    },
    { 
      id: 8, 
      time: 95, 
      label: 'Verifying OTP', 
      description: 'Enter the OTP sent to your mobile number to verify your account' 
    },
    { 
      id: 9, 
      time: 108, 
      label: 'Setting new pin', 
      description: 'Set a new pin for your account' 
    },
    { 
      id: 10, 
      time: 145, 
      label: 'Viewing issued documents section', 
      description: 'You can view the issued documents by clicking on the issued documents section' 
    }
  ];

  const handleTimestampClick = (time: number) => {
    // Find the video element in the DOM
    if (!videoRef.current) {
      videoRef.current = document.querySelector('video');
    }
    
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
      
      // Scroll to video section
      const videoSection = document.getElementById('video-section');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="key-points" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Key Points & Timestamps
          </h2>
          
          <div className="grid gap-4">
            {timestamps.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg transform hover:-translate-y-1"
              >
                <button 
                  onClick={() => handleTimestampClick(item.time)}
                  className="w-full text-left p-4 focus:outline-none"
                >
                  <div className="flex items-start md:items-center flex-col md:flex-row gap-3">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded">
                      <Clock size={16} className="mr-1" />
                      <span>{Math.floor(item.time / 60)}:{(item.time % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.label}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyPoints;