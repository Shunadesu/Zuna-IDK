'use client';

import { useControlsStore } from '../hooks/useControlsStore';

export default function ControlsToggle() {
  const { isVisible, toggleVisibility } = useControlsStore();

  return (
    <button
      onClick={toggleVisibility}
      className="fixed top-4 left-4 z-[200] p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 group"
      title={isVisible ? "Ẩn điều khiển" : "Hiện điều khiển"}
    >
      <div className="relative w-6 h-6">
        {/* Icon khi controls đang hiển thị */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-6 h-6 text-white"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>
        
        {/* Icon khi controls đang ẩn */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isVisible ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
          }`}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-6 h-6 text-white"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {isVisible ? "Ẩn điều khiển" : "Hiện điều khiển"}
      </div>
    </button>
  );
} 