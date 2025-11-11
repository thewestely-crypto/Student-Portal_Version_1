import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, Microscope, PenTool, Lightbulb, Play, Check, X } from 'lucide-react';
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

export default function ActivityModal({ item, isOpen, onClose, onComplete, isAlreadyCompleted }) {
  const [activityState, setActivityState] = useState('idle'); // idle, in-progress, completed
  const [timer, setTimer] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [clickedElements, setClickedElements] = useState(new Set());

  const Icon = iconMap[item?.type] || Video;
  const colorGradient = typeColors[item?.type] || typeColors.Watch;

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setActivityState(isAlreadyCompleted ? 'completed' : 'idle');
      setTimer(0);
      setSelectedAnswers({});
      setClickedElements(new Set());
    }
  }, [isOpen, isAlreadyCompleted]);

  // Video timer countdown
  useEffect(() => {
    if (item?.type === 'Watch' && activityState === 'in-progress') {
      const interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          if (newTime >= item.durationSeconds) {
            setActivityState('completed');
            if (!isAlreadyCompleted) {
              onComplete(item.id, item.xpReward);
            }
            clearInterval(interval);
            return item.durationSeconds;
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [activityState, item, isAlreadyCompleted, onComplete]);

  const handleStartVideo = () => {
    setActivityState('in-progress');
  };

  const handleSimulationClick = (elementId) => {
    const newClicked = new Set(clickedElements);
    newClicked.add(elementId);
    setClickedElements(newClicked);

    // Check if all 3 elements clicked
    if (newClicked.size >= 3) {
      setActivityState('completed');
      if (!isAlreadyCompleted) {
        onComplete(item.id, item.xpReward);
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
    // Check if all questions answered
    const allAnswered = item.questions?.every(q => selectedAnswers[q.id] !== undefined);
    if (allAnswered) {
      setActivityState('completed');
      if (!isAlreadyCompleted) {
        onComplete(item.id, item.xpReward);
      }
    }
  };

  const handleMarkAsRead = () => {
    setActivityState('completed');
    if (!isAlreadyCompleted) {
      onComplete(item.id, item.xpReward);
    }
  };

  if (!item) return null;

  const videoProgress = item.durationSeconds > 0 ? (timer / item.durationSeconds) * 100 : 0;
  const allQuestionsAnswered = item.questions?.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center shadow-xl`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-[hsl(var(--teal-vivid))] uppercase tracking-wide">
                {item.type}
              </div>
              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              <p className="text-gray-300 text-sm">{item.duration}</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Activity Content */}
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">{item.description}</p>

          {/* WATCH: Video Player Mockup */}
          {item.type === 'Watch' && (
            <div className="space-y-4">
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
                    <div className="text-2xl font-mono">{timer}s / {item.durationSeconds}s</div>
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
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{Math.round(videoProgress)}%</span>
                  </div>
                  <Progress value={videoProgress} className="h-2" />
                </div>
              )}
            </div>
          )}

          {/* EXPLORE: Simulation Mockup */}
          {item.type === 'Explore' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[hsl(var(--card-bg))] to-[hsl(var(--card-bg))]/80 border-2 border-[hsl(var(--card-border))] rounded-lg p-8">
                <h3 className="text-lg font-bold text-foreground mb-6 text-center">
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
                <div className="mt-4 text-center text-muted-foreground">
                  {clickedElements.size} / 3 interactions completed
                </div>
              </div>
            </div>
          )}

          {/* PRACTICE: Quiz Questions */}
          {item.type === 'Practice' && (
            <div className="space-y-6">
              {item.questions?.map((question, qIdx) => (
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
                              : 'bg-[hsl(var(--card-bg))] hover:bg-[hsl(var(--sidebar-hover))]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-white bg-white' : 'border-muted-foreground'
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
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {activityState === 'completed' ? (
                  <><Check className="w-5 h-5 mr-2" /> Submitted</>
                ) : (
                  'Submit Answers'
                )}
              </Button>
            </div>
          )}

          {/* CURIOSITY: Reading Content */}
          {item.type === 'Curiosity' && (
            <div className="space-y-4">
              <div className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-6 max-h-96 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  {item.content?.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={handleMarkAsRead}
                disabled={activityState === 'completed'}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {activityState === 'completed' ? (
                  <><Check className="w-5 h-5 mr-2" /> Marked as Read</>
                ) : (
                  'Mark as Read'
                )}
              </Button>
            </div>
          )}

          {/* Completion Badge */}
          {activityState === 'completed' && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4 text-center">
              <div className="text-green-400 font-bold text-lg">
                ✓ Activity Completed! {!isAlreadyCompleted && `+${item.xpReward} Gems`}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
