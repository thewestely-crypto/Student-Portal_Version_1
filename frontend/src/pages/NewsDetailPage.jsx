import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { relatedNews } from '@/data/curiosityCentreContent';

export default function NewsDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const news = location.state?.news;

  if (!news) {
    return (
      <div className="flex items-center justify-center h-screen bg-[hsl(var(--main-bg))]">
        <div className="text-center space-y-4">
          <p className="text-foreground">News article not found</p>
          <Button onClick={() => navigate('/curiosity')}>
            Back to Curiosity Centre
          </Button>
        </div>
      </div>
    );
  }

  // Get other news articles for "Related Articles" section
  const otherNews = relatedNews.filter(n => n.id !== news.id);

  return (
    <div className="min-h-screen bg-[hsl(var(--main-bg))] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[hsl(var(--main-bg))]/95 backdrop-blur-sm border-b border-[hsl(var(--card-border))]">
        <div className="max-w-5xl mx-auto px-6 py-4">
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
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Article Header */}
        <article className="space-y-8">
          {/* Category Badge */}
          <Badge className="bg-[hsl(var(--primary))] text-white text-sm">
            {news.category}
          </Badge>

          {/* Title */}
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            {news.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-muted-foreground pb-6 border-b border-[hsl(var(--card-border))]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(news.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{news.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{news.source}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))]"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))]"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-muted-foreground font-semibold mb-6">
              {news.summary}
            </div>

            <div className="text-foreground leading-relaxed space-y-6 whitespace-pre-line">
              {news.content}
            </div>
          </div>

          {/* Ask Homie CTA */}
          <Card className="bg-gradient-to-br from-[hsl(var(--green-bright))]/20 to-[hsl(var(--teal-vivid))]/20 border-[hsl(var(--primary))]/30 mt-12">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--green-bright))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Want to learn more about this topic?
                  </h3>
                  <p className="text-muted-foreground">
                    Ask Homie to explain the science behind this news or explore related concepts
                  </p>
                </div>
                <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--teal-glow))] text-white font-semibold px-8">
                  Ask Homie
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Articles */}
        {otherNews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-[hsl(var(--primary))]" />
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherNews.map((article) => (
                <Card
                  key={article.id}
                  className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] overflow-hidden hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-xl cursor-pointer group"
                  onClick={() => navigate(`/curiosity/news/${article.id}`, { state: { news: article } })}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-[hsl(var(--primary))] text-white text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <span>{article.source}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--sidebar-hover))]"
                onClick={() => navigate('/curiosity/news')}
              >
                View All News
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
