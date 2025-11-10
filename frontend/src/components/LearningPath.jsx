import { useState } from 'react';
import { BookOpen, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LearningNode from '@/components/LearningNode';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const subjects = [
  { value: 'physics', label: 'Science (Physics)', icon: '🔬' },
  { value: 'chemistry', label: 'Science (Chemistry)', icon: '⚗️' },
  { value: 'biology', label: 'Science (Biology)', icon: '🧬' },
  { value: 'mathematics', label: 'Mathematics', icon: '📐' },
];

const chaptersBySubject = {
  physics: [
    { value: 'ch7', label: 'Chapter 7: Motion' },
    { value: 'ch8', label: 'Chapter 8: Force and Laws of Motion' },
    { value: 'ch9', label: 'Chapter 9: Gravitation' },
    { value: 'ch11', label: 'Chapter 11: Sound' },
  ],
  chemistry: [],
  biology: [],
  mathematics: [],
};

export default function LearningPath() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setSelectedChapter(''); // Reset chapter when subject changes
  };

  const currentChapters = chaptersBySubject[selectedSubject] || [];
  const selectedSubjectData = subjects.find(s => s.value === selectedSubject);
  const selectedChapterData = currentChapters.find(c => c.value === selectedChapter);

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
      toast.success('Starting lesson...');
    } else if (node.status === 'completed') {
      toast.success('Lesson already completed!');
    } else {
      toast.info('Lesson available - click to start!');
    }
  };

  return (
    <div className="relative min-h-full p-8">
      {/* Subject & Chapter Selection Card */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] border-0 p-6 shadow-2xl">
          <div className="space-y-4">
            {/* Title */}
            <h2 className="text-xl font-bold text-[hsl(var(--main-bg))] mb-4">
              Select Your Learning Focus
            </h2>
            
            {/* Dropdowns Row */}
            <div className="flex items-center gap-4">
              {/* Subject Dropdown */}
              <div className="flex-1">
                <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                  <SelectTrigger className="bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-foreground hover:bg-[hsl(var(--main-bg))] font-semibold text-base h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    {subjects.map((subject) => (
                      <SelectItem 
                        key={subject.value} 
                        value={subject.value}
                        className="text-foreground hover:bg-[hsl(var(--sidebar-hover))] cursor-pointer font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{subject.icon}</span>
                          <span>{subject.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chapter Dropdown */}
              <div className="flex-1">
                <Select 
                  value={selectedChapter} 
                  onValueChange={setSelectedChapter}
                  disabled={currentChapters.length === 0}
                >
                  <SelectTrigger className="bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-foreground hover:bg-[hsl(var(--main-bg))] font-semibold text-base h-12">
                    <SelectValue placeholder="Select chapter..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    {currentChapters.length > 0 ? (
                      currentChapters.map((chapter) => (
                        <SelectItem 
                          key={chapter.value} 
                          value={chapter.value}
                          className="text-foreground hover:bg-[hsl(var(--sidebar-hover))] cursor-pointer font-medium"
                        >
                          {chapter.label}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-6 text-center text-muted-foreground text-sm">
                        No chapters available for this subject yet
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Guidebook Button */}
              <Button
                size="lg"
                variant="outline"
                className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-[hsl(var(--main-bg))] hover:bg-[hsl(var(--main-bg))]/20 font-bold uppercase tracking-wide px-6 h-12"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Guidebook
              </Button>
            </div>
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