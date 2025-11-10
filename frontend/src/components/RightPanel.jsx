import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Lock, Zap, ArrowRight, Flag, Flame, Shield, Heart } from 'lucide-react';

export default function RightPanel() {
  const stats = [
    { icon: Flag, value: 2, label: 'Lessons', gradient: 'from-blue-400 to-blue-600' },
    { icon: Flame, value: 2, label: 'Day Streak', gradient: 'from-orange-400 to-red-500' },
    { icon: Shield, value: 505, label: 'XP', gradient: 'from-cyan-400 to-teal-500' },
    { icon: Heart, value: 5, label: 'Lives', gradient: 'from-pink-400 to-rose-500' },
  ];

  return (
    <div className="w-96 bg-[hsl(var(--sidebar-bg))] border-l border-[hsl(var(--card-border))] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Stats Card - COMPACT VERSION */}
        <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] overflow-hidden">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                  >
                    {/* Stat Item */}
                    <div className="bg-[hsl(var(--sidebar-hover))] rounded-lg p-3 border-2 border-[hsl(var(--card-border))] hover:border-[hsl(var(--teal-vivid))]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      {/* Icon with gradient background */}
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      
                      {/* Value */}
                      <div className="text-center">
                        <div className="text-xl font-bold text-foreground mb-0.5">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 -z-10 blur-xl" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Premium Card */}
        <Card className="bg-gradient-to-br from-[hsl(var(--purple-accent))]/20 to-[hsl(var(--primary))]/20 border-[hsl(var(--primary))]/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[hsl(var(--primary))]/30 to-transparent rounded-full blur-2xl" />
          <CardHeader>
            <Badge className="w-fit bg-gradient-to-r from-[hsl(var(--purple-accent))] to-[hsl(var(--primary))] text-foreground border-0 font-bold uppercase text-xs px-3 py-1">
              SUPER
            </Badge>
            <CardTitle className="text-2xl font-bold text-foreground mt-3">
              Try Super for free
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              No ads, personalized practice, and unlimited Legendary!
            </p>
            <div className="flex items-center justify-center my-4">
              <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--purple-accent))] rounded-2xl flex items-center justify-center shadow-xl glow-teal transform rotate-12">
                <Sparkles className="w-12 h-12 text-[hsl(var(--main-bg))]" />
              </div>
            </div>
            <Button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-[hsl(var(--main-bg))] font-bold uppercase py-6 shadow-lg hover:shadow-xl transition-all duration-300">
              Try 1 Week Free
            </Button>
          </CardContent>
        </Card>

        {/* Unlock Leaderboards Card */}
        <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Unlock Leaderboards!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-[hsl(var(--locked-dark))] rounded-lg flex items-center justify-center border-2 border-[hsl(var(--card-border))]">
                <Lock className="w-8 h-8 text-[hsl(var(--locked-gray))]" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm">
                  Complete 9 more lessons to start competing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Quests Card */}
        <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold text-foreground">
              Daily Quests
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-[hsl(var(--primary))] hover:text-[hsl(var(--teal-glow))] hover:bg-[hsl(var(--primary))]/10 font-bold uppercase text-xs"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--orange-warm))] to-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                <Zap className="w-6 h-6 text-[hsl(var(--main-bg))]" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Earn 10 XP</span>
                  <Badge variant="outline" className="bg-[hsl(var(--locked-dark))] border-[hsl(var(--card-border))] text-[hsl(var(--orange-warm))] font-mono">
                    0/10
                  </Badge>
                </div>
                <div className="relative">
                  <Progress value={0} className="h-3 bg-[hsl(var(--locked-dark))]" />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-[hsl(var(--orange-warm))] rounded flex items-center justify-center shadow-sm">
                      <Zap className="w-3 h-3 text-[hsl(var(--main-bg))]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}