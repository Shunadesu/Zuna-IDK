'use client';

import { useEffect, useState } from 'react';
import { useSceneStore } from '../hooks/useSceneStore';
import { getSceneById } from '../data/scenes';

export default function SceneTransition() {
  const { currentSceneId } = useSceneStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Bắt đầu hiệu ứng chuyển cảnh
    setIsAnimating(true);
    setIsVisible(true);

    // Sau khi fade in xong, bắt đầu fade out
    const fadeInTimer = setTimeout(() => {
      setIsVisible(false);
    }, 600); // Fade in chậm hơn trong 600ms

    // Kết thúc hiệu ứng chuyển cảnh
    const fadeOutTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 1200); // Tổng thời gian 1200ms - chậm và nhẹ nhàng

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [currentSceneId]);

  if (!isAnimating) return null;

  const currentScene = getSceneById(currentSceneId);
  const sceneColor = currentScene?.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Overlay sử dụng màu của cảnh hiện tại với opacity rất thấp */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: sceneColor,
          opacity: 0.15,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }}
      />
      
      {/* Hiệu ứng ánh sáng nhẹ nhàng */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
            animation: 'gentlePulse 3s ease-in-out infinite'
          }}
        />
        
        {/* Các tia sáng nhẹ nhàng */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{
              left: `${(i + 1) * 25}%`,
              animation: `gentleSlide 2.5s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.01); }
        }
        
        @keyframes gentleSlide {
          0% { transform: translateY(-30%); opacity: 0; }
          50% { opacity: 0.1; }
          100% { transform: translateY(30%); opacity: 0; }
        }
      `}</style>
    </div>
  );
} 