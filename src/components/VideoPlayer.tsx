import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

interface VideoPlayerProps {
  src: string;
  poster: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [lastPlayedTime, setLastPlayedTime] = useState<number | null>(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVolumeChange,
    toggleMute,
    handlePlaybackSpeed,
    toggleFullscreen,
    handleVideoQuality
  } = useVideoPlayer(videoRef, videoContainerRef);

  // Auto-resume functionality
  useEffect(() => {
    const savedTime = localStorage.getItem('videoLastPlayedTime');
    if (savedTime) {
      setLastPlayedTime(parseFloat(savedTime));
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && lastPlayedTime !== null) {
      videoRef.current.currentTime = lastPlayedTime;
    }
  }, [lastPlayedTime]);

  // Save current time when unloading
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (videoRef.current) {
        localStorage.setItem('videoLastPlayedTime', videoRef.current.currentTime.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle buffering state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleLoaded = () => setIsBuffering(false);

    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('loadeddata', handleLoaded);

    return () => {
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('loadeddata', handleLoaded);
    };
  }, []);

  return (
    <div 
      ref={videoContainerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
    >
      <video
        ref={videoRef}
        onTimeUpdate={handleOnTimeUpdate}
        onClick={togglePlay}
        poster={poster}
        className="w-full h-full"
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Buffering indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="loader">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Overlay play button for better UX */}
      {!playerState.isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-40"
          aria-label="Play video"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-blue-600 bg-opacity-80 text-white transform transition-transform duration-300 hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </button>
      )}

      <VideoControls 
        videoRef={videoRef}
        playerState={playerState}
        togglePlay={togglePlay}
        handleVideoProgress={handleVideoProgress}
        handleVolumeChange={handleVolumeChange}
        toggleMute={toggleMute}
        handlePlaybackSpeed={handlePlaybackSpeed}
        toggleFullscreen={toggleFullscreen}
        handleVideoQuality={handleVideoQuality}
      />
    </div>
  );
};

export default VideoPlayer;