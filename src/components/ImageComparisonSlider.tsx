import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleTouchStart = () => {
    setIsResizing(true);
  };

  const calculatePosition = (clientX: number) => {
    if (!sliderRef.current) return;

    const { left, width } = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    setPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (isResizing) {
        calculatePosition(clientX);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg select-none"
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {beforeLabel}
        </span>
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {afterLabel}
        </span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize select-none"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <MoveHorizontal className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;