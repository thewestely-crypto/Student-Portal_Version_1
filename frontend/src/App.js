import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import ContentDetailPage from '@/pages/ContentDetailPage';
import GeneralTopicsPage from '@/pages/GeneralTopicsPage';
import NewsDetailPage from '@/pages/NewsDetailPage';
import AllNewsPage from '@/pages/AllNewsPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="App dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/curiosity/content/:id" element={<ContentDetailPage />} />
          <Route path="/curiosity/topics" element={<GeneralTopicsPage />} />
          <Route path="/curiosity/topics/:id" element={<GeneralTopicsPage />} />
          <Route path="/curiosity/news" element={<AllNewsPage />} />
          <Route path="/curiosity/news/:id" element={<NewsDetailPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;