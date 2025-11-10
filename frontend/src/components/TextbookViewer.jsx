import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TextbookViewer({ lesson, onClose }) {
  return (
    <div className="relative w-full h-full px-8 py-6">
      {/* Close/Back Button */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onClose}
          variant="outline"
          className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Path
        </Button>
        
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--sidebar-hover))]"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Textbook Content - Scrollable */}
      <div className="w-full bg-[hsl(var(--card-bg))] rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Textbook Image */}
          <img
            src={lesson.textbookImage}
            alt={lesson.fullTitle}
            className="w-full h-auto"
            style={{ maxWidth: '100%', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}