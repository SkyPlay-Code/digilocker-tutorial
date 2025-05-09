import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold text-blue-400">DigiLocker</span>
            <p className="mt-2 text-gray-400 text-sm max-w-md">
              DigiLocker is a secure digital document storage platform that allows users to store, 
              access, and share their important documents anytime, anywhere.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Resources</h2>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Tutorials</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Contact</h2>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-400 transition-colors">Feedback</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-6 border-gray-700" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-gray-400">
            © {currentYear} DigiLocker. All rights reserved.
          </span>
          
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">YouTube</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;