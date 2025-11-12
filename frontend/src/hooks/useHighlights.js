import { useState, useEffect } from 'react';

export function useHighlights(chapterId) {
  const storageKey = `highlights_${chapterId}`;
  
  const loadHighlights = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load highlights:', error);
      return [];
    }
  };

  const [highlights, setHighlights] = useState(loadHighlights);

  // Save to localStorage whenever highlights change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(highlights));
    } catch (error) {
      console.error('Failed to save highlights:', error);
    }
  }, [highlights, storageKey]);

  const addHighlight = (text) => {
    const newHighlight = {
      id: `highlight-${Date.now()}`,
      chapterId,
      text,
      timestamp: new Date().toISOString()
    };
    setHighlights(prev => [...prev, newHighlight]);
    return newHighlight;
  };

  const removeHighlight = (highlightId) => {
    setHighlights(prev => prev.filter(h => h.id !== highlightId));
  };

  const isTextHighlighted = (text) => {
    return highlights.some(h => h.text === text);
  };

  return {
    highlights,
    addHighlight,
    removeHighlight,
    isTextHighlighted
  };
}
