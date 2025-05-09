import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';

const SocialShare = () => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const title = "DigiLocker Tutorial - Learn to use DigiLocker efficiently";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center">
            <Share2 size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            Share This Tutorial
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Found this tutorial helpful? Share it with others who might benefit!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            
            <a 
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} />
              <span className="hidden sm:inline">Twitter</span>
            </a>
            
            <a 
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Copy link"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialShare;