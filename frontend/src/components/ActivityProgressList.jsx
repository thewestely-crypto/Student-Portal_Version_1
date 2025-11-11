import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Microscope, PenTool, Lightbulb, Check, ArrowRight, Circle } from 'lucide-react';

const iconMap = {
  Watch: Video,
  Explore: Microscope,
  Practice: PenTool,
  Curiosity: Lightbulb
};

const typeColors = {
  Watch: 'from-blue-500 to-purple-600',
  Explore: 'from-green-500 to-teal-600',
  Practice: 'from-orange-500 to-red-600',
  Curiosity: 'from-yellow-500 to-amber-600'
};

export default function ActivityProgressList({ items, currentIndex, completedItems }) {
  return (
    <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Learning Pack Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => {
          const Icon = iconMap[item.type];
          const isCompleted = completedItems[item.id];
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          const gradient = typeColors[item.type];

          return (
            <div
              key={item.id}
              className={`
                flex items-start gap-3 p-3 rounded-lg transition-all duration-300
                ${isCurrent ? 'bg-[hsl(var(--primary))]/20 border-2 border-[hsl(var(--primary))]' : 'bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))]'}
                ${isCompleted ? 'opacity-70' : ''}
              `}
            >
              {/* Status Indicator */}
              <div className="flex-shrink-0 mt-1">
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center animate-pulse">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                    <Circle className="w-3 h-3 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className={`
                flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${gradient} 
                flex items-center justify-center shadow-md
                ${isUpcoming ? 'opacity-50' : ''}
              `}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`
                  font-bold text-sm leading-tight mb-1
                  ${isCurrent ? 'text-white' : isCompleted ? 'text-gray-400' : 'text-gray-300'}
                `}>
                  {item.title}
                </h4>
                <p className={`
                  text-xs
                  ${isCurrent ? 'text-gray-200' : 'text-gray-500'}
                `}>
                  {item.duration}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
