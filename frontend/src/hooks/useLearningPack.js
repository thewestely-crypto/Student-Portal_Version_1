import { useState, useEffect } from 'react';

export function useLearningPack(packId) {
  const storageKey = `learningPack_${packId}_progress`;
  
  // Load initial state from localStorage
  const loadProgress = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load learning pack progress:', error);
      return {};
    }
  };

  const [completedItems, setCompletedItems] = useState(loadProgress);

  // Save to localStorage whenever completedItems changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedItems));
    } catch (error) {
      console.error('Failed to save learning pack progress:', error);
    }
  }, [completedItems, storageKey]);

  // Check if an item is completed
  const isItemCompleted = (itemId) => {
    return !!completedItems[itemId];
  };

  // Complete an item (only if not already completed)
  const completeItem = (itemId, xpReward) => {
    if (!completedItems[itemId]) {
      setCompletedItems(prev => ({
        ...prev,
        [itemId]: {
          completedAt: new Date().toISOString(),
          xpEarned: xpReward
        }
      }));
      return xpReward; // Return XP earned for this completion
    }
    return 0; // Already completed, no XP earned
  };

  // Get total XP earned from all completed items
  const getTotalXP = () => {
    return Object.values(completedItems).reduce((sum, item) => sum + (item.xpEarned || 0), 0);
  };

  // Get count of completed items
  const getCompletedCount = () => {
    return Object.keys(completedItems).length;
  };

  // Check if all items in the pack are completed
  const isPackCompleted = (totalItems) => {
    return Object.keys(completedItems).length >= totalItems;
  };

  // Reset all progress (useful for testing)
  const resetProgress = () => {
    setCompletedItems({});
    localStorage.removeItem(storageKey);
  };

  return {
    completedItems,
    isItemCompleted,
    completeItem,
    getTotalXP,
    getCompletedCount,
    isPackCompleted,
    resetProgress
  };
}
