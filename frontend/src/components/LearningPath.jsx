import { useState } from 'react';
import { BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LearningNode from '@/components/LearningNode';
import LessonModal from '@/components/LessonModal';
import TextbookViewer from '@/components/TextbookViewer';
import CardJourneyView from '@/components/CardJourneyView';
import { useLearningPack } from '@/hooks/useLearningPack';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { chapterContent, genericNodes } from '@/data/chapterContent';

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

export default function LearningPath({ onXPEarned, journeyMode, onJourneyModeChange, learningPackData, onSelectionChange }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTextbook, setShowTextbook] = useState(false);
  const [currentTextbookLesson, setCurrentTextbookLesson] = useState(null);
  const [floatingXP, setFloatingXP] = useState(null);

  // Learning pack state
  const learningPack = chapterContent.physics?.ch8?.learningPack;
  const packState = useLearningPack(learningPack?.packId);

  const handleActivityComplete = (itemId, xpReward) => {
    const earnedXP = packState.completeItem(itemId, xpReward);
    
    if (earnedXP > 0) {
      // Show floating XP text
      setFloatingXP({ amount: earnedXP, timestamp: Date.now() });
      setTimeout(() => setFloatingXP(null), 3000);

      // Show toast notification
      toast.success(`🎉 +${earnedXP} Gems earned!`, {
        duration: 3000
      });

      // Notify parent to update gems counter
      if (onXPEarned) {
        onXPEarned(earnedXP);
      }
    }
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setSelectedChapter('');
    setShowTextbook(false); // Reset textbook view when subject changes
    
    // Notify parent of selection change
    if (onSelectionChange) {
      onSelectionChange({ subject: value, chapter: '' });
    }
    if (onJourneyModeChange) {
      onJourneyModeChange(false);
    }
  };

  const handleChapterChange = (value) => {
    setSelectedChapter(value);
    
    // Notify parent of selection change
    if (onSelectionChange) {
      onSelectionChange({ subject: selectedSubject, chapter: value });
    }
  };

  const currentChapters = chaptersBySubject[selectedSubject] || [];

  const handleStartLesson = (lesson) => {
    setCurrentTextbookLesson(lesson);
    setShowTextbook(true);
    setIsModalOpen(false);
  };

  const handleCloseTextbook = () => {
    setShowTextbook(false);
    setCurrentTextbookLesson(null);
  };

  // Generate nodes based on selected chapter
  const getNodes = () => {
    const nodes = [
      { ...genericNodes[0], showTitle: true, position: 'center' },
    ];
    
    if (selectedSubject && selectedChapter && chapterContent[selectedSubject]?.[selectedChapter]) {
      const subsections = chapterContent[selectedSubject][selectedChapter].subsections;
      subsections.forEach((subsection) => {
        nodes.push({
          id: subsection.id,
          type: 'chapter-section',
          status: subsection.status,
          position: 'center',
          customIcon: subsection.icon,
          showTitle: false,
          fullData: subsection
        });
      });
    }
    
    return nodes;
  };
  
  const floatingNodes = [
    { ...genericNodes[1], showTitle: true },
    { ...genericNodes[2], showTitle: true },
    { id: 'advanced', type: 'locked', status: 'locked', title: 'Advanced Topics', showTitle: true },
    { id: 'assessment', type: 'locked', status: 'locked', title: 'Final Assessment', showTitle: true }
  ];

  const handleNodeClick = (node) => {
    // START node - open textbook directly (no modal)
    if (node.id === 'welcome') {
      setCurrentTextbookLesson(node);
      setShowTextbook(true);
      return;
    }
    
    // Chapter subsection nodes - open modal first
    if (node.fullData) {
      setSelectedLesson(node.fullData);
      setIsModalOpen(true);
    } else {
      // Other generic nodes - show toast
      if (node.status === 'locked') {
        toast.info('Complete previous lessons to unlock!');
      } else if (node.status === 'active') {
        toast.success('Starting lesson...');
      } else if (node.status === 'completed') {
        toast.success('Lesson already completed!');
      } else {
        toast.info('Lesson available - click to start!');
      }
    }
  };

  const nodes = getNodes();

  // Determine if we should show compact view
  const isCompactMode = journeyMode || showTextbook;

  return (
    <div className="relative min-h-full p-8">
      {/* Subject & Chapter Selection - Compact in Journey Mode OR Textbook View */}
      <div className={`mx-auto ${isCompactMode ? 'mb-4' : 'mb-6 max-w-3xl'}`}>
        <Card className={`bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] border-0 shadow-2xl ${isCompactMode ? 'p-3' : 'p-6'}`}>
          <div className={isCompactMode ? 'flex items-center gap-3' : 'space-y-4'}>
            {!isCompactMode && (
              <h2 className="text-xl font-bold text-[hsl(var(--main-bg))] mb-4">
                Select Your Learning Focus
              </h2>
            )}
            
            <div className={`flex items-center ${isCompactMode ? 'gap-2 flex-1' : 'gap-4'}`}>
              <div className="flex-1">
                <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                  <SelectTrigger className={`bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))] font-semibold ${isCompactMode ? 'text-sm h-9' : 'text-base h-12'}`}>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    {subjects.map((subject) => (
                      <SelectItem 
                        key={subject.value} 
                        value={subject.value}
                        className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium focus:bg-[hsl(var(--sidebar-hover))] focus:text-white"
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

              <div className="flex-1">
                <Select 
                  value={selectedChapter} 
                  onValueChange={handleChapterChange}
                  disabled={!selectedSubject || currentChapters.length === 0}
                >
                  <SelectTrigger className={`bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))] font-semibold ${isCompactMode ? 'text-sm h-9' : 'text-base h-12'}`}>
                    <SelectValue placeholder="Chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    {currentChapters.length > 0 ? (
                      currentChapters.map((chapter) => (
                        <SelectItem 
                          key={chapter.value} 
                          value={chapter.value}
                          className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium focus:bg-[hsl(var(--sidebar-hover))] focus:text-white"
                        >
                          {chapter.label}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-6 text-center text-gray-400 text-sm">
                        No chapters available for this subject yet
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {!isCompactMode && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-[hsl(var(--main-bg))] hover:bg-[hsl(var(--main-bg))]/20 font-bold uppercase tracking-wide px-6 h-12"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Guidebook
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Floating XP Notification */}
      {floatingXP && (
        <div className="fixed top-24 right-1/2 transform translate-x-1/2 z-50 animate-float-up">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-2xl px-6 py-3 rounded-full shadow-2xl">
            +{floatingXP.amount} XP
          </div>
        </div>
      )}

      {/* Conditional Rendering: Journey Mode OR Textbook OR Learning Path */}
      {journeyMode && learningPack ? (
        <CardJourneyView
          items={learningPack.items}
          onExit={() => onJourneyModeChange(false)}
          onComplete={handleActivityComplete}
          isItemCompleted={packState.isItemCompleted}
        />
      ) : showTextbook && currentTextbookLesson ? (
        <TextbookViewer 
          lesson={currentTextbookLesson} 
          onClose={handleCloseTextbook}
          onXPEarned={onXPEarned}
        />
      ) : (
        <>
          {/* Learning Path - Only Chapter Subsections */}
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            {nodes.map((node, index) => (
              <div key={node.id} className="flex justify-center">
                <LearningNode
                  node={node}
                  onClick={() => handleNodeClick(node)}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>

          {/* Floating Generic Nodes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-20 pointer-events-auto">
              <LearningNode node={floatingNodes[0]} onClick={() => handleNodeClick(floatingNodes[0])} />
            </div>
            <div className="absolute top-96 right-32 pointer-events-auto">
              <LearningNode node={floatingNodes[1]} onClick={() => handleNodeClick(floatingNodes[1])} />
            </div>
            <div className="absolute bottom-48 left-16 pointer-events-auto">
              <LearningNode node={floatingNodes[2]} onClick={() => handleNodeClick(floatingNodes[2])} />
            </div>
            <div className="absolute top-[280px] right-32 pointer-events-auto">
              <LearningNode node={floatingNodes[3]} onClick={() => handleNodeClick(floatingNodes[3])} />
            </div>
          </div>

        </>
      )}

      {/* Mascot - Always Visible (smaller, touching right panel) */}
      <div className="fixed bottom-8 right-[384px] z-20">
        <div className="relative animate-float">
          <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-2xl glow-green">
            <Star className="w-12 h-12 text-[hsl(var(--main-bg))]" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[hsl(var(--orange-warm))] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[hsl(var(--main-bg))] text-[10px] font-bold">Hi!</span>
          </div>
        </div>
      </div>
      
      {/* Lesson Modal */}
      <LessonModal
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLesson(null);
        }}
        onStartLesson={handleStartLesson}
      />
    </div>
  );
}