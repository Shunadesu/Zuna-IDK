'use client';

import { useEffect, useRef, useState } from 'react';
import { useSceneStore } from '../hooks/useSceneStore';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentScene } = useSceneStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current && currentScene) {
      audioRef.current.src = currentScene.music;
      audioRef.current.load();
      
      // Tự động phát nhạc khi chuyển cảnh
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Auto-play was prevented:', error);
        });
      }
    }
  }, [currentScene]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!currentScene) return null;

  // Lấy tên nhạc từ URL
  const getMusicName = (url: string) => {
    const fileName = url.split('/').pop()?.split('.')[0] || 'Unknown';
    const musicNames: { [key: string]: string } = {
      'bell-ringing-05': 'Tiếng Chuông Rừng',
      'ocean-wave-1': 'Sóng Biển',
      'city-traffic-1': 'Nhịp Đô Thị',
      'space-ambience-1': 'Không Gian Vũ Trụ'
    };
    return musicNames[fileName] || fileName;
  };

  return (
    <div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md rounded-xl p-4 text-white z-50 border border-white/20 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${currentScene.color.replace('linear-gradient(135deg, ', '').replace(' 100%)', '')} / 0.8)`,
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
          )}
        </button>
        
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            <span className="text-sm font-medium truncate">
              {getMusicName(currentScene.music)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-white/60 w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} loop />
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
} 