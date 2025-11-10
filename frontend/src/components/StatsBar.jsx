import { Flag, Flame, Shield, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StatsBar() {
  const stats = [
    { icon: Flag, value: 49, label: 'Lessons', bgColor: 'bg-blue-500/20', iconColor: 'text-blue-400' },
    { icon: Flame, value: 3, label: 'Day Streak', bgColor: 'bg-gray-500/20', iconColor: 'text-gray-400' },
    { icon: Shield, value: 505, label: 'Total XP', bgColor: 'bg-[hsl(var(--teal-vivid))]/20', iconColor: 'text-[hsl(var(--teal-vivid))]' },
    { icon: Heart, value: 5, label: 'Lives', bgColor: 'bg-red-500/20', iconColor: 'text-red-400' },
  ];

  return (
    <div className="flex items-center justify-end gap-4 px-6 py-4 border-b border-[hsl(var(--card-border))]">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Badge
            key={index}
            variant="outline"
            className="flex items-center gap-2 px-3 py-2 bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] hover:border-[hsl(var(--primary))] transition-all duration-300 cursor-pointer"
          >
            <div className={`p-1.5 rounded-lg ${stat.bgColor}`}>
              <Icon className={`w-4 h-4 ${stat.iconColor}`} />
            </div>
            <span className="font-bold text-foreground">{stat.value}</span>
          </Badge>
        );
      })}
    </div>
  );
}