import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play, Check, X } from 'lucide-react';
import { Video, Microscope, PenTool, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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

export default function CardJourneyView({ items, onExit, onComplete, isItemCompleted }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityState, setActivityState] = useState('idle');
  const [timer, setTimer] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [clickedElements, setClickedElements] = useState(new Set());

  const currentItem = items[currentIndex];
  const Icon = iconMap[currentItem?.type];
  const colorGradient = typeColors[currentItem?.type];
  const isAlreadyCompleted = isItemCompleted(currentItem?.id);

  // Reset activity state when moving to new item
  useEffect(() => {
    setActivityState(isAlreadyCompleted ? 'completed' : 'idle');
    setTimer(0);
    setSelectedAnswers({});
    setClickedElements(new Set());
  }, [currentIndex, isAlreadyCompleted]);

  // Video timer
  useEffect(() => {
    if (currentItem?.type === 'Watch' && activityState === 'in-progress') {
      const interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          if (newTime >= currentItem.durationSeconds) {
            setActivityState('completed');
            if (!isAlreadyCompleted) {
              onComplete(currentItem.id, currentItem.xpReward);
            }
            clearInterval(interval);
            return currentItem.durationSeconds;
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [activityState, currentItem, isAlreadyCompleted, onComplete]);

  const handleStartVideo = () => {
    setActivityState('in-progress');
  };

  const handleSimulationClick = (elementId) => {
    const newClicked = new Set(clickedElements);
    newClicked.add(elementId);
    setClickedElements(newClicked);

    if (newClicked.size >= 3) {
      setActivityState('completed');
      if (!isAlreadyCompleted) {
        onComplete(currentItem.id, currentItem.xpReward);
      }
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitPractice = () => {
    const allAnswered = currentItem.questions?.every(q => selectedAnswers[q.id] !== undefined);
    if (allAnswered) {
      setActivityState('completed');
      if (!isAlreadyCompleted) {
        onComplete(currentItem.id, currentItem.xpReward);
      }
    }
  };

  const handleMarkAsRead = () => {
    setActivityState('completed');
    if (!isAlreadyCompleted) {
      onComplete(currentItem.id, currentItem.xpReward);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All activities completed
      onExit();
    }
  };

  const canProceed = activityState === 'completed' || isAlreadyCompleted;
  const videoProgress = currentItem?.durationSeconds > 0 ? (timer / currentItem.durationSeconds) * 100 : 0;
  const allQuestionsAnswered = currentItem?.questions?.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onExit}
          variant="outline"
          className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Path
        </Button>

        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Learning Pack Progress</div>
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx < currentIndex
                    ? 'bg-green-500'
                    : idx === currentIndex
                    ? 'bg-[hsl(var(--primary))] scale-125'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-lg font-bold text-foreground mt-2">
            {currentIndex + 1} of {items.length}
          </div>
        </div>

        <div className="w-32" /> {/* Spacer for symmetry */}
      </div>

      {/* Activity Card */}
      <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] max-w-4xl mx-auto">
        <div className="p-8 space-y-6">
          {/* Activity Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center shadow-xl`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-[hsl(var(--teal-vivid))] uppercase tracking-wide">
                {currentItem.type}
              </div>
              <h2 className="text-2xl font-bold text-white">{currentItem.title}</h2>
              <p className="text-gray-300 text-sm">{currentItem.duration}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">{currentItem.description}</p>

          {/* Activity Content */}
          <div className="space-y-4">
            {/* WATCH */}
            {currentItem.type === 'Watch' && (
              <>
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                  {activityState === 'idle' ? (
                    <Button
                      onClick={handleStartVideo}
                      size="lg"
                      className="bg-white/90 hover:bg-white text-black rounded-full w-20 h-20"
                    >
                      <Play className="w-10 h-10" />
                    </Button>
                  ) : activityState === 'in-progress' ? (
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">▶️</div>
                      <div className="text-2xl font-mono">{timer}s / {currentItem.durationSeconds}s</div>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <Check className="w-16 h-16 mx-auto mb-4 text-green-400" />
                      <div className="text-xl font-bold">Video Completed!</div>
                    </div>
                  )}
                </div>
                {activityState === 'in-progress' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Progress</span>
                      <span>{Math.round(videoProgress)}%</span>
                    </div>
                    <Progress value={videoProgress} className="h-2" />
                  </div>
                )}
              </>
            )}

            {/* EXPLORE */}
            {currentItem.type === 'Explore' && (
              <div className="bg-gradient-to-br from-[hsl(var(--card-bg))] to-[hsl(var(--card-bg))]/80 border-2 border-[hsl(var(--card-border))] rounded-lg p-8">
                <h3 className="text-lg font-bold text-white mb-6 text-center">
                  Click all interactions to complete!
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['PUSH', 'PULL', 'HIT'].map((action, idx) => {
                    const elementId = `sim-${idx}`;
                    const isClicked = clickedElements.has(elementId);
                    return (
                      <Button
                        key={elementId}
                        onClick={() => handleSimulationClick(elementId)}
                        disabled={isClicked}
                        className={`h-32 text-xl font-bold ${
                          isClicked
                            ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed'
                            : 'bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700'
                        }`}
                      >
                        {isClicked ? <Check className="w-8 h-8" /> : action}
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-4 text-center text-gray-300">
                  {clickedElements.size} / 3 interactions completed
                </div>
              </div>
            )}

            {/* PRACTICE */}
            {currentItem.type === 'Practice' && (
              <div className="space-y-6">
                {currentItem.questions?.map((question, qIdx) => (
                  <div key={question.id} className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-6">
                    <h3 className="font-bold text-white mb-4">
                      Q{qIdx + 1}: {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[question.id] === optIdx;
                        return (
                          <Button
                            key={optIdx}
                            onClick={() => handleAnswerSelect(question.id, optIdx)}
                            variant="outline"
                            className={`w-full justify-start text-left h-auto py-3 px-4 ${
                              isSelected
                                ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white'
                                : 'bg-[hsl(var(--card-bg))] hover:bg-[hsl(var(--sidebar-hover))] text-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-white bg-white' : 'border-gray-400'
                              }`}>
                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--primary))]" />}
                              </div>
                              <span>{option}</span>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                <Button
                  onClick={handleSubmitPractice}
                  disabled={!allQuestionsAnswered || activityState === 'completed'}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 text-lg"
                >
                  {activityState === 'completed' ? (
                    <><Check className="w-5 h-5 mr-2" /> Submitted</>
                  ) : (
                    'Submit Answers'
                  )}
                </Button>
              </div>
            )}

            {/* CURIOSITY */}
            {currentItem.type === 'Curiosity' && (
              <>
                <div className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-6 max-h-96 overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    {currentItem.content?.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-200 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={handleMarkAsRead}
                  disabled={activityState === 'completed'}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-6 text-lg"
                >
                  {activityState === 'completed' ? (
                    <><Check className="w-5 h-5 mr-2" /> Marked as Read</>
                  ) : (
                    'Mark as Read'
                  )}
                </Button>
              </>
            )}
          </div>

          {/* Completion Badge */}
          {canProceed && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-green-400 font-bold text-lg">
                  ✓ Activity Completed! {!isAlreadyCompleted && `+${currentItem.xpReward} Gems`}
                </div>
                <Button
                  onClick={handleNext}
                  className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white font-bold"
                >
                  {currentIndex < items.length - 1 ? (
                    <>Next Activity <ArrowRight className="w-4 h-4 ml-2" /></>
                  ) : (
                    'Complete Journey'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
