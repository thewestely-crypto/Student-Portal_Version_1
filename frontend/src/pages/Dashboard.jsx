import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LearningPath from '@/components/LearningPath';
import RightPanel from '@/components/RightPanel';
import { useLearningPack } from '@/hooks/useLearningPack';
import { chapterContent } from '@/data/chapterContent';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('learn');
  const [totalXP, setTotalXP] = useState(0);
  const [journeyMode, setJourneyMode] = useState(false);
  const [currentJourneyIndex, setCurrentJourneyIndex] = useState(0);
  const [currentSelection, setCurrentSelection] = useState({ subject: '', chapter: '' });
  const [chatMode, setChatMode] = useState(false);
  const [prefilledText, setPrefilledText] = useState('');

  // Learning pack state for right panel
  const learningPack = chapterContent.physics?.ch8?.learningPack;
  const packState = useLearningPack(learningPack?.packId);

  const handleSelectionChange = (selection) => {
    setCurrentSelection(selection);
  };

  const handleXPEarned = (xpAmount) => {
    setTotalXP(prev => prev + xpAmount);
  };

  const handleStartJourney = () => {
    // Check if valid selection (Physics Chapter 8)
    if (currentSelection.subject === 'physics' && currentSelection.chapter === 'ch8') {
      setJourneyMode(true);
      setCurrentJourneyIndex(0);
      return true;
    }
    return false; // Invalid selection
  };

  const handleJourneyModeChange = (isActive) => {
    setJourneyMode(isActive);
    if (!isActive) {
      setCurrentJourneyIndex(0);
    }
  };

  const learningPackData = journeyMode && learningPack ? {
    items: learningPack.items,
    currentIndex: currentJourneyIndex,
    completedItems: packState.completedItems
  } : null;

  const handleToggleChatMode = () => {
    setChatMode(!chatMode);
  };

  const handleCloseChatMode = () => {
    setChatMode(false);
  };

  return (
    <div className="flex h-screen bg-[hsl(var(--main-bg))] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content based on active section */}
        <div className="flex-1 overflow-y-auto">
          {activeSection === 'learn' && (
            <LearningPath 
              onXPEarned={handleXPEarned}
              journeyMode={journeyMode}
              onJourneyModeChange={handleJourneyModeChange}
              learningPackData={learningPackData}
              onSelectionChange={handleSelectionChange}
              onToggleChatMode={handleToggleChatMode}
            />
          )}
          {activeSection === 'chat' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">💬</div>
                <h2 className="text-3xl font-bold text-foreground">Chat</h2>
                <p className="text-muted-foreground">AI-powered tutor coming soon</p>
              </div>
            </div>
          )}
          {activeSection === 'quests' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎯</div>
                <h2 className="text-3xl font-bold text-foreground">Quests</h2>
                <p className="text-muted-foreground">Daily challenges and missions</p>
              </div>
            </div>
          )}
          {activeSection === 'curiosity' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">✨</div>
                <h2 className="text-3xl font-bold text-foreground">Curiosity Centre</h2>
                <p className="text-muted-foreground">Extended learning beyond school curriculum</p>
              </div>
            </div>
          )}
          {activeSection === 'leaderboard' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">🏆</div>
                <h2 className="text-3xl font-bold text-foreground">Leaderboard</h2>
                <p className="text-muted-foreground">Compete with other learners</p>
              </div>
            </div>
          )}
          {activeSection === 'shop' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">🛍️</div>
                <h2 className="text-3xl font-bold text-foreground">Shop</h2>
                <p className="text-muted-foreground">Rewards and customizations</p>
              </div>
            </div>
          )}
          {activeSection === 'profile' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">👤</div>
                <h2 className="text-3xl font-bold text-foreground">Profile</h2>
                <p className="text-muted-foreground">Your learning journey and stats</p>
              </div>
            </div>
          )}
          {activeSection === 'community' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">🌍</div>
                <h2 className="text-3xl font-bold text-foreground">Community</h2>
                <p className="text-muted-foreground">Connect with other learners</p>
              </div>
            </div>
          )}
          {activeSection === 'settings' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">⚙️</div>
                <h2 className="text-3xl font-bold text-foreground">Settings</h2>
                <p className="text-muted-foreground">Customize your experience</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Panel */}
      <RightPanel 
        totalXP={totalXP}
        journeyMode={journeyMode}
        learningPackData={learningPackData}
        onStartJourney={handleStartJourney}
        currentSelection={currentSelection}
        chatMode={chatMode}
        onChatClose={handleCloseChatMode}
      />
    </div>
  );
}