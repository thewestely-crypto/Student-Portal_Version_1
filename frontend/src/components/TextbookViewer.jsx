import { ArrowLeft, BookText, RotateCcw, Sparkles, Highlighter, X, StickyNote as StickyNoteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import FloatingActivityIcon from './FloatingActivityIcon';
import ActivityModal from './ActivityModal';
import StickyNote from './StickyNote';
import { useLearningPack } from '@/hooks/useLearningPack';
import { useHighlights } from '@/hooks/useHighlights';
import { useStickyNotes } from '@/hooks/useStickyNotes';
import { toast } from 'sonner';
import { chapterContent } from '@/data/chapterContent';

export default function TextbookViewer({ lesson, onClose, onXPEarned, onAskHomie }) {
  const [showNotes, setShowNotes] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [floatingXP, setFloatingXP] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [showAskHomieButton, setShowAskHomieButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [showRemoveHighlight, setShowRemoveHighlight] = useState(false);
  const [removeHighlightPosition, setRemoveHighlightPosition] = useState({ top: 0, left: 0 });
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const notesRef = useRef(null);

  // Highlights management
  const { highlights, addHighlight, removeHighlight, isTextHighlighted } = useHighlights('ch8');

  // Sticky notes management
  const { notes, addNote, updateNote, deleteNote, updatePosition } = useStickyNotes('ch8');

  // Get learning pack data for Physics Chapter 8
  const learningPack = chapterContent.physics?.ch8?.learningPack;
  const packState = useLearningPack(learningPack?.packId);

  const handleActivityClick = (item) => {
    setSelectedActivity(item);
    setIsActivityModalOpen(true);
  };

  const handleActivityComplete = (itemId, xpReward) => {
    const earnedXP = packState.completeItem(itemId, xpReward);
    
    if (earnedXP > 0) {
      // Show floating XP text
      setFloatingXP({ amount: earnedXP, timestamp: Date.now() });
      setTimeout(() => setFloatingXP(null), 3000);

      // Show toast notification
      toast.success(`🎉 +${earnedXP} Gems earned!`, {
        duration: 3000
      });

      // Notify parent to update gems counter
      if (onXPEarned) {
        onXPEarned(earnedXP);
      }
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      packState.resetProgress();
      toast.success('Progress reset successfully!');
      // Reset XP in parent
      if (onXPEarned) {
        const currentXP = packState.getTotalXP();
        onXPEarned(-currentXP); // Subtract current XP to reset
      }
    }
  };

  const handleAddNote = () => {
    const newNote = addNote();
    toast.success('New note created!');
  };

  // Handle text selection in notes view
  useEffect(() => {
    if (!showNotes || !notesRef.current) return;

    const handleTextSelection = (e) => {
      // Small delay to ensure selection is complete
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (text && text.length > 0) {
          // Check if selection is within notes area
          const notesElement = notesRef.current;
          const range = selection.getRangeAt(0);
          
          if (notesElement && notesElement.contains(range.commonAncestorContainer)) {
            const rect = range.getBoundingClientRect();
            
            setSelectedText(text);
            setButtonPosition({
              top: rect.bottom + window.scrollY + 5,
              left: rect.left + window.scrollX
            });
            setShowAskHomieButton(true);
          }
        } else {
          setShowAskHomieButton(false);
        }
      }, 10);
    };

    const handleClickOutside = (e) => {
      // Close remove highlight button if clicking outside of highlighted text and button
      if (!e.target.closest('mark[data-highlight-id]') && !e.target.closest('button')) {
        setShowRemoveHighlight(false);
        setHoveredHighlight(null);
      }
    };

    const handleHighlightClick = (e) => {
      const mark = e.target.closest('mark[data-highlight-id]');
      if (mark) {
        const highlightId = mark.getAttribute('data-highlight-id');
        setHoveredHighlight(highlightId);
        const rect = mark.getBoundingClientRect();
        setRemoveHighlightPosition({
          top: rect.bottom + window.scrollY + 5,
          left: rect.left + window.scrollX
        });
        setShowRemoveHighlight(true);
        e.stopPropagation();
      }
    };

    // Listen for mouseup events (when user finishes selecting)
    document.addEventListener('mouseup', handleTextSelection);
    notesRef.current.addEventListener('click', handleHighlightClick);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('click', handleClickOutside);
      if (notesRef.current) {
        notesRef.current.removeEventListener('click', handleHighlightClick);
      }
    };
  }, [showNotes, highlights]);

  const handleAskHomieClick = () => {
    if (selectedText && onAskHomie) {
      onAskHomie(selectedText); // Pass selected text to parent
      setShowAskHomieButton(false);
      setSelectedText('');
      // Clear selection
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleHighlightClick = () => {
    if (selectedText && selectedText.trim().length > 0) {
      // Store the exact selected text without splitting
      // This allows partial selections, multi-line selections, and everything in between
      addHighlight(selectedText.trim());
      toast.success('Text highlighted!');
      
      setShowAskHomieButton(false);
      setSelectedText('');
      // Clear selection
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleRemoveHighlightClick = () => {
    if (hoveredHighlight) {
      removeHighlight(hoveredHighlight);
      toast.success('Highlight removed!');
      setShowRemoveHighlight(false);
      setHoveredHighlight(null);
    }
  };

  // Wrap highlighted text with mark tags
  const highlightText = (text) => {
    if (!highlights.length || !text) return text;
    
    let result = text;
    
    // Sort highlights by length (longest first) to handle overlapping highlights better
    const sortedHighlights = [...highlights].sort((a, b) => b.text.length - a.text.length);
    
    // Track which highlights have been applied to avoid duplicates
    const appliedHighlights = new Set();
    
    sortedHighlights.forEach(highlight => {
      const highlightText = highlight.text.trim();
      
      // Skip empty highlights
      if (!highlightText) return;
      
      // Skip if already processed (avoid double-wrapping)
      if (appliedHighlights.has(highlight.id)) return;
      
      // Handle multi-line highlights (text might contain newlines from selection)
      // Split the highlight text into lines and try to match each part
      const highlightLines = highlightText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      highlightLines.forEach(line => {
        if (!line || result.includes(`data-highlight-id="${highlight.id}"`)) return;
        
        // Escape special regex characters
        const escapedLine = line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Create regex for case-insensitive matching
        // Use word boundaries for better matching
        const regex = new RegExp(`\\b(${escapedLine})\\b`, 'gi');
        
        // If no word boundary match, try without word boundaries
        if (!regex.test(result)) {
          const simpleRegex = new RegExp(`(${escapedLine})`, 'gi');
          if (simpleRegex.test(result)) {
            result = result.replace(simpleRegex, (match, p1, offset) => {
              // Check if we're already inside a mark tag
              const before = result.substring(0, offset);
              const openTags = (before.match(/<mark/g) || []).length;
              const closeTags = (before.match(/<\/mark>/g) || []).length;
              
              if (openTags > closeTags) return match;
              
              appliedHighlights.add(highlight.id);
              return `<mark data-highlight-id="${highlight.id}" class="bg-yellow-300 cursor-pointer hover:bg-yellow-400 transition-colors">${match}</mark>`;
            });
          }
        } else {
          result = result.replace(regex, (match, p1, offset) => {
            // Check if we're already inside a mark tag
            const before = result.substring(0, offset);
            const openTags = (before.match(/<mark/g) || []).length;
            const closeTags = (before.match(/<\/mark>/g) || []).length;
            
            if (openTags > closeTags) return match;
            
            appliedHighlights.add(highlight.id);
            return `<mark data-highlight-id="${highlight.id}" class="bg-yellow-300 cursor-pointer hover:bg-yellow-400 transition-colors">${match}</mark>`;
          });
        }
      });
    });
    
    return result;
  };

  const notesContent = {
    title: "Chapter 8: Force and Laws of Motion",
    sections: [
      {
        heading: "1. Introduction",
        points: [
          "Previous chapter discussed motion in terms of position, velocity, and acceleration.",
          "This chapter explores what causes motion and why speed changes with time.",
          "Main question: Do all motions require a cause? If yes, what is its nature?"
        ]
      },
      {
        heading: "2. Historical Background",
        points: [
          "For centuries, scientists and philosophers debated the cause of motion.",
          "Old belief: Rest is the natural state of an object.",
          "Example: A ball stops rolling after a while.",
          "Galileo Galilei and Isaac Newton challenged this belief.",
          "They developed a new understanding of motion — introducing the concept of force."
        ]
      },
      {
        heading: "3. Concept of Force",
        points: [
          "Everyday observation: Effort is needed to move or stop an object.",
          "Example: Pushing a trolley, pulling a drawer.",
          "Force is described as a push or pull that changes an object's state of motion.",
          "No one can see or taste force — it is only recognized by its effect."
        ]
      },
      {
        heading: "4. Effects of Force",
        points: [
          "A force can:",
          "• Change the state of motion (start, stop, speed up, slow down, change direction).",
          "• Change the shape or size of objects.",
          "Examples:",
          "• Pushing a cart (starts moving).",
          "• Kicking a ball (changes direction and speed).",
          "• Squeezing a rubber ball (changes shape)."
        ]
      },
      {
        heading: "5. Key Diagrams",
        points: [
          "(a) A boy pushes a trolley → motion due to force.",
          "(b) Drawer is pulled → change in position.",
          "(c) Deformation example → change in shape due to force."
        ]
      }
    ]
  };

  return (
    <div className="relative w-full h-full px-8 py-6">
      {/* Header with Back, Reset, and Notes Toggle */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onClose}
          variant="outline"
          className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Path
        </Button>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleResetProgress}
            variant="outline"
            size="sm"
            className="bg-red-600/20 border-red-500/50 text-red-400 hover:bg-red-600/40 hover:border-red-500 hover:text-red-300"
            title="Reset all activity progress"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            onClick={() => setShowNotes(!showNotes)}
            variant="outline"
            className="bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--teal-glow))] hover:border-[hsl(var(--teal-glow))] font-semibold"
          >
            <BookText className="w-4 h-4 mr-2" />
            {showNotes ? 'Back to Textbook' : 'Short Notes'}
          </Button>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="w-full bg-[hsl(var(--card-bg))] rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] relative">
          {showNotes ? (
            /* Notes View with Floating Icons */
            <div className="relative">
              <div ref={notesRef} className="p-8 space-y-6">
                <h1 
                  className="text-3xl font-bold text-foreground mb-8 border-b border-[hsl(var(--card-border))] pb-4"
                  dangerouslySetInnerHTML={{ __html: highlightText(notesContent.title) }}
                />
                
                {notesContent.sections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <h2 
                      className="text-xl font-bold text-[hsl(var(--primary))] mb-3"
                      dangerouslySetInnerHTML={{ __html: highlightText(section.heading) }}
                    />
                    <ul className="space-y-2 text-muted-foreground leading-relaxed">
                      {section.points.map((point, idx) => (
                        <li 
                          key={idx} 
                          className="pl-4"
                          dangerouslySetInnerHTML={{ __html: highlightText(point) }}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Ask Homie & Highlight Buttons - Shows on text selection */}
              {showAskHomieButton && (
                <div
                  className="fixed z-50 flex items-center gap-2"
                  style={{
                    top: `${buttonPosition.top}px`,
                    left: `${buttonPosition.left}px`
                  }}
                >
                  <Button
                    onClick={handleAskHomieClick}
                    size="sm"
                    className="bg-gradient-to-r from-[hsl(var(--green-bright))] to-[hsl(var(--teal-vivid))] hover:from-[hsl(var(--teal-vivid))] hover:to-[hsl(var(--green-bright))] text-[hsl(var(--main-bg))] font-bold shadow-lg animate-pulse"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Ask Homie
                  </Button>
                  <Button
                    onClick={handleHighlightClick}
                    size="sm"
                    variant="outline"
                    className="bg-[hsl(var(--card-bg))] border-[hsl(var(--card-border))] text-foreground hover:bg-yellow-400/20 hover:border-yellow-400 hover:text-foreground shadow-lg"
                  >
                    <Highlighter className="w-3 h-3 mr-1" />
                    Highlight
                  </Button>
                </div>
              )}

              {/* Remove Highlight Button - Shows on hover/click of highlighted text */}
              {showRemoveHighlight && (
                <div
                  className="fixed z-50"
                  style={{
                    top: `${removeHighlightPosition.top}px`,
                    left: `${removeHighlightPosition.left}px`
                  }}
                >
                  <Button
                    onClick={handleRemoveHighlightClick}
                    size="sm"
                    variant="outline"
                    className="bg-red-600/20 border-red-500/50 text-red-400 hover:bg-red-600/40 hover:border-red-500 shadow-lg"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Remove Highlight
                  </Button>
                </div>
              )}

              {/* Floating Activity Icons for Notes View */}
              {learningPack?.items.map((item) => (
                <FloatingActivityIcon
                  key={item.id}
                  item={item}
                  isCompleted={packState.isItemCompleted(item.id)}
                  onClick={() => handleActivityClick(item)}
                  position={item.notesPosition}
                />
              ))}

              {/* Sticky Notes */}
              {notes.map((note) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                  onPositionChange={updatePosition}
                  containerRef={notesRef}
                />
              ))}
            </div>
          ) : (
            /* Textbook Image View with Floating Icons */
            <div className="relative">
              <img
                src={lesson.textbookImage}
                alt={lesson.fullTitle}
                className="w-full h-auto"
                style={{ maxWidth: '100%', display: 'block' }}
              />
              
              {/* Floating Activity Icons for Textbook View */}
              {learningPack?.items.map((item) => (
                <FloatingActivityIcon
                  key={item.id}
                  item={item}
                  isCompleted={packState.isItemCompleted(item.id)}
                  onClick={() => handleActivityClick(item)}
                  position={item.textbookPosition}
                />
              ))}
            </div>
          )}

          {/* Floating XP Notification */}
          {floatingXP && (
            <div className="fixed top-24 right-1/2 transform translate-x-1/2 z-50 animate-float-up">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-2xl px-6 py-3 rounded-full shadow-2xl">
                +{floatingXP.amount} XP
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Modal */}
      <ActivityModal
        item={selectedActivity}
        isOpen={isActivityModalOpen}
        onClose={() => {
          setIsActivityModalOpen(false);
          setSelectedActivity(null);
        }}
        onComplete={handleActivityComplete}
        isAlreadyCompleted={selectedActivity ? packState.isItemCompleted(selectedActivity.id) : false}
      />
    </div>
  );
}