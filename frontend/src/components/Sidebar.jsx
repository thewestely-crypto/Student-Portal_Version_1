import { Home, MessageCircle, Target, Sparkles, Trophy, ShoppingBag, User, MoreHorizontal, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuSections = [
  {
    label: 'LEARNING',
    items: [
      { id: 'learn', label: 'LEARN', icon: Home, color: 'text-orange-500' },
      { id: 'chat', label: 'CHAT', icon: MessageCircle, color: 'text-green-400' },
      { id: 'quests', label: 'QUESTS', icon: Target, color: 'text-orange-400' },
    ]
  },
  {
    label: 'DISCOVERY',
    items: [
      { id: 'curiosity', label: 'CURIOSITY CENTRE', icon: Sparkles, color: 'text-purple-400' },
      { id: 'leaderboard', label: 'LEADERBOARD', icon: Trophy, color: 'text-yellow-500' },
      { id: 'shop', label: 'SHOP', icon: ShoppingBag, color: 'text-red-400' },
    ]
  },
  {
    label: null, // No label for bottom section
    items: [
      { id: 'profile', label: 'PROFILE', icon: User, color: 'text-gray-400' },
      { id: 'more', label: 'MORE', icon: MoreHorizontal, color: 'text-gray-500' },
    ]
  }
];

const communityItem = {
  id: 'community',
  label: 'COMMUNITY',
  icon: Users,
  color: 'text-amber-400'
};

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div className="w-64 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--card-border))] flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--green-bright))] tracking-tight">
          homie.ai
        </h1>
      </div>
      
      {/* Menu Sections */}
      <nav className="flex-1 px-3 flex flex-col">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={cn(
            sectionIndex > 0 && 'mt-6'
          )}>
            {/* Section Label */}
            {section.label && (
              <div className="px-4 mb-3">
                <span className="text-[10px] font-bold text-muted-foreground tracking-wider opacity-50">
                  {section.label}
                </span>
              </div>
            )}
            
            {/* Menu Items */}
            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
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
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 rounded-xl" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Spacer to push community to bottom */}
        <div className="flex-1" />
        
        {/* Community Footer */}
        <div className="mt-auto mb-3">
          {/* Separator */}
          <div className="px-4 mb-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--card-border))] to-transparent" />
          </div>
          
          {/* Community Button */}
          <button
            onClick={() => setActiveSection(communityItem.id)}
            className={cn(
              'w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm uppercase tracking-wide transition-all duration-300 relative overflow-hidden',
              activeSection === communityItem.id
                ? 'bg-gradient-to-r from-[hsl(var(--orange-warm))]/20 to-amber-500/20 text-foreground shadow-lg border-2 border-[hsl(var(--orange-warm))]/50'
                : 'text-muted-foreground hover:bg-gradient-to-r hover:from-[hsl(var(--orange-warm))]/10 hover:to-amber-500/10 hover:text-foreground border-2 border-transparent'
            )}
          >
            <communityItem.icon className={cn('w-6 h-6', communityItem.color)} />
            <span>{communityItem.label}</span>
            
            {/* Special glow for community */}
            {activeSection === communityItem.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--orange-warm))]/20 to-amber-500/20 blur-xl -z-10" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}