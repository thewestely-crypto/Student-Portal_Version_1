import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Search, Video, Wrench, FlaskConical, BookOpen, Book, ArrowRight, Clock, Sparkles, ArrowLeft, Star, CheckCircle, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { topicContent, relatedNews } from '@/data/curiosityCentreContent';

export default function TopicContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCore, setShowCore] = useState(true); // Show CORE checkbox
  const [showGoDeeper, setShowGoDeeper] = useState(true); // Show GO DEEPER checkbox
  const [activeTab, setActiveTab] = useState('all'); // Content type filter
  const [searchQuery, setSearchQuery] = useState('');

  // Get topic data
  const topic = topicContent[id];

  // If topic not found, show placeholder
  if (!topic) {
    return (
      <div className="flex flex-col h-full bg-[hsl(var(--main-bg))] overflow-y-auto">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center space-y-4">
            <div className="text-6xl">🚀</div>
            <h2 className="text-3xl font-bold text-foreground">Coming Soon</h2>
            <p className="text-muted-foreground">This topic content is under development</p>
            <Button onClick={() => navigate('/curiosity/topics')}>
              View All Topics
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const contentItems = topic.items || [];

  // Filter content based on category, content type, and search
  const filteredContent = contentItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTab && matchesSearch;
  });

  // Content type config
  const contentTypeConfig = {
    video: { icon: Video, color: 'from-red-500 to-rose-600', buttonText: 'Watch Now' },
    tool: { icon: Wrench, color: 'from-blue-500 to-cyan-600', buttonText: 'Try Tool' },
    simulation: { icon: FlaskConical, color: 'from-purple-500 to-pink-600', buttonText: 'Open Simulation' },
    course: { icon: BookOpen, color: 'from-green-500 to-emerald-600', buttonText: 'Start Course' },
    book: { icon: Book, color: 'from-orange-500 to-amber-600', buttonText: 'Read Now' }
  };

  // Category tabs (CORE / GO DEEPER)
  const categoryTabs = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'core', label: 'CORE', icon: CheckCircle },
    { id: 'go-deeper', label: 'GO DEEPER', icon: Rocket }
  ];

  // Content type tabs
  const contentTypeTabs = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'tool', label: 'Tools', icon: Wrench },
    { id: 'simulation', label: 'Simulations', icon: FlaskConical },
    { id: 'course', label: 'Courses', icon: BookOpen },
    { id: 'book', label: 'Books', icon: Book }
  ];

  const handleContentClick = (item) => {
    navigate(`/curiosity/content/${item.id}`, { state: { item } });
  };

  const handleNewsClick = (news) => {
    navigate(`/curiosity/news/${news.id}`, { state: { news } });
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--main-bg))] overflow-y-auto">
      {/* Back Navigation */}
      <div className="px-6 py-4 border-b border-[hsl(var(--card-border))]">
        <Button
          variant="ghost"
          onClick={() => navigate('/curiosity/topics')}
          className="text-foreground hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--sidebar-hover))]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Topics
        </Button>
      </div>

      {/* Header Section */}
      <div className="px-6 py-6 border-b border-[hsl(var(--card-border))]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] bg-clip-text text-transparent">
            {topic.title}
          </h1>
          <p className="text-lg text-muted-foreground">{topic.description}</p>
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
            placeholder={`Search ${topic.title.toLowerCase()} content...`}
            className="pl-10 bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground h-12"
          />
        </div>

        {/* Filter Tabs - Category + Content Type */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {/* Category Filters */}
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            
            // Special styling for CORE and GO DEEPER
            let activeStyles = 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]';
            if (isActive && tab.id === 'core') {
              activeStyles = 'bg-[hsl(var(--orange-warm))] text-white border-[hsl(var(--orange-warm))]';
            } else if (isActive && tab.id === 'go-deeper') {
              activeStyles = 'bg-gradient-to-r from-purple-500 to-pink-600 text-white border-transparent';
            }
            
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                variant={isActive ? 'default' : 'outline'}
                className={`${
                  isActive
                    ? activeStyles
                    : 'bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-gray-300 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white'
                } flex items-center gap-2 whitespace-nowrap`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}

          {/* Visual Separator */}
          <div className="h-8 w-px bg-[hsl(var(--card-border))] mx-1"></div>

          {/* Content Type Filters */}
          {contentTypeTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={`type-${tab.id}`}
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
          <div className="flex-1">
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

            {/* No results message */}
            {filteredContent.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No content found matching your search</p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Related News Only */}
          <div className="w-80">
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

      {/* Floating Homie Mascot - Bottom Right Corner */}
      <div 
        className="fixed bottom-8 right-8 z-20 cursor-pointer"
        onClick={() => {
          console.log('Homie clicked!');
        }}
      >
        <div className="relative animate-float hover:scale-110 transition-transform duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-2xl glow-green">
            <Sparkles className="w-10 h-10 text-[hsl(var(--main-bg))]" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[hsl(var(--orange-warm))] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[hsl(var(--main-bg))] text-[10px] font-bold">Hi!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
