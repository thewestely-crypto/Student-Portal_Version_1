import * as LucideIcons from 'lucide-react';
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
          defaultIcon: 'Star',
          iconClass: 'text-[hsl(var(--main-bg))]',
          size: 'w-16 h-16', // Smaller size
        };
      case 'completed':
        return {
          bg: 'bg-[hsl(var(--card-bg))]',
          border: 'border-[hsl(var(--teal-vivid))]',
          shadow: 'shadow-lg',
          defaultIcon: 'CheckCircle2',
          iconClass: 'text-[hsl(var(--teal-vivid))]',
          size: 'w-16 h-16',
        };
      case 'available':
        return {
          bg: 'bg-[hsl(var(--card-bg))]',
          border: 'border-[hsl(var(--card-border))]',
          shadow: 'shadow-md',
          defaultIcon: 'Play',
          iconClass: 'text-[hsl(var(--primary))]',
          size: 'w-16 h-16',
        };
      case 'locked':
      default:
        return {
          bg: 'bg-[hsl(var(--locked-dark))]',
          border: 'border-[hsl(var(--locked-gray))]',
          shadow: 'shadow-sm',
          defaultIcon: 'Lock',
          iconClass: 'text-[hsl(var(--locked-gray))]',
          size: 'w-16 h-16',
        };
    }
  };

  const style = getNodeStyle();
  
  // Get the icon - use custom icon if provided, otherwise use default
  const iconName = node.customIcon || style.defaultIcon;
  const Icon = LucideIcons[iconName] || LucideIcons.Star;
  
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
          'relative rounded-full border-4 flex items-center justify-center transition-all duration-300',
          style.size,
          style.bg,
          style.border,
          style.shadow,
          isInteractive && 'hover:scale-110 hover-lift cursor-pointer',
          !isInteractive && 'cursor-not-allowed opacity-60'
        )}
      >
        <Icon className={cn('w-8 h-8', style.iconClass)} />
        
        {node.status === 'active' && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-[hsl(var(--orange-warm))] text-[hsl(var(--main-bg))] border-0 font-bold uppercase text-xs px-3 py-1 shadow-lg">
              START
            </Badge>
          </div>
        )}
      </button>
      
      {/* Only show title for generic nodes, not chapter subsections */}
      {node.showTitle && node.title && (
        <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs text-muted-foreground text-center block">
            {node.title}
          </span>
        </div>
      )}
    </div>
  );
}