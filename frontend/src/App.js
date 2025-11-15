import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import CuriosityCentre from '@/pages/CuriosityCentre';
import ContentDetailPage from '@/pages/ContentDetailPage';
import GeneralTopicsPage from '@/pages/GeneralTopicsPage';
import TopicContentPage from '@/pages/TopicContentPage';
import NewsDetailPage from '@/pages/NewsDetailPage';
import AllNewsPage from '@/pages/AllNewsPage';
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="App dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/curiosity" element={
            <Layout activeSection="curiosity">
              <CuriosityCentre />
            </Layout>
          } />
          <Route path="/curiosity/content/:id" element={
            <Layout activeSection="curiosity">
              <ContentDetailPage />
            </Layout>
          } />
          <Route path="/curiosity/topics" element={
            <Layout activeSection="curiosity">
              <GeneralTopicsPage />
            </Layout>
          } />
          <Route path="/curiosity/topics/:id" element={
            <Layout activeSection="curiosity">
              <GeneralTopicsPage />
            </Layout>
          } />
          <Route path="/curiosity/news" element={
            <Layout activeSection="curiosity">
              <AllNewsPage />
            </Layout>
          } />
          <Route path="/curiosity/news/:id" element={
            <Layout activeSection="curiosity">
              <NewsDetailPage />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;