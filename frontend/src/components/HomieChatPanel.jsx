import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Flag, Flame, Diamond, Heart, Sparkles, Send, Mic, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock images for demo
const mockImages = [
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=200&h=150&fit=crop'
];

const mockVideos = [
  { title: 'Introduction to Force', duration: '3:45' },
  { title: 'Newton\'s Laws Explained', duration: '5:20' }
];

const mockSources = [
  // Sources removed as per requirement
];

export default function HomieChatPanel({ totalXP = 0, onClose, prefilledText = '', onClearPrefilledText }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [contextText, setContextText] = useState('');
  const messagesEndRef = useRef(null);

  // Handle prefilled text from text selection - show as context box, not in input
  useEffect(() => {
    if (prefilledText) {
      setContextText(prefilledText);
      // Clear prefilled text after setting
      if (onClearPrefilledText) {
        onClearPrefilledText();
      }
    }
  }, [prefilledText, onClearPrefilledText]);

  const baseGems = 505;
  const currentGems = baseGems + totalXP;

  const stats = [
    { icon: Flag, value: 2, label: 'Lessons', gradient: 'from-blue-400 via-blue-500 to-blue-600', shine: false },
    { icon: Flame, value: 2, label: 'Day Streak', gradient: 'from-orange-400 via-orange-500 to-red-500', shine: false },
    { icon: Diamond, value: currentGems, label: 'Gems', gradient: 'from-purple-400 via-fuchsia-500 to-pink-500', shine: true },
    { icon: Heart, value: 5, label: 'Lives', gradient: 'from-pink-400 via-rose-500 to-rose-600', shine: false },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Combine context + question seamlessly
    let finalQuestion = inputText;
    if (contextText) {
      finalQuestion = `Context: "${contextText}"\n\nQuestion: ${inputText}`;
    }

    // Add conversation (question + answer with resources)
    const conversation = {
      id: Date.now(),
      question: finalQuestion,
      answer: 'Force is a push or pull that changes an object\'s motion or shape. It can make things start moving, stop moving, speed up, slow down, or change direction. Forces are measured in Newtons (N) and are described by Newton\'s Laws of Motion.',
      images: mockImages,
      videos: mockVideos,
      sources: mockSources,
      activeTab: 'all', // all, images, videos, sources
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, conversation]);
    setInputText('');
    setContextText(''); // Clear context after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToText = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Voice-to-Text: Recording started... (Demo mode)', {
        duration: 2000
      });
      // Simulate voice-to-text (replace with actual implementation)
      setTimeout(() => {
        setInputText('What is force in physics?');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleTalkToHomie = () => {
    toast.info('Talk to Homie: Voice conversation started! (Demo mode)', {
      duration: 2000
    });
  };

  const handleTabChange = (messageId, tab) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, activeTab: tab } : msg
    ));
  };

  const handleCloseContext = () => {
    setContextText('');
  };

  return (
    <div className="w-96 bg-[hsl(var(--sidebar-bg))] border-l border-[hsl(var(--card-border))] flex flex-col h-screen">
      {/* Stats Bar - Always Visible */}
      <div className="p-6 pb-4">
        <Card className="bg-gradient-to-r from-[hsl(var(--card-bg))] to-[hsl(var(--card-bg))]/80 border-[hsl(var(--card-border))] overflow-hidden shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center justify-between gap-2">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer flex items-center gap-2"
                  >
                    <div className={`relative w-9 h-9 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${stat.shine ? 'animate-pulse' : ''}`}>
                      <Icon className={`w-4 h-4 text-white drop-shadow-lg ${stat.shine ? 'animate-pulse' : ''}`} />
                      {stat.shine && (
                        <>
                          <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-yellow-300 animate-pulse" />
                          <Sparkles className="absolute -bottom-0.5 -left-0.5 w-2 h-2 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </>
                      )}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300`} />
                    </div>
                    <div className="text-lg font-bold text-foreground drop-shadow-sm">
                      {stat.value}
                    </div>
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(var(--teal-vivid))]/10 to-[hsl(var(--green-bright))]/10 -z-10 blur-xl" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Close Button */}
      <div className="px-6 pb-2">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--sidebar-hover))]"
        >
          <X className="w-4 h-4 mr-2" />
          Close Chat
        </Button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          /* Empty State - "Talk to Homie" */
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-2xl glow-green animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] bg-clip-text text-transparent">
                Talk to Homie
              </h3>
              <p className="text-muted-foreground text-sm">
                Your AI Learning Companion
              </p>
            </div>
          </div>
        ) : (
          /* Chat Messages - New Format */
          <>
            {messages.map((conversation) => (
              <div key={conversation.id} className="space-y-4 mb-6 pb-6 border-b border-[hsl(var(--card-border))]">
                {/* Question - Left Aligned */}
                <div className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-4">
                  <p className="text-white font-semibold text-base leading-relaxed">
                    {conversation.question}
                  </p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {conversation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={conversation.activeTab === 'all' ? 'default' : 'outline'}
                    onClick={() => handleTabChange(conversation.id, 'all')}
                    className={conversation.activeTab === 'all' 
                      ? 'bg-[hsl(var(--primary))] text-white' 
                      : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-gray-300 hover:bg-[hsl(var(--sidebar-hover))]'
                    }
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={conversation.activeTab === 'images' ? 'default' : 'outline'}
                    onClick={() => handleTabChange(conversation.id, 'images')}
                    className={conversation.activeTab === 'images' 
                      ? 'bg-[hsl(var(--primary))] text-white' 
                      : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-gray-300 hover:bg-[hsl(var(--sidebar-hover))]'
                    }
                  >
                    Images
                  </Button>
                  <Button
                    size="sm"
                    variant={conversation.activeTab === 'videos' ? 'default' : 'outline'}
                    onClick={() => handleTabChange(conversation.id, 'videos')}
                    className={conversation.activeTab === 'videos' 
                      ? 'bg-[hsl(var(--primary))] text-white' 
                      : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-gray-300 hover:bg-[hsl(var(--sidebar-hover))]'
                    }
                  >
                    Videos
                  </Button>
                  <Button
                    size="sm"
                    variant={conversation.activeTab === 'sources' ? 'default' : 'outline'}
                    onClick={() => handleTabChange(conversation.id, 'sources')}
                    className={conversation.activeTab === 'sources' 
                      ? 'bg-[hsl(var(--primary))] text-white' 
                      : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-gray-300 hover:bg-[hsl(var(--sidebar-hover))]'
                    }
                  >
                    Sources
                  </Button>
                </div>

                {/* Content based on active tab */}
                {(conversation.activeTab === 'all' || conversation.activeTab === 'images') && (
                  /* Images Section */
                  <div className="overflow-x-auto">
                    <div className="flex gap-3 pb-2">
                      {conversation.images.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`Result ${idx + 1}`}
                          className="w-32 h-24 object-cover rounded-lg border border-[hsl(var(--card-border))] flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {conversation.activeTab === 'videos' && (
                  /* Videos Section - Only show when Videos tab is clicked */
                  <div className="space-y-2">
                    {conversation.videos.map((video, idx) => (
                      <div key={idx} className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-3 flex items-center gap-3 hover:bg-[hsl(var(--sidebar-hover))] cursor-pointer transition-colors">
                        <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-2xl">▶️</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{video.title}</p>
                          <p className="text-xs text-muted-foreground">{video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {conversation.activeTab === 'sources' && (
                  /* Sources Section - Only show when Sources tab is clicked */
                  <div className="space-y-2">
                    {conversation.sources.map((source, idx) => (
                      <div key={idx} className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-3 hover:bg-[hsl(var(--sidebar-hover))] cursor-pointer transition-colors">
                        <p className="text-sm text-[hsl(var(--primary))] font-medium hover:underline">{source.title}</p>
                      </div>
                    ))}
                  </div>
                )}

                {conversation.activeTab === 'all' && (
                  /* Answer Section - Show in All tab (directly after images) */
                  <div className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-lg p-4">
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {conversation.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 pt-2 space-y-3 border-t border-[hsl(var(--card-border))]">
        {/* Context Box - Shows selected text */}
        {contextText && (
          <div className="bg-[hsl(var(--card-bg))] border-2 border-[hsl(var(--primary))]/30 rounded-lg p-3 relative">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-[hsl(var(--primary))] mb-1">Selected context:</p>
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                  "{contextText}"
                </p>
              </div>
              <Button
                onClick={handleCloseContext}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Text Input + Send */}
        <div className="flex items-center gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Anything..."
            className="flex-1 bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            size="icon"
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Voice Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleVoiceToText}
            size="icon"
            variant="outline"
            className={`${
              isRecording
                ? 'bg-red-600 border-red-600 text-white animate-pulse'
                : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))]'
            }`}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleTalkToHomie}
            variant="outline"
            className="flex-1 bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))]"
          >
            Talk to Homie
          </Button>
        </div>
      </div>
    </div>
  );
}
