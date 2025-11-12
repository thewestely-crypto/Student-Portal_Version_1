import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mic, Sparkles, Send, BookOpen, FileText, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { chapterContent } from '@/data/chapterContent';

export default function ChatPage({ onNavigateToChapter, totalXP = 1250 }) {
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
    <div className="flex flex-col h-full bg-[hsl(var(--main-bg))]">
      {/* Top Stats Bar - Reusing existing design from RightPanel */}
      <div className="flex items-center justify-end gap-4 px-8 py-4">
        <div className="flex items-center gap-6 bg-[hsl(var(--card-bg))] px-6 py-3 rounded-2xl border border-[hsl(var(--card-border))]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 6l2-2v10l-2 2V6zm14 0l-2-2v10l2 2V6z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 10c-2.5 0-5 1.5-5 3v2h10v-2c0-1.5-2.5-3-5-3z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
            <span className="text-sm font-semibold text-foreground">{totalXP}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5c-3.5 0-6.5 2.5-6.5 5.5 0 4 6.5 8 6.5 8s6.5-4 6.5-8c0-3-3-5.5-6.5-5.5z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">5</span>
          </div>
        </div>
      </div>

      {/* Subject & Chapter Selection - Using gradient card design from LearningPath */}
      <div className="px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] border-0 shadow-xl p-4">
            <div className="flex items-center gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))]/20">
                  <div className="flex items-center gap-2">
                    <Microscope className="w-4 h-4" />
                    <SelectValue placeholder="Subject" />
                  </div>
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
                <SelectTrigger className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))]/20">
                  <SelectValue placeholder="Chapter" />
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

              {/* Chapter Action Buttons - Only show when chapter is selected */}
              {selectedSubject && selectedSubject !== 'none' && selectedChapter && selectedChapter !== 'none' && (
                <>
                  <Button
                    size="sm"
                    className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))]/20"
                    onClick={() => onNavigateToChapter && onNavigateToChapter('textbook')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Full Chapter
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[hsl(var(--main-bg))]/10 backdrop-blur-sm border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))]/20"
                    onClick={() => onNavigateToChapter && onNavigateToChapter('notes')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Short Notes
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            /* Empty State with Suggestions */
            <div className="space-y-12 py-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-foreground">What do you want to know?</h2>
              </div>

              {/* Suggested Queries - Clean Design */}
              <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
                {suggestedQueries.map((query, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg cursor-pointer hover:bg-[hsl(var(--card-bg))] transition-all border border-[hsl(var(--card-border))] hover:border-[hsl(var(--primary))] group"
                    onClick={() => handleSuggestedQuery(query)}
                  >
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{query}</p>
                  </div>
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

      {/* Input Area - Fixed at Bottom - Main Focus */}
      <div className="border-t border-[hsl(var(--card-border))] bg-[hsl(var(--main-bg))] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-[hsl(var(--card-bg))] rounded-xl border-2 border-[hsl(var(--card-border))] focus-within:border-[hsl(var(--primary))] transition-all shadow-lg">
            <MessageCircle className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="flex-1 min-h-[40px] max-h-[200px] bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-base"
              rows={1}
            />
            
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 hover:bg-[hsl(var(--sidebar-hover))] rounded-full"
              title="Voice input"
            >
              <Mic className="w-5 h-5 text-muted-foreground" />
            </Button>

            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white h-10 w-10 p-0 rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
