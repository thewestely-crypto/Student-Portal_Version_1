import { Video, Microscope, PenTool, Lightbulb, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
  Video: Video,
  Microscope: Microscope,
  PenTool: PenTool,
  Lightbulb: Lightbulb
};

const typeGradients = {
  Watch: 'from-blue-500 via-purple-500 to-pink-500',
  Explore: 'from-green-400 via-teal-500 to-cyan-500',
  Practice: 'from-orange-400 via-red-500 to-pink-600',
  Curiosity: 'from-yellow-400 via-amber-500 to-orange-500'
};

const completedGradient = 'from-gray-600 via-gray-700 to-gray-800';

export default function FloatingActivityIcon({ item, isCompleted, onClick, position }) {
  const Icon = iconMap[item.icon] || Video;
  const gradient = isCompleted ? completedGradient : typeGradients[item.type];

  return (
    <div 
      className="absolute z-20 pointer-events-auto"
      style={position}
    >
      <Button
        onClick={onClick}
        className={`
          relative group
          w-16 h-16 rounded-full p-0
          bg-gradient-to-br ${gradient}
          border-2 ${isCompleted ? 'border-gray-500' : 'border-white/30'}
          shadow-2xl
          ${isCompleted ? '' : 'animate-pulse-glow hover:scale-110'}
          transition-all duration-300
          cursor-pointer
        `}
      >
        {/* Icon */}
        <Icon className={`w-7 h-7 text-white ${isCompleted ? 'opacity-60' : ''}`} />
        
        {/* Checkmark for completed */}
        {isCompleted && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        
        {/* Glow effect for uncompleted */}
        {!isCompleted && (
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-50 blur-xl group-hover:opacity-75 transition-opacity`} />
        )}
      </Button>
      
      {/* Duration label with dark background */}
      <div className={`
        mt-2 mx-auto w-fit px-2 py-1 rounded-full
        text-center text-xs font-bold
        ${isCompleted 
          ? 'text-gray-400 bg-gray-800/60' 
          : 'text-white bg-black/70'
        }
        backdrop-blur-sm
      `}>
        {item.duration}
      </div>
    </div>
  );
}
