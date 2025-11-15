import { useState } from 'react';
import { Search, Video, Wrench, FlaskConical, BookOpen, Book, ArrowRight, Clock, Sparkles, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatsBar from '@/components/StatsBar';
import { curiosityCentreContent, generalTopics, relatedNews } from '@/data/curiosityCentreContent';
import { useNavigate } from 'react-router-dom';

export default function CuriosityCentre({ totalXP = 1250 }) {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('physics');
  const [selectedChapter, setSelectedChapter] = useState('ch8');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get content items
  const contentItems = curiosityCentreContent.physics?.ch8?.items || [];

  // Filter content based on active tab and search
  const filteredContent = contentItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Content type config
  const contentTypeConfig = {
    video: { icon: Video, color: 'from-red-500 to-rose-600', buttonText: 'Watch Now' },
    tool: { icon: Wrench, color: 'from-blue-500 to-cyan-600', buttonText: 'Try Tool' },
    simulation: { icon: FlaskConical, color: 'from-purple-500 to-pink-600', buttonText: 'Open Simulation' },
    course: { icon: BookOpen, color: 'from-green-500 to-emerald-600', buttonText: 'Start Course' },
    book: { icon: Book, color: 'from-orange-500 to-amber-600', buttonText: 'Read Now' }
  };

  // Tab config
  const tabs = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'tool', label: 'Tools', icon: Wrench },
    { id: 'simulation', label: 'Simulations', icon: FlaskConical },
    { id: 'course', label: 'Courses', icon: BookOpen },
    { id: 'book', label: 'Books', icon: Book }
  ];

  const subjects = [
    { value: 'physics', label: 'Science (Physics)' }
  ];

  const chapters = [
    { value: 'ch8', label: 'Chapter 8: Force and Laws of Motion' }
  ];

  const handleContentClick = (item) => {
    navigate(`/curiosity/content/${item.id}`, { state: { item } });
  };

  const handleNewsClick = (news) => {
    navigate(`/curiosity/news/${news.id}`, { state: { news } });
  };

  const handleTopicClick = (topic) => {
    navigate(`/curiosity/topics/${topic.id}`, { state: { topic } });
  };

  const handleViewAllTopics = () => {
    navigate('/curiosity/topics');
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--main-bg))] overflow-y-auto">
      {/* Top Section - Gradient Card with Dropdowns (left) + Stats Bar (right) */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Gradient Card with Dropdowns */}
        <div className="flex-1 max-w-3xl">
          <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] border-0 shadow-xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))] font-semibold text-sm h-10">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    {subjects.map(subject => (
                      <SelectItem 
                        key={subject.value} 
                        value={subject.value}
                        className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium"
                      >
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                  <SelectTrigger className="bg-[hsl(var(--main-bg))]/90 border-[hsl(var(--main-bg))]/30 text-white hover:bg-[hsl(var(--main-bg))] font-semibold text-sm h-10">
                    <SelectValue placeholder="Chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
                    {chapters.map(chapter => (
                      <SelectItem 
                        key={chapter.value} 
                        value={chapter.value}
                        className="text-gray-200 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white cursor-pointer font-medium"
                      >
                        {chapter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Stats Bar - Exact copy from CHAT page */}
        <div className="w-96 p-6">
          <StatsBar totalXP={totalXP} />
        </div>
      </div>

      {/* Search and Tabs Section */}
      <div className="px-6 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for videos, tools, simulations..."
            className="pl-10 bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground h-12"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={`${
                  activeTab === tab.id
                    ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]'
                    : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-gray-300 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white'
                } flex items-center gap-2 whitespace-nowrap`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6">
        <div className="flex gap-6">
          {/* Left/Center Content - Card Grid */}
          <div className="flex-1 space-y-8">
            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => {
                const config = contentTypeConfig[item.type];
                const Icon = config.icon;

                return (
                  <Card 
                    key={item.id}
                    className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] overflow-hidden hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-xl cursor-pointer group"
                    onClick={() => handleContentClick(item)}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      <Badge 
                        className={`absolute top-3 left-3 ${
                          item.category === 'core' 
                            ? 'bg-[hsl(var(--orange-warm))] text-white' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                        } font-bold uppercase text-xs px-3 py-1`}
                      >
                        {item.category === 'core' ? 'CORE' : 'GO DEEPER'}
                      </Badge>
                      {/* Type Badge */}
                      <Badge 
                        className={`absolute top-3 right-3 bg-gradient-to-r ${config.color} text-white font-semibold text-xs px-2 py-1 flex items-center gap-1`}
                      >
                        <Icon className="w-3 h-3" />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 space-y-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                      <Button
                        className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white font-semibold`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContentClick(item);
                        }}
                      >
                        {config.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Related News removed from here - moved to sidebar */}
          </div>

          {/* Right Sidebar - Explore More Topics + Related News */}
          <div className="w-80 space-y-6">
            {/* Explore More Topics */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
                  Explore More Topics
                </h3>

                <div className="space-y-3">
                  {generalTopics.slice(0, 4).map((topic) => (
                    <Card
                      key={topic.id}
                      className="bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))] overflow-hidden hover:border-[hsl(var(--primary))] transition-all cursor-pointer group"
                      onClick={() => handleTopicClick(topic)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl`}>
                            {topic.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                              {topic.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">{topic.contentCount} resources</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white font-semibold"
                  onClick={handleViewAllTopics}
                >
                  View All Topics
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Related News - Compact Design */}
            <Card className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))]">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
                  Related News
                </h3>

                <div className="space-y-3">
                  {relatedNews.map((news) => (
                    <Card
                      key={news.id}
                      className="bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))] overflow-hidden hover:border-[hsl(var(--primary))] transition-all cursor-pointer group"
                      onClick={() => handleNewsClick(news)}
                    >
                      <CardContent className="p-3">
                        {/* Horizontal compact layout */}
                        <div className="flex gap-3">
                          {/* Small thumbnail on left */}
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className="absolute top-1 left-1 bg-[hsl(var(--primary))] text-white text-[10px] px-1.5 py-0.5">
                              {news.category}
                            </Badge>
                          </div>
                          
                          {/* Content on right */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="font-bold text-xs text-foreground group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2 leading-tight">
                              {news.title}
                            </h4>
                            <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                              {news.summary}
                            </p>
                            <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1">
                              <span className="truncate">{news.source}</span>
                              <span className="flex-shrink-0 ml-2">{news.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-[hsl(var(--main-bg))] border-[hsl(var(--card-border))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--sidebar-hover))] text-sm"
                  onClick={() => navigate('/curiosity/news')}
                >
                  View All News
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
