import { useState, useEffect } from 'react';

export function useStickyNotes(chapterId) {
  const storageKey = `sticky_notes_${chapterId}`;
  
  const loadNotes = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load sticky notes:', error);
      return [];
    }
  };

  const [notes, setNotes] = useState(loadNotes);

  // Save to localStorage whenever notes change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save sticky notes:', error);
    }
  }, [notes, storageKey]);

  const addNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      chapterId,
      heading: '', // Optional heading
      content: '',
      position: { x: 100, y: 100 }, // Default position
      isOpen: true, // Start in open/edit mode
      timestamp: new Date().toISOString()
    };
    setNotes(prev => [...prev, newNote]);
    return newNote;
  };

  const updateNote = (noteId, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, ...updates } : note
    ));
  };

  const updatePosition = (noteId, position) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, position } : note
    ));
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const toggleNoteState = (noteId) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, isOpen: !note.isOpen } : note
    ));
  };

  return {
    notes,
    addNote,
    updateNote,
    updatePosition,
    deleteNote,
    toggleNoteState
  };
}
