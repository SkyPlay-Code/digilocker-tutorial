import { useState, useEffect, RefObject } from 'react';

export const useVideoPlayer = (
  videoRef: RefObject<HTMLVideoElement>,
  videoContainerRef: RefObject<HTMLDivElement>
) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    volume: 50,
    isMuted: false,
    quality: 'Auto',
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    playerState.isPlaying ? video.play().catch(() => {}) : video.pause();
  }, [playerState.isPlaying, videoRef]);

  const handleOnTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const progress = (video.currentTime / video.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const manualChange = Number(event.target.value);
    video.currentTime = (video.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const volume = Number(event.target.value);
    video.volume = volume / 100;
    setPlayerState({
      ...playerState,
      volume,
      isMuted: volume === 0,
    });
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = playerState.isMuted;
  }, [playerState.isMuted, videoRef]);

  const handlePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    } else {
      container.requestFullscreen().catch(err => {
        console.error(`Error attempting to request fullscreen: ${err.message}`);
      });
    }
  };

  const handleVideoQuality = (quality: string) => {
    // In a real implementation, you'd switch the video source to a different quality
    // For now, we'll just update the UI state
    setPlayerState({
      ...playerState,
      quality,
    });
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVolumeChange,
    toggleMute,
    handlePlaybackSpeed,
    toggleFullscreen,
    handleVideoQuality
  };
};