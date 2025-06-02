const VolCode = `

import React, { useRef, useState, useEffect } from 'react'
import { VolumeX, Volume1, Volume2 } from 'lucide-react'

interface VolumeSliderProps {
  initialVolume?: number
  onChange?: (volume: number) => void
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  initialVolume = 50,
  onChange,
}) => {
  const [volume, setVolume] = useState<number>(initialVolume)
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const prevVolume = useRef(initialVolume)
  const sliderRef = useRef<HTMLInputElement>(null)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setDragDirection(newVolume > prevVolume.current ? 'right' : 'left')
    prevVolume.current = newVolume
    setVolume(newVolume)
    if (onChange) onChange(newVolume)
  }

  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-6 w-6 text-red-500" />
    if (volume < 50) return <Volume1 className="h-6 w-6 text-yellow-400" />
    return <Volume2 className="h-6 w-6 text-green-500" />
  }

  // Calculate counter position with pull effect
  const getCounterPosition = () => {
    const basePosition = volume;
    if (!isDragging || !dragDirection) return basePosition;
    
    // Apply 5% pull effect in the opposite direction when dragging
    const pullAmount = 5;
    return dragDirection === 'right' 
      ? basePosition - pullAmount 
      : basePosition + pullAmount;
  };

  return (

    <div className="flex items-center gap-4 w-full max-w-xl p-4 bg-[#1a1a1d] rounded-2xl shadow-lg relative">
      {renderVolumeIcon()}

      <div className="relative w-full">
        {/* Floating Counter with pull effect */}
        <div
          className={\`absolute -top-8 transform -translate-x-1/2 transition-all duration-75 pointer-events-none \${isDragging ? 'scale-110' : 'scale-100'}\`}
          style={{
            left: \`\${getCounterPosition()}%\`,
          }}
        >
          <div className="bg-white text-black text-xs px-2 py-1 rounded-full shadow-lg font-semibold whitespace-nowrap">
            {volume}%
          </div>
          {/* Small pointer triangle */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        {/* Slider */}
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full accent-pink-500 cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-lg appearance-none 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-100
            [&::-webkit-slider-thumb]:hover:scale-125"
        />
      </div>
    </div>
  )
}

export default VolumeSlider

`

export default VolCode;
