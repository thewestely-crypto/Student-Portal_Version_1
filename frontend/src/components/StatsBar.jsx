import { Card, CardContent } from '@/components/ui/card';
import { Flag, Flame, Diamond, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StatsBar({ totalXP = 0 }) {
  const baseGems = 505;
  const currentGems = baseGems + totalXP;
  const [animateGems, setAnimateGems] = useState(false);
  const [xpIncrement, setXpIncrement] = useState(0);

  // Trigger animation when totalXP changes
  useEffect(() => {
    if (totalXP > 0) {
      setAnimateGems(true);
      setXpIncrement(totalXP);
      const timer = setTimeout(() => {
        setAnimateGems(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [totalXP]);

  const stats = [
    { icon: Flag, value: 2, label: 'Lessons', gradient: 'from-blue-400 via-blue-500 to-blue-600', shine: false },
    { icon: Flame, value: 2, label: 'Day Streak', gradient: 'from-orange-400 via-orange-500 to-red-500', shine: false },
    { icon: Diamond, value: currentGems, label: 'Gems', gradient: 'from-purple-400 via-fuchsia-500 to-pink-500', shine: true },
    { icon: Heart, value: 5, label: 'Lives', gradient: 'from-pink-400 via-rose-500 to-rose-600', shine: false },
  ];

  return (
    <Card className="bg-gradient-to-r from-[hsl(var(--card-bg))] to-[hsl(var(--card-bg))]/80 border-[hsl(var(--card-border))] overflow-hidden shadow-lg">
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isGems = stat.label === 'Gems';
            return (
              <div
                key={index}
                className="relative group cursor-pointer flex items-center gap-2"
              >
                {/* Icon with gradient background */}
                <div className={`relative w-9 h-9 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${stat.shine || (isGems && animateGems) ? 'animate-pulse' : ''} ${isGems && animateGems ? 'scale-125' : ''}`}>
                  <Icon className={`w-4 h-4 text-white drop-shadow-lg ${stat.shine || (isGems && animateGems) ? 'animate-pulse' : ''}`} />
                  
                  {/* Sparkle effect for Gems */}
                  {stat.shine && (
                    <>
                      <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-yellow-300 animate-pulse" />
                      <Sparkles className="absolute -bottom-0.5 -left-0.5 w-2 h-2 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                  
                  {/* Inner glow on hover */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300`} />
                </div>
                
                {/* Value only (no label) */}
                <div className={`text-lg font-bold text-foreground drop-shadow-sm transition-all duration-300 ${isGems && animateGems ? 'scale-125 text-yellow-400' : ''}`}>
                  {stat.value}
                </div>
                
                {/* XP increment badge */}
                {isGems && animateGems && xpIncrement > 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
                    +{xpIncrement}
                  </div>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 -z-10 blur-xl" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
