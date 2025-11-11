import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Lock, Zap, ArrowRight, Flag, Flame, Diamond, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import ActivityProgressList from './ActivityProgressList';

export default function RightPanel({ totalXP = 0, journeyMode = false, learningPackData = null, onStartJourney }) {
  const baseGems = 505;
  const currentGems = baseGems + totalXP;
  const [animateGems, setAnimateGems] = useState(false);
  const [xpIncrement, setXpIncrement] = useState(0);

  // Trigger animation when totalXP changes
  useEffect(() => {
    if (totalXP > 0) {
      setAnimateGems(true);
      setXpIncrement(totalXP);
      const timer = setTimeout(() => {
        setAnimateGems(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [totalXP]);

  const stats = [
    { icon: Flag, value: 2, label: 'Lessons', gradient: 'from-blue-400 via-blue-500 to-blue-600', shine: false },
    { icon: Flame, value: 2, label: 'Day Streak', gradient: 'from-orange-400 via-orange-500 to-red-500', shine: false },
    { icon: Diamond, value: currentGems, label: 'Gems', gradient: 'from-purple-400 via-fuchsia-500 to-pink-500', shine: true },
    { icon: Heart, value: 5, label: 'Lives', gradient: 'from-pink-400 via-rose-500 to-rose-600', shine: false },
  ];

  return (
    <div className="w-96 bg-[hsl(var(--sidebar-bg))] border-l border-[hsl(var(--card-border))] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Stats Bar - COMPACT HORIZONTAL VERSION */}
        <Card className="bg-gradient-to-r from-[hsl(var(--card-bg))] to-[hsl(var(--card-bg))]/80 border-[hsl(var(--card-border))] overflow-hidden shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center justify-between gap-2">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isGems = stat.label === 'Gems';
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer flex items-center gap-2"
                  >
                    {/* Icon with gradient background */}
                    <div className={`relative w-9 h-9 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${stat.shine || (isGems && animateGems) ? 'animate-pulse' : ''} ${isGems && animateGems ? 'scale-125' : ''}`}>
                      <Icon className={`w-4 h-4 text-white drop-shadow-lg ${stat.shine || (isGems && animateGems) ? 'animate-pulse' : ''}`} />
                      
                      {/* Sparkle effect for Gems */}
                      {stat.shine && (
                        <>
                          <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-yellow-300 animate-pulse" />
                          <Sparkles className="absolute -bottom-0.5 -left-0.5 w-2 h-2 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </>
                      )}
                      
                      {/* Inner glow on hover */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300`} />
                    </div>
                    
                    {/* Value only (no label) */}
                    <div className={`text-lg font-bold text-foreground drop-shadow-sm transition-all duration-300 ${isGems && animateGems ? 'scale-125 text-yellow-400' : ''}`}>
                      {stat.value}
                    </div>
                    
                    {/* XP increment badge */}
                    {isGems && animateGems && xpIncrement > 0 && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
                        +{xpIncrement}
                      </div>
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 -z-10 blur-xl" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Start Fresh Card OR Activity Progress List */}
        {journeyMode && learningPackData ? (
          <ActivityProgressList
            items={learningPackData.items}
            currentIndex={learningPackData.currentIndex}
            completedItems={learningPackData.completedItems}
          />
        ) : (
          <Card className="bg-gradient-to-br from-[hsl(var(--purple-accent))]/20 to-[hsl(var(--primary))]/20 border-[hsl(var(--primary))]/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[hsl(var(--primary))]/30 to-transparent rounded-full blur-2xl" />
            <CardHeader>
              <Badge className="w-fit bg-gradient-to-r from-[hsl(var(--purple-accent))] to-[hsl(var(--primary))] text-foreground border-0 font-bold uppercase text-xs px-3 py-1">
                START FRESH
              </Badge>
              <CardTitle className="text-xl font-bold text-foreground mt-3">
                Learn this chapter from start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Let Homie guide you step by step — from basics to mastery.
              </p>
              <div className="flex items-center justify-center my-4">
                <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--purple-accent))] rounded-2xl flex items-center justify-center shadow-xl glow-teal transform rotate-12">
                  <Sparkles className="w-12 h-12 text-[hsl(var(--main-bg))]" />
                </div>
              </div>
              <Button 
                onClick={onStartJourney}
                className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-[hsl(var(--main-bg))] font-bold uppercase py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start My Journey
              </Button>
            </CardContent>
          </Card>
        )}

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