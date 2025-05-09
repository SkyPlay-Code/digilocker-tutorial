import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  playerState: {
    isPlaying: boolean;
    progress: number;
    speed: number;
    volume: number;
    isMuted: boolean;
    quality: string;
  };
  togglePlay: () => void;
  handleVideoProgress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleMute: () => void;
  handlePlaybackSpeed: (speed: number) => void;
  toggleFullscreen: () => void;
  handleVideoQuality: (quality: string) => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  videoRef,
  playerState,
  togglePlay,
  handleVideoProgress,
  handleVolumeChange,
  toggleMute,
  handlePlaybackSpeed,
  toggleFullscreen,
  handleVideoQuality
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const controlsTimeout = useRef<number | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Update current time and duration displays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTimeDisplay = () => {
      setCurrentTime(formatTime(video.currentTime));
      setDuration(formatTime(video.duration));
    };

    video.addEventListener('loadedmetadata', updateTimeDisplay);
    video.addEventListener('timeupdate', updateTimeDisplay);

    return () => {
      video.removeEventListener('loadedmetadata', updateTimeDisplay);
      video.removeEventListener('timeupdate', updateTimeDisplay);
    };
  }, [videoRef]);

  // Handle controls visibility
  useEffect(() => {
    const showControls = () => {
      setIsControlsVisible(true);
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      if (playerState.isPlaying) {
        controlsTimeout.current = window.setTimeout(() => {
          if (!isSettingsOpen) {
            setIsControlsVisible(false);
          }
        }, 3000);
      }
    };

    const videoContainer = videoRef.current?.parentElement;
    if (videoContainer) {
      videoContainer.addEventListener('mousemove', showControls);
      videoContainer.addEventListener('mouseenter', showControls);
      videoContainer.addEventListener('mouseleave', () => {
        if (playerState.isPlaying && !isSettingsOpen) {
          setIsControlsVisible(false);
        }
      });
    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener('mousemove', showControls);
        videoContainer.removeEventListener('mouseenter', showControls);
        videoContainer.removeEventListener('mouseleave', () => {});
      }
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [playerState.isPlaying, isSettingsOpen, videoRef]);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300 ${
        isControlsVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Progress bar */}
      <div className="mb-2 relative group">
        <input
          type="range"
          min="0"
          max="100"
          value={playerState.progress}
          onChange={handleVideoProgress}
          className="w-full cursor-pointer appearance-none bg-gray-400 h-1 rounded-full outline-none transition-all"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${playerState.progress}%, rgba(255, 255, 255, 0.3) ${playerState.progress}%, rgba(255, 255, 255, 0.3) 100%)`
          }}
        />
        <div className="absolute -bottom-6 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Play/Pause button */}
          <button 
            onClick={togglePlay}
            className="text-white hover:text-blue-400 transition-colors" 
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Volume controls */}
          <div className="hidden sm:flex items-center space-x-1 group relative">
            <button 
              onClick={toggleMute}
              className="text-white hover:text-blue-400 transition-colors" 
              aria-label={playerState.isMuted ? 'Unmute' : 'Mute'}
            >
              {playerState.isMuted || playerState.volume === 0 ? 
                <VolumeX size={20} /> : 
                <Volume2 size={20} />
              }
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={playerState.isMuted ? 0 : playerState.volume}
              onChange={handleVolumeChange}
              className="w-0 group-hover:w-16 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer appearance-none bg-gray-500 h-1 rounded-full outline-none"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${playerState.isMuted ? 0 : playerState.volume}%, rgba(255, 255, 255, 0.3) ${playerState.isMuted ? 0 : playerState.volume}%, rgba(255, 255, 255, 0.3) 100%)`
              }}
            />
          </div>

          {/* Time display */}
          <div className="text-xs text-white">
            <span>{currentTime}</span>
            <span className="mx-1">/</span>
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Settings button */}
          <div className="relative" ref={settingsRef}>
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="text-white hover:text-blue-400 transition-colors" 
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            
            {isSettingsOpen && (
              <div className="absolute bottom-10 right-0 bg-gray-900 rounded-md shadow-lg overflow-hidden min-w-48">
                {/* Playback speed */}
                <div className="p-2">
                  <p className="text-xs text-gray-400 mb-1">Playback Speed</p>
                  <div className="grid grid-cols-3 gap-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => handlePlaybackSpeed(speed)}
                        className={`text-xs px-2 py-1 rounded ${
                          playerState.speed === speed 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {speed === 1 ? 'Normal' : `${speed}x`}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quality selection */}
                <div className="p-2 border-t border-gray-800">
                  <p className="text-xs text-gray-400 mb-1">Quality</p>
                  <div className="flex flex-col space-y-1">
                    {['Auto', '1080p', '720p', '480p', '360p'].map(quality => (
                      <button
                        key={quality}
                        onClick={() => handleVideoQuality(quality)}
                        className={`text-xs px-2 py-1 text-left rounded ${
                          playerState.quality === quality 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen button */}
          <button 
            onClick={toggleFullscreen}
            className="text-white hover:text-blue-400 transition-colors" 
            aria-label="Toggle fullscreen"
          >
            <Maximize size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;