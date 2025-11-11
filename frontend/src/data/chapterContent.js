// Chapter content data structure
export const chapterContent = {
  physics: {
    ch8: {
      title: 'Chapter 8: Force and Laws of Motion',
      learningPack: {
        packId: 'force-basics-pack',
        packTitle: 'Understanding Force',
        items: [
          {
            id: 'watch-force',
            type: 'Watch',
            icon: 'Video',
            title: 'What is Force?',
            duration: '2 min',
            durationSeconds: 12, // Shortened for demo (10-15 seconds)
            description: 'Learn how every push or pull causes motion or changes shape.',
            xpReward: 10,
            // Random positions for textbook view
            textbookPosition: { top: '15%', left: '14%' },
            // Different random positions for notes view
            notesPosition: { top: '25%', right: '12%' }
          },
          {
            id: 'explore-force',
            type: 'Explore',
            icon: 'Microscope',
            title: 'Push, Pull & Hit Simulation',
            duration: '3 min',
            description: 'Try interacting with virtual objects to see how force makes them move or stop.',
            xpReward: 15,
            textbookPosition: { top: '42%', right: '15%' },
            notesPosition: { top: '55%', left: '13%' }
          },
          {
            id: 'practice-force',
            type: 'Practice',
            icon: 'PenTool',
            title: 'Quick Practice: Effects of Force',
            duration: '3 min',
            description: 'Test yourself on how force changes the speed, direction, and shape of objects.',
            xpReward: 20,
            questions: [
              {
                id: 'q1',
                question: 'What happens when force is applied to an object?',
                options: [
                  'It changes color',
                  'It changes motion or shape',
                  'It stays exactly the same',
                  'It becomes invisible'
                ],
                correctIndex: 1
              },
              {
                id: 'q2',
                question: 'Which of these is an example of force?',
                options: [
                  'Thinking about moving',
                  'Pushing a shopping cart',
                  'Standing still',
                  'Sleeping'
                ],
                correctIndex: 1
              },
              {
                id: 'q3',
                question: 'Force can change which of the following?',
                options: [
                  'Only speed',
                  'Only direction',
                  'Speed, direction, and shape',
                  'Nothing at all'
                ],
                correctIndex: 2
              }
            ],
            textbookPosition: { top: '62%', left: '22%' },
            notesPosition: { top: '78%', right: '18%' }
          },
          {
            id: 'curiosity-force',
            type: 'Curiosity',
            icon: 'Lightbulb',
            title: 'Why doesn\'t a ball roll forever?',
            duration: '2 min',
            description: 'Uncover the hidden force that slows objects down over time.',
            content: `Have you ever wondered why a rolling ball eventually stops? The answer lies in a hidden force called friction.

When a ball rolls on the ground, tiny bumps on both the ball and the surface rub against each other. This rubbing creates friction - a force that opposes motion.

Friction acts like an invisible brake, gradually converting the ball's motion energy into heat. The rougher the surface, the stronger the friction, and the faster the ball stops.

Without friction, a ball would roll forever! In space, where there's no air resistance or surface friction, objects keep moving indefinitely once set in motion.

Fun fact: Ice is slippery because it has very low friction. That's why hockey pucks glide so smoothly!`,
            xpReward: 10,
            textbookPosition: { top: '82%', right: '20%' },
            notesPosition: { top: '42%', left: '20%' }
          }
        ]
      },
      subsections: [
        {
          id: '8.1',
          fullTitle: '8.1 Balanced and Unbalanced Force',
          description: 'Learn how forces act on objects and understand the difference between balanced and unbalanced forces. Discover how these forces affect motion and equilibrium.',
          image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
          icon: 'Scale',
          status: 'available',
          position: 'left',
          textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
        },
        {
          id: '8.2',
          fullTitle: '8.2 First Law of Motion',
          description: 'Explore Newton\'s First Law of Motion. Understand inertia and why objects remain at rest or in uniform motion unless acted upon by an external force.',
          image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop',
          icon: 'MoveRight',
          status: 'available',
          position: 'right',
          textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
        },
        {
          id: '8.3',
          fullTitle: '8.3 Inertia and Mass',
          description: 'Dive deep into the concept of inertia and how mass affects an object\'s resistance to changes in motion. Learn through real-world examples.',
          image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop',
          icon: 'Weight',
          status: 'available',
          position: 'right',
          textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
        },
        {
          id: '8.4',
          fullTitle: '8.4 Second Law of Motion',
          description: 'Master Newton\'s Second Law: F = ma. Understand the relationship between force, mass, and acceleration with practical demonstrations.',
          image: 'https://images.unsplash.com/photo-1632053002084-e508e4e0e46f?w=600&h=400&fit=crop',
          icon: 'Gauge',
          status: 'locked',
          position: 'left',
          textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
        },
        {
          id: '8.5',
          fullTitle: '8.5 Third Law of Motion',
          description: 'Discover Newton\'s Third Law: For every action, there is an equal and opposite reaction. See how this applies to everyday phenomena.',
          image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop',
          icon: 'ArrowLeftRight',
          status: 'locked',
          position: 'left',
          textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
        }
      ]
    },
    ch7: {
      title: 'Chapter 7: Motion',
      subsections: [
        {
          id: '7.1',
          fullTitle: '7.1 Introduction to Motion',
          description: 'Begin your journey understanding motion, distance, and displacement.',
          image: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=600&h=400&fit=crop',
          icon: 'MoveRight',
          status: 'available',
          position: 'left',
          textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
        }
      ]
    }
  }
};

// Generic nodes that always appear
export const genericNodes = [
  { 
    id: 'welcome', 
    type: 'start', 
    status: 'active', 
    position: 'center', 
    title: 'Welcome Lesson',
    fullTitle: 'Welcome to Chapter 8: Force and Laws of Motion',
    textbookImage: 'https://customer-assets.emergentagent.com/job_smart-edu-portal-9/artifacts/lu9ucc9u_Screenshot%202025-11-10%20180322.png'
  },
  { id: 'basics', type: 'lesson', status: 'completed', position: 'left', title: 'Basic Concepts' },
  { id: 'practice', type: 'practice', status: 'available', position: 'center', title: 'Practice Session' },
];