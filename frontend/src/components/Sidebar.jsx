import { Home, BookOpen, Trophy, Target, ShoppingBag, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'learn', label: 'LEARN', icon: Home, color: 'text-orange-500' },
  { id: 'letters', label: 'LETTERS', icon: BookOpen, color: 'text-blue-400' },
  { id: 'leaderboards', label: 'LEADERBOARDS', icon: Trophy, color: 'text-yellow-500' },
  { id: 'quests', label: 'QUESTS', icon: Target, color: 'text-orange-400' },
  { id: 'shop', label: 'SHOP', icon: ShoppingBag, color: 'text-red-400' },
  { id: 'profile', label: 'PROFILE', icon: User, color: 'text-gray-400' },
  { id: 'more', label: 'MORE', icon: MoreHorizontal, color: 'text-purple-400' },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div className="w-64 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--card-border))] flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--green-bright))] tracking-tight">
          homie.ai
        </h1>
      </div>
      
      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm uppercase tracking-wide transition-all duration-300',
                isActive
                  ? 'bg-[hsl(var(--sidebar-hover))] border-2 border-[hsl(var(--primary))] text-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-[hsl(var(--sidebar-hover))] hover:text-foreground border-2 border-transparent'
              )}
            >
              <Icon className={cn('w-6 h-6', item.color)} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}