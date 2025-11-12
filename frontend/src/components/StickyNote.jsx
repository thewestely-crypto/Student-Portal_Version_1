import { useState, useRef, useEffect } from 'react';
import { StickyNote as StickyNoteIcon, X, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StickyNote({ note, onUpdate, onDelete, onPositionChange, containerRef }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    if (note.isOpen) return; // Don't drag when open
    
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (noteRef.current && containerRef?.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Calculate new position relative to container
        let newX = e.clientX - containerRect.left - dragOffset.x;
        let newY = e.clientY - containerRect.top - dragOffset.y;
        
        // Keep within container bounds
        const noteWidth = noteRef.current.offsetWidth;
        const noteHeight = noteRef.current.offsetHeight;
        
        newX = Math.max(0, Math.min(newX, containerRect.width - noteWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - noteHeight));
        
        onPositionChange(note.id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, note.id, onPositionChange, containerRef]);

  const handleHeadingChange = (e) => {
    onUpdate(note.id, { heading: e.target.value });
  };

  const handleContentChange = (e) => {
    onUpdate(note.id, { content: e.target.value });
  };

  const handleSave = () => {
    onUpdate(note.id, { isOpen: false });
  };

  const handleClose = () => {
    // Just close/minimize without deleting
    onUpdate(note.id, { isOpen: false });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this note permanently?')) {
      onDelete(note.id);
    }
  };

  const handleIconClick = () => {
    if (!note.isOpen) {
      onUpdate(note.id, { isOpen: true });
    }
  };

  if (note.isOpen) {
    // Open/Edit mode - larger card with heading and textarea
    return (
      <div
        ref={noteRef}
        className="absolute z-50 bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow-lg p-4 min-w-[280px] max-w-[400px]"
        style={{
          left: `${note.position.x}px`,
          top: `${note.position.y}px`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StickyNoteIcon className="w-5 h-5 text-yellow-700" />
            {note.heading && (
              <span className="text-sm font-semibold text-yellow-900">{note.heading}</span>
            )}
          </div>
          <Button
            onClick={handleClose}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-yellow-200"
          >
            <X className="w-4 h-4 text-yellow-800" />
          </Button>
        </div>
        
        <input
          type="text"
          value={note.heading}
          onChange={handleHeadingChange}
          placeholder="Heading (optional)"
          className="w-full mb-2 p-2 bg-yellow-50 border border-yellow-300 rounded text-sm font-semibold text-gray-800 placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        
        <textarea
          value={note.content}
          onChange={handleContentChange}
          placeholder="Type your note here..."
          className="w-full min-h-[120px] p-2 bg-yellow-50 border border-yellow-300 rounded text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
          autoFocus={!note.heading}
        />
        
        <div className="mt-3 flex justify-between items-center">
          <Button
            onClick={handleDelete}
            size="sm"
            variant="outline"
            className="bg-red-100 border-red-300 text-red-700 hover:bg-red-200"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <Save className="w-3 h-3 mr-1" />
            Save & Minimize
          </Button>
        </div>
      </div>
    );
  } else {
    // Minimized mode - small draggable icon
    return (
      <div
        ref={noteRef}
        className={`absolute z-40 bg-yellow-400 border-2 border-yellow-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all ${
          isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'
        }`}
        style={{
          left: `${note.position.x}px`,
          top: `${note.position.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleIconClick}
        title={note.heading || "Click to open note"}
      >
        <StickyNoteIcon className="w-5 h-5 text-yellow-900" />
      </div>
    );
  }
}
