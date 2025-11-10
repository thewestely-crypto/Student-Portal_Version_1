import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LearningPath from '@/components/LearningPath';
import StatsBar from '@/components/StatsBar';
import RightPanel from '@/components/RightPanel';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('learn');

  return (
    <div className="flex h-screen bg-[hsl(var(--main-bg))] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Stats Bar */}
        <StatsBar />
        
        {/* Learning Path */}
        <div className="flex-1 overflow-y-auto">
          <LearningPath />
        </div>
      </div>
      
      {/* Right Panel */}
      <RightPanel />
    </div>
  );
}