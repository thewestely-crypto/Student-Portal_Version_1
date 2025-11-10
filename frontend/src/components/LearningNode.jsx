import { Star, Lock, CheckCircle2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function LearningNode({ node, onClick, delay = 0 }) {
  const getNodeStyle = () => {
    switch (node.status) {
      case 'active':
        return {
          bg: 'bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))]',
          border: 'border-[hsl(var(--green-bright))]',
          shadow: 'shadow-2xl glow-green animate-pulse-glow',
          icon: Star,
          iconClass: 'text-[hsl(var(--main-bg))]',
        };
      case 'completed':
        return {
          bg: 'bg-[hsl(var(--card-bg))]',
          border: 'border-[hsl(var(--teal-vivid))]',
          shadow: 'shadow-lg',
          icon: CheckCircle2,
          iconClass: 'text-[hsl(var(--teal-vivid))]',
        };
      case 'available':
        return {
          bg: 'bg-[hsl(var(--card-bg))]',
          border: 'border-[hsl(var(--card-border))]',
          shadow: 'shadow-md',
          icon: Play,
          iconClass: 'text-[hsl(var(--primary))]',
        };
      case 'locked':
      default:
        return {
          bg: 'bg-[hsl(var(--locked-dark))]',
          border: 'border-[hsl(var(--locked-gray))]',
          shadow: 'shadow-sm',
          icon: Lock,
          iconClass: 'text-[hsl(var(--locked-gray))]',
        };
    }
  };

  const style = getNodeStyle();
  const Icon = style.icon;
  const isInteractive = node.status !== 'locked';

  return (
    <div
      className="relative"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={onClick}
        disabled={!isInteractive}
        className={cn(
          'relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-300',
          style.bg,
          style.border,
          style.shadow,
          isInteractive && 'hover:scale-110 hover-lift cursor-pointer',
          !isInteractive && 'cursor-not-allowed opacity-60'
        )}
      >
        <Icon className={cn('w-12 h-12', style.iconClass)} />
        
        {node.status === 'active' && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-[hsl(var(--orange-warm))] text-[hsl(var(--main-bg))] border-0 font-bold uppercase text-xs px-3 py-1 shadow-lg">
              START
            </Badge>
          </div>
        )}
      </button>
      
      {node.title && (
        <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs text-muted-foreground text-center block">
            {node.title}
          </span>
        </div>
      )}
    </div>
  );
}