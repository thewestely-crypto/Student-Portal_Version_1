// Chapter content data structure
export const chapterContent = {
  physics: {
    ch8: {
      title: 'Chapter 8: Force and Laws of Motion',
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