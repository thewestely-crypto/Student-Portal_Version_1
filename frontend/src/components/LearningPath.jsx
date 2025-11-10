import { useState } from 'react';
import { ChevronLeft, BookOpen, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LearningNode from '@/components/LearningNode';
import { toast } from 'sonner';

export default function LearningPath() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const currentLesson = {
    section: 'SECTION 1, UNIT 1',
    title: 'Introduction to Learning',
    description: 'Begin your learning journey'
  };

  const nodes = [
    { id: 1, type: 'start', status: 'active', position: 'center', title: 'Welcome Lesson' },
    { id: 2, type: 'lesson', status: 'completed', position: 'left', title: 'Basic Concepts' },
    { id: 3, type: 'practice', status: 'available', position: 'center', title: 'Practice Session' },
    { id: 4, type: 'locked', status: 'locked', position: 'right', title: 'Advanced Topics' },
    { id: 5, type: 'locked', status: 'locked', position: 'center', title: 'Final Assessment' },
  ];

  const handleNodeClick = (node) => {
    if (node.status === 'locked') {
      toast.info('Complete previous lessons to unlock!');
    } else if (node.status === 'active') {
      setSelectedLesson(node);
      toast.success('Starting lesson...');
    } else if (node.status === 'completed') {
      toast.success('Lesson already completed!');
    } else {
      toast.info('Lesson available - click to start!');
    }
  };

  return (
    <div className="relative min-h-full p-8">
      {/* Current Lesson Card */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] border-0 p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ChevronLeft className="w-5 h-5 text-[hsl(var(--main-bg))]" />
                <span className="text-sm font-bold text-[hsl(var(--main-bg))] uppercase tracking-wider">
                  {currentLesson.section}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[hsl(var(--main-bg))] mb-1">
                {currentLesson.title}
              </h2>
              <p className="text-[hsl(var(--main-bg))]/80 text-lg">
                {currentLesson.description}
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-[hsl(var(--main-bg))] hover:bg-[hsl(var(--main-bg))]/20 font-bold uppercase tracking-wide px-6"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Guidebook
            </Button>
          </div>
        </Card>
      </div>

      {/* Learning Path */}
      <div className="max-w-2xl mx-auto space-y-8">
        {nodes.map((node, index) => (
          <div
            key={node.id}
            className={`flex justify-${node.position === 'center' ? 'center' : node.position === 'left' ? 'start' : 'end'}`}
          >
            <LearningNode
              node={node}
              onClick={() => handleNodeClick(node)}
              delay={index * 100}
            />
          </div>
        ))}
      </div>

      {/* Mascot - Floating Character */}
      <div className="absolute right-20 bottom-20">
        <div className="relative animate-float">
          <div className="w-32 h-32 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-2xl glow-green">
            <Star className="w-16 h-16 text-[hsl(var(--main-bg))]" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[hsl(var(--orange-warm))] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[hsl(var(--main-bg))] text-xs font-bold">Hi!</span>
          </div>
        </div>
      </div>
    </div>
  );
}