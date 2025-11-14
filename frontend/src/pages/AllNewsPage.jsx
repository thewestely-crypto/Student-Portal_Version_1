import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { relatedNews } from '@/data/curiosityCentreContent';

export default function AllNewsPage() {
  const navigate = useNavigate();

  const handleNewsClick = (news) => {
    navigate(`/curiosity/news/${news.id}`, { state: { news } });
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-[hsl(var(--primary))]" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] bg-clip-text text-transparent">
              Latest Science News
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest discoveries and breakthroughs in physics and related fields
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <Card
              key={news.id}
              className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] overflow-hidden hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-xl cursor-pointer group"
              onClick={() => handleNewsClick(news)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-[hsl(var(--primary))] text-white text-xs">
                  {news.category}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-[hsl(var(--card-border))]">
                  <span className="font-semibold">{news.source}</span>
                  <span>{news.readTime}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(news.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))]/20 to-[hsl(var(--teal-vivid))]/20 border-[hsl(var(--primary))]/30 inline-block">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Want personalized news recommendations?
                </h2>
                <p className="text-muted-foreground">
                  Ask Homie to find news articles related to your current learning topics
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
