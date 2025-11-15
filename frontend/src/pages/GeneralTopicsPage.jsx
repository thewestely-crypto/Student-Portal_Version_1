import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { generalTopics } from '@/data/curiosityCentreContent';

export default function GeneralTopicsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter topics based on search query
  const filteredTopics = generalTopics.filter(topic => {
    const searchLower = searchQuery.toLowerCase();
    return topic.title.toLowerCase().includes(searchLower) ||
           topic.description.toLowerCase().includes(searchLower);
  });

  const handleTopicClick = (topic) => {
    navigate(`/curiosity/topics/${topic.id}`, { state: { topic } });
  };

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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-[hsl(var(--primary))]" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] bg-clip-text text-transparent">
              Explore Topics
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into fascinating subjects beyond your curriculum. Discover advanced concepts and cutting-edge science.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="pl-12 bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground h-14 text-lg"
            />
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTopics.map((topic) => (
            <Card
              key={topic.id}
              className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] overflow-hidden hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-2xl cursor-pointer group"
              onClick={() => handleTopicClick(topic)}
            >
              <CardContent className="p-0">
                {/* Gradient Header with Icon */}
                <div className={`h-32 bg-gradient-to-br ${topic.color} flex items-center justify-center text-6xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {topic.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <Badge className="bg-[hsl(var(--main-bg))] text-[hsl(var(--primary))] border border-[hsl(var(--card-border))]">
                      {topic.contentCount} resources
                    </Badge>
                    <ArrowRight className="w-5 h-5 text-[hsl(var(--primary))] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        ) : (
          /* No Results Message */
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="text-6xl">🔍</div>
              <h2 className="text-2xl font-bold text-foreground">No topics found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any topics matching "{searchQuery}". Try a different search term.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--sidebar-hover))]"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))]/20 to-[hsl(var(--teal-vivid))]/20 border-[hsl(var(--primary))]/30 inline-block">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Can't find what you're looking for?
                </h2>
                <p className="text-muted-foreground">
                  Ask Homie to help you discover more topics and resources
                </p>
                <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white font-semibold">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Talk to Homie
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
