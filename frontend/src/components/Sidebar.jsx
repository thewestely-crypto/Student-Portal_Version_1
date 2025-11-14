import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Target, Sparkles, Trophy, ShoppingBag, User, MoreHorizontal, Users, Settings, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'learn', label: 'LEARN', icon: Home, color: 'text-orange-500', type: 'regular' },
  { id: 'chat', label: 'CHAT', icon: MessageCircle, color: 'text-green-400', type: 'regular' },
  { id: 'quests', label: 'QUESTS', icon: Target, color: 'text-orange-400', type: 'regular' },
  { id: 'curiosity', label: 'CURIOSITY CENTRE', icon: Sparkles, color: 'text-purple-400', type: 'regular' },
  {
    id: 'achievements',
    label: 'ACHIEVEMENTS',
    icon: Trophy,
    color: 'text-yellow-500',
    type: 'expandable',
    children: [
      { id: 'leaderboard', label: 'LEADERBOARD', icon: Trophy, color: 'text-yellow-400' },
      { id: 'shop', label: 'SHOP', icon: ShoppingBag, color: 'text-red-400' },
    ]
  },
  { id: 'profile', label: 'PROFILE', icon: User, color: 'text-gray-400', type: 'regular' },
  {
    id: 'more',
    label: 'MORE',
    icon: MoreHorizontal,
    color: 'text-gray-500',
    type: 'expandable',
    children: [
      { id: 'community', label: 'COMMUNITY', icon: Users, color: 'text-amber-400' },
      { id: 'settings', label: 'SETTINGS', icon: Settings, color: 'text-gray-400' },
    ]
  },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleParentClick = (itemId) => {
    // Toggle accordion - only one open at a time
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleChildClick = (childId, parentId) => {
    setActiveSection(childId);
    // Keep parent expanded when child is clicked
  };

  const isChildActive = (item) => {
    if (item.type === 'expandable' && item.children) {
      return item.children.some(child => child.id === activeSection);
    }
    return false;
  };

  return (
    <div className="w-64 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--card-border))] flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--green-bright))] tracking-tight">
          homie.ai
        </h1>
      </div>
      
      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedItem === item.id;
          const isActive = activeSection === item.id || isChildActive(item);
          
          return (
            <div key={item.id}>
              {/* Parent Item */}
              <button
                onClick={() => {
                  if (item.type === 'expandable') {
                    handleParentClick(item.id);
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                className={cn(
                  'w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm uppercase tracking-wide transition-all duration-300 relative overflow-hidden',
                  isActive
                    ? 'bg-[hsl(var(--sidebar-hover))] text-foreground shadow-lg'
                    : 'text-muted-foreground hover:bg-[hsl(var(--sidebar-hover))] hover:text-foreground'
                )}
              >
                {/* Neon gradient border for active state */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[hsl(var(--teal-vivid))] via-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] animate-pulse-glow">
                    <div className="w-full h-full bg-[hsl(var(--sidebar-hover))] rounded-xl" />
                  </div>
                )}
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <Icon className={cn('w-6 h-6', item.color)} />
                  <span className="flex-1 text-left">{item.label}</span>
                  
                  {/* Chevron for expandable items */}
                  {item.type === 'expandable' && (
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        isExpanded && 'rotate-90'
                      )}
                    />
                  )}
                </div>
                
                {/* Hover glow effect */}
                {!isActive && (
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 rounded-xl" />
                )}
              </button>
              
              {/* Children Items (Dropdown) */}
              {item.type === 'expandable' && item.children && (
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isExpanded ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="space-y-1 pl-4 pr-0 py-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActiveState = activeSection === child.id;
                      
                      return (
                        <button
                          key={child.id}
                          onClick={() => handleChildClick(child.id, item.id)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm uppercase tracking-wide transition-all duration-300 relative overflow-hidden',
                            isChildActiveState
                              ? 'bg-[hsl(var(--sidebar-hover))] text-foreground shadow-md'
                              : 'text-muted-foreground hover:bg-[hsl(var(--sidebar-hover))]/70 hover:text-foreground'
                          )}
                        >
                          {/* Neon gradient border for active child */}
                          {isChildActiveState && (
                            <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-[hsl(var(--teal-vivid))] via-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] animate-pulse-glow">
                              <div className="w-full h-full bg-[hsl(var(--sidebar-hover))] rounded-lg" />
                            </div>
                          )}
                          
                          {/* Child Content */}
                          <div className="relative z-10 flex items-center gap-3 w-full">
                            <ChildIcon className={cn('w-5 h-5', child.color)} />
                            <span>{child.label}</span>
                          </div>
                          
                          {/* Hover glow effect for children */}
                          {!isChildActiveState && (
                            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 rounded-lg" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}