import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function Layout({ children, activeSection = 'curiosity' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionChange = (section) => {
    // Navigate to appropriate route based on section
    switch (section) {
      case 'learn':
        navigate('/');
        break;
      case 'chat':
        navigate('/');
        break;
      case 'curiosity':
        navigate('/curiosity');
        break;
      case 'quests':
        navigate('/');
        break;
      case 'leaderboard':
        navigate('/');
        break;
      case 'shop':
        navigate('/');
        break;
      case 'profile':
        navigate('/');
        break;
      case 'more':
        navigate('/');
        break;
      case 'community':
        navigate('/');
        break;
      case 'settings':
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-[hsl(var(--main-bg))] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
