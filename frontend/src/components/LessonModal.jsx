import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, PlayCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LessonModal({ lesson, isOpen, onClose }) {
  if (!lesson) return null;

  const handleStartLesson = () => {
    if (lesson.status === 'locked') {
      toast.info('Complete previous lessons to unlock!');
    } else if (lesson.status === 'completed') {
      toast.success('Lesson already completed! Review anytime.');
    } else {
      toast.success(`Starting: ${lesson.fullTitle}`);
    }
    onClose();
  };

  const getStatusConfig = () => {
    switch (lesson.status) {
      case 'locked':
        return {
          icon: Lock,
          badge: 'LOCKED',
          badgeClass: 'bg-red-500/20 text-red-400 border-red-500/50',
          buttonText: 'LOCKED',
          buttonClass: 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed',
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          badge: 'COMPLETED',
          badgeClass: 'bg-green-500/20 text-green-400 border-green-500/50',
          buttonText: 'REVIEW LESSON',
          buttonClass: 'bg-[hsl(var(--teal-vivid))] hover:bg-[hsl(var(--teal-glow))]',
        };
      default:
        return {
          icon: PlayCircle,
          badge: 'AVAILABLE',
          badgeClass: 'bg-[hsl(var(--green-bright))]/20 text-[hsl(var(--green-bright))] border-[hsl(var(--green-bright))]/50',
          buttonText: 'START LESSON',
          buttonClass: 'bg-[hsl(var(--green-bright))] hover:bg-[hsl(var(--accent))]',
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {lesson.fullTitle}
              </DialogTitle>
              <Badge className={`${config.badgeClass} border font-bold uppercase text-xs px-3 py-1`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {config.badge}
              </Badge>
            </div>
          </div>
          
          {/* Lesson Image */}
          {lesson.image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 border-2 border-[hsl(var(--card-border))]">
              <img
                src={lesson.image}
                alt={lesson.fullTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop';
                }}
              />
            </div>
          )}
          
          <DialogDescription className="text-muted-foreground text-base leading-relaxed">
            {lesson.description}
          </DialogDescription>
          
          {lesson.status === 'locked' && (
            <div className="mt-4 p-4 rounded-lg bg-[hsl(var(--locked-dark))] border border-[hsl(var(--card-border))]">
              <p className="text-sm text-muted-foreground">
                <Lock className="w-4 h-4 inline mr-2" />
                Complete all previous lessons to unlock this section.
              </p>
            </div>
          )}
        </DialogHeader>
        
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2 bg-[hsl(var(--sidebar-hover))] border-[hsl(var(--card-border))] hover:bg-[hsl(var(--card-bg))]"
          >
            Close
          </Button>
          <Button
            onClick={handleStartLesson}
            disabled={lesson.status === 'locked'}
            className={`${config.buttonClass} text-[hsl(var(--main-bg))] font-bold uppercase px-6`}
          >
            {config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}