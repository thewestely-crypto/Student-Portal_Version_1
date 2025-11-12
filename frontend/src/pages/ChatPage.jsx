import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mic, Sparkles, Send, BookOpen, FileText, Microscope, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatsBar from '@/components/StatsBar';
import TextbookViewer from '@/components/TextbookViewer';
import HomieChatPanel from '@/components/HomieChatPanel';
import { chapterContent } from '@/data/chapterContent';

export default function ChatPage({ onNavigateToChapter, totalXP = 1250, onXPEarned, onAskHomie }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewingChapter, setViewingChapter] = useState(false);
  const [prefilledText, setPrefilledText] = useState('');
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

  // Get lesson data for selected chapter
  const getLessonData = () => {
    if (selectedSubject === 'physics' && selectedChapter === 'ch8') {
      const chapter = chapterContent.physics.ch8;
      // Create a lesson object with the required properties for TextbookViewer
      return {
        ...chapter,
        fullTitle: chapter.title,
        textbookImage: chapter.subsections && chapter.subsections[0] 
          ? chapter.subsections[0].textbookImage 
          : 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
      };
    }
    return null;
  };

  const handleViewChapter = () => {
    setViewingChapter(true);
  };

  const handleCloseChapterView = () => {
    setViewingChapter(false);
  };

  const handleAskHomieWithText = (selectedText) => {
    setPrefilledText(selectedText);
  };

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
      {/* Top Row - Gradient Card with Dropdowns (left) | Stats Bar (right) */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side: Gradient Card with Dropdowns - EXACT same card as LEARN page */}
        <div className="flex-1 max-w-3xl">
          <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] border-0 shadow-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))] font-semibold text-base h-12">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    <SelectItem value="none" className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium focus:bg-[hsl(var(--sidebar-hover))] focus:text-white">
                      No Subject
                    </SelectItem>
                    {subjects.map(subject => (
                      <SelectItem 
                        key={subject.value} 
                        value={subject.value}
                        className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium focus:bg-[hsl(var(--sidebar-hover))] focus:text-white"
                      >
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select 
                  value={selectedChapter} 
                  onValueChange={setSelectedChapter}
                  disabled={!selectedSubject || selectedSubject === 'none'}
                >
                  <SelectTrigger className="bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))] font-semibold text-base h-12">
                    <SelectValue placeholder="Chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    <SelectItem value="none" className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium focus:bg-[hsl(var(--sidebar-hover))] focus:text-white">
                      No Chapter
                    </SelectItem>
                    {chapters.map(chapter => (
                      <SelectItem 
                        key={chapter.value} 
                        value={chapter.value}
                        className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium focus:bg-[hsl(var(--sidebar-hover))] focus:text-white"
                      >
                        {chapter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chapter Action Button - Changes based on viewing state */}
              {selectedSubject && selectedSubject !== 'none' && selectedChapter && selectedChapter !== 'none' && (
                <Button
                  size="sm"
                  className="bg-[hsl(var(--main-bg))]/20 border-[hsl(var(--main-bg))]/40 text-white hover:bg-[hsl(var(--main-bg))]/30"
                  onClick={viewingChapter ? handleBackToChat : handleViewChapter}
                >
                  {viewingChapter ? (
                    <>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Chat
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Full Chapter
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right side: Stats Bar - EXACT same component, position unchanged */}
        <div className="w-96 p-6">
          <StatsBar totalXP={totalXP} />
        </div>
      </div>

      {/* Main Content Area - Either Chat or Chapter View */}
      {viewingChapter ? (
        /* Chapter Viewer - Show textbook/chapter content */
        <div className="flex-1 overflow-hidden">
          {getLessonData() && (
            <TextbookViewer 
              lesson={getLessonData()}
              onClose={handleBackToChat}
              onXPEarned={onXPEarned}
              onAskHomie={onAskHomie}
            />
          )}
        </div>
      ) : (
        <>
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
            /* Empty State - Reorganized Layout */
            <div className="space-y-8 py-8">
              {/* Heading - Icon and Text on Same Line */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] bg-clip-text text-transparent">
                  Talk to Homie
                </h2>
              </div>

              {/* Input Field - Clean and Simple */}
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  {/* Text field with gradient border and icons inside */}
                  <div className="flex-1 relative p-[2px] rounded-lg bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))]">
                    <div className="flex items-center gap-2 bg-[hsl(var(--card-bg))] rounded-lg px-4 py-3">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Anything..."
                        className="flex-1 min-h-[32px] max-h-[200px] bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
                        rows={1}
                      />
                      
                      {/* Microphone icon - Speech to text */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 hover:bg-[hsl(var(--sidebar-hover))] flex-shrink-0"
                        title="Speech to text"
                      >
                        <Mic className="w-4 h-4 text-muted-foreground" />
                      </Button>

                      {/* Voice interaction icon - Voice to voice */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 hover:bg-[hsl(var(--sidebar-hover))] flex-shrink-0"
                        title="Voice conversation"
                      >
                        <div className="relative w-8 h-8 rounded-full border-2 border-[hsl(var(--primary))] flex items-center justify-center">
                          <div className="flex items-center gap-0.5">
                            <div className="w-0.5 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
                            <div className="w-0.5 h-3 bg-[hsl(var(--primary))] rounded-full"></div>
                            <div className="w-0.5 h-4 bg-[hsl(var(--primary))] rounded-full"></div>
                            <div className="w-0.5 h-3 bg-[hsl(var(--primary))] rounded-full"></div>
                            <div className="w-0.5 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Send button outside */}
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                    className="h-12 w-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Suggested Queries */}
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-2 gap-3">
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

        {/* Input Area - Fixed at Bottom (for conversation view) */}
        {messages.length > 0 && (
        <div className="border-t border-[hsl(var(--card-border))] bg-[hsl(var(--main-bg))] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              {/* Text field with gradient border and icons inside */}
              <div className="flex-1 relative p-[2px] rounded-lg bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))]">
                <div className="flex items-center gap-2 bg-[hsl(var(--card-bg))] rounded-lg px-4 py-3">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Anything..."
                    className="flex-1 min-h-[32px] max-h-[200px] bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
                    rows={1}
                  />
                  
                  {/* Microphone icon - Speech to text */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 hover:bg-[hsl(var(--sidebar-hover))] flex-shrink-0"
                    title="Speech to text"
                  >
                    <Mic className="w-4 h-4 text-muted-foreground" />
                  </Button>

                  {/* Voice interaction icon - Voice to voice */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 hover:bg-[hsl(var(--sidebar-hover))] flex-shrink-0"
                    title="Voice conversation"
                  >
                    <div className="relative w-8 h-8 rounded-full border-2 border-[hsl(var(--primary))] flex items-center justify-center">
                      <div className="flex items-center gap-0.5">
                        <div className="w-0.5 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
                        <div className="w-0.5 h-3 bg-[hsl(var(--primary))] rounded-full"></div>
                        <div className="w-0.5 h-4 bg-[hsl(var(--primary))] rounded-full"></div>
                        <div className="w-0.5 h-3 bg-[hsl(var(--primary))] rounded-full"></div>
                        <div className="w-0.5 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Send button outside */}
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="h-12 w-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
}
