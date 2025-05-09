import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import KeyPoints from './components/KeyPoints';
import SocialShare from './components/SocialShare';
import RelatedResources from './components/RelatedResources';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <VideoSection />
          <KeyPoints />
          <SocialShare />
          <RelatedResources />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;