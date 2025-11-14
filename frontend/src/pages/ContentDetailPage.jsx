import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Play, ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ContentDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen bg-[hsl(var(--main-bg))]">
        <div className="text-center space-y-4">
          <p className="text-foreground">Content not found</p>
          <Button onClick={() => navigate('/curiosity')}>
            Back to Curiosity Centre
          </Button>
        </div>
      </div>
    );
  }

  const contentTypeConfig = {
    video: { 
      icon: Play, 
      color: 'from-red-500 to-rose-600',
      actionText: 'Watch Video',
      embedType: 'video'
    },
    tool: { 
      icon: ExternalLink, 
      color: 'from-blue-500 to-cyan-600',
      actionText: 'Launch Tool',
      embedType: 'iframe'
    },
    simulation: { 
      icon: Sparkles, 
      color: 'from-purple-500 to-pink-600',
      actionText: 'Start Simulation',
      embedType: 'iframe'
    },
    course: { 
      icon: BookOpen, 
      color: 'from-green-500 to-emerald-600',
      actionText: 'Continue Course',
      embedType: 'course'
    },
    book: { 
      icon: BookOpen, 
      color: 'from-orange-500 to-amber-600',
      actionText: 'Start Reading',
      embedType: 'reader'
    }
  };

  const config = contentTypeConfig[item.type];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[hsl(var(--main-bg))] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[hsl(var(--main-bg))]/95 backdrop-blur-sm border-b border-[hsl(var(--card-border))]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/curiosity')}
            className="text-foreground hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--sidebar-hover))]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Curiosity Centre
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image/Video Player */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white font-bold text-lg px-8 py-6`}
                  >
                    <Icon className="w-6 h-6 mr-2" />
                    {config.actionText}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Title and Description */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge 
                  className={`${
                    item.category === 'core' 
                      ? 'bg-[hsl(var(--orange-warm))] text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                  } font-bold uppercase`}
                >
                  {item.category === 'core' ? 'CORE' : 'GO DEEPER'}
                </Badge>
                <Badge className={`bg-gradient-to-r ${config.color} text-white font-semibold`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-foreground">
                {item.title}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
                {item.lessons && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{item.lessons} lessons</span>
                  </div>
                )}
                {item.pages && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{item.pages} pages</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* About Section */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-foreground">About this {item.type}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This {item.type} is designed to help you understand the concepts of force and motion in greater depth. 
                  {item.category === 'core' 
                    ? ' It covers essential topics from your curriculum and provides practical examples to reinforce your learning.'
                    : ' It goes beyond the standard curriculum to explore advanced concepts and real-world applications.'
                  }
                </p>
                {item.type === 'video' && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">What you'll learn:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Real-world applications of force principles</li>
                      <li>Interactive demonstrations and examples</li>
                      <li>Problem-solving techniques</li>
                      <li>Common misconceptions clarified</li>
                    </ul>
                  </div>
                )}
                {item.type === 'tool' && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Features:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Interactive calculations and visualizations</li>
                      <li>Step-by-step problem solving</li>
                      <li>Multiple scenarios to explore</li>
                      <li>Instant feedback and explanations</li>
                    </ul>
                  </div>
                )}
                {item.type === 'simulation' && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Simulation features:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Adjust variables and see results in real-time</li>
                      <li>Experiment with different scenarios</li>
                      <li>3D visualizations and animations</li>
                      <li>Data collection and analysis tools</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white font-semibold`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {config.actionText}
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ask Homie
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Content Info */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground">Content Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-foreground font-semibold capitalize">{item.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-foreground font-semibold uppercase">{item.category === 'core' ? 'CORE' : 'GO DEEPER'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground font-semibold">{item.duration}</span>
                  </div>
                  {item.lessons && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lessons</span>
                      <span className="text-foreground font-semibold">{item.lessons} lessons</span>
                    </div>
                  )}
                  {item.pages && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pages</span>
                      <span className="text-foreground font-semibold">{item.pages} pages</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subject</span>
                    <span className="text-foreground font-semibold">Physics</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chapter</span>
                    <span className="text-foreground font-semibold">Ch 8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Content */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground">Related Content</h3>
                <p className="text-sm text-muted-foreground">
                  Explore more resources on force and motion
                </p>
                <Button 
                  variant="outline"
                  className="w-full bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--sidebar-hover))]"
                  onClick={() => navigate('/curiosity')}
                >
                  Browse All Resources
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
