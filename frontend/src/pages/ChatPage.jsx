import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mic, Sparkles, Send, BookOpen, FileText, Zap, Flame, Gem, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { chapterContent } from '@/data/chapterContent';

export default function ChatPage({ onNavigateToChapter }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Get available subjects and chapters
  const subjects = [
    { value: 'physics', label: 'Science (Physics)' }
  ];

  const chapters = selectedSubject === 'physics' 
    ? [
        { value: 'ch8', label: 'Chapter 8: Force and Laws of Motion' }
      ]
    : [];

  // Suggested queries
  const suggestedQueries = [
    "What is Newton's First Law of Motion?",
    "Explain force and its effects",
    "What is the relationship between force, mass, and acceleration?",
    "Give examples of balanced and unbalanced forces"
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I understand you're asking about "${inputValue}". ${selectedSubject && selectedChapter ? `Let me explain this in the context of ${chapters.find(c => c.value === selectedChapter)?.label || 'your selected chapter'}.` : 'Let me help you with that.'}\n\nThis is a mock response. In production, this would be connected to Homie AI to provide detailed, context-aware explanations.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuery = (query) => {
    setInputValue(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Context Selectors */}
      <div className="p-6 border-b border-[hsl(var(--card-border))] bg-[hsl(var(--card-bg))]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chat with Homie</h1>
              <p className="text-sm text-muted-foreground">Your AI learning companion</p>
            </div>
          </div>

          {/* Optional Context Selection */}
          <div className="flex gap-3">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[200px] bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))]">
                <SelectValue placeholder="Subject (Optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Subject</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={selectedChapter} 
              onValueChange={setSelectedChapter}
              disabled={!selectedSubject || selectedSubject === 'none'}
            >
              <SelectTrigger className="w-[280px] bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))]">
                <SelectValue placeholder="Chapter (Optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Chapter</SelectItem>
                {chapters.map(chapter => (
                  <SelectItem key={chapter.value} value={chapter.value}>
                    {chapter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedSubject && selectedSubject !== 'none' && selectedChapter && selectedChapter !== 'none' && (
              <div className="flex items-center px-3 py-2 bg-[hsl(var(--primary))]/10 rounded-md text-sm text-[hsl(var(--primary))]">
                Context: {chapters.find(c => c.value === selectedChapter)?.label}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            /* Empty State with Suggestions */
            <div className="space-y-8 py-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">What do you want to know?</h2>
                <p className="text-muted-foreground">Ask me anything, and I'll help you learn!</p>
              </div>

              {/* Suggested Queries */}
              <div className="grid grid-cols-2 gap-4">
                {suggestedQueries.map((query, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:bg-[hsl(var(--sidebar-hover))] transition-colors border-[hsl(var(--card-border))] bg-[hsl(var(--card-bg))]"
                    onClick={() => handleSuggestedQuery(query)}
                  >
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-1" />
                      <p className="text-sm text-foreground">{query}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-[hsl(var(--primary))] text-white'
                        : 'bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] text-foreground'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-[hsl(var(--primary))]">Homie</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-4 bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="border-t border-[hsl(var(--card-border))] bg-[hsl(var(--card-bg))] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                className="w-full min-h-[56px] max-h-[200px] p-4 pr-12 bg-[hsl(var(--main-bg))] border border-[hsl(var(--card-border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] resize-none"
                rows={1}
              />
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white h-[56px] px-6"
            >
              <Send className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              className="h-[56px] w-[56px] p-0 border-[hsl(var(--card-border))] hover:bg-[hsl(var(--sidebar-hover))]"
              title="Voice input"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
