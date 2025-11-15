// Curiosity Centre Content Data
export const curiosityCentreContent = {
  physics: {
    ch8: {
      items: [
        {
          id: 'cc-video-1',
          type: 'video',
          category: 'core',
          title: 'Real-World Applications of Force',
          description: 'See how forces work in everyday life - from sports to engineering',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
          youtubeUrl: 'https://www.youtube.com/watch?v=example1'
        },
        {
          id: 'cc-tool-1',
          type: 'tool',
          category: 'core',
          title: 'Force Vector Calculator',
          description: 'Interactive tool to calculate and visualize force vectors',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1635070041409-e63e783c9533?w=400&h=300&fit=crop',
          url: '/tools/force-calculator'
        },
        {
          id: 'cc-simulation-1',
          type: 'simulation',
          category: 'go-deeper',
          title: 'Newton\'s Laws Simulator',
          description: 'Advanced physics simulation to experiment with Newton\'s three laws',
          duration: '10 min',
          thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop',
          url: '/simulations/newtons-laws'
        },
        {
          id: 'cc-course-1',
          type: 'course',
          category: 'go-deeper',
          title: 'Advanced Mechanics Course',
          description: 'Deep dive into classical mechanics and advanced force concepts',
          duration: '8 min',
          thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
          lessons: 12,
          url: '/courses/advanced-mechanics'
        },
        {
          id: 'cc-video-2',
          type: 'video',
          category: 'core',
          title: 'Forces in Space Exploration',
          description: 'How astronauts and spacecraft deal with forces in zero gravity',
          duration: '7 min',
          thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
          youtubeUrl: 'https://www.youtube.com/watch?v=example2'
        },
        {
          id: 'cc-book-1',
          type: 'book',
          category: 'go-deeper',
          title: 'The Physics of Motion',
          description: 'Comprehensive guide covering all aspects of force and motion',
          duration: '45 min read',
          thumbnail: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop',
          pages: 120,
          url: '/books/physics-of-motion'
        },
        {
          id: 'cc-tool-2',
          type: 'tool',
          category: 'core',
          title: 'Friction Analyzer',
          description: 'Explore different surfaces and their friction coefficients',
          duration: '4 min',
          thumbnail: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
          url: '/tools/friction-analyzer'
        },
        {
          id: 'cc-simulation-2',
          type: 'simulation',
          category: 'core',
          title: 'Projectile Motion Lab',
          description: 'Simulate projectile trajectories with different forces',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=300&fit=crop',
          url: '/simulations/projectile-motion'
        },
        {
          id: 'cc-video-3',
          type: 'video',
          category: 'go-deeper',
          title: 'Quantum Forces Explained',
          description: 'Beyond classical physics - understanding quantum mechanical forces',
          duration: '9 min',
          thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
          youtubeUrl: 'https://www.youtube.com/watch?v=example3'
        }
      ]
    }
  }
};

// General Topics for "Explore More"
export const generalTopics = [
  {
    id: 'topic-1',
    title: 'Astrophysics',
    description: 'Study of celestial objects, space, and the universe',
    icon: '🌌',
    color: 'from-purple-500 to-indigo-600',
    contentCount: 45
  },
  {
    id: 'topic-2',
    title: 'Space Technology',
    description: 'Rockets, satellites, and space exploration tech',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-600',
    contentCount: 38
  },
  {
    id: 'topic-3',
    title: 'Quantum Mechanics',
    description: 'The physics of the very small - atoms and particles',
    icon: '⚛️',
    color: 'from-pink-500 to-rose-600',
    contentCount: 52
  },
  {
    id: 'topic-4',
    title: 'Renewable Energy',
    description: 'Solar, wind, and sustainable power solutions',
    icon: '⚡',
    color: 'from-green-500 to-emerald-600',
    contentCount: 41
  },
  {
    id: 'topic-5',
    title: 'Robotics & AI',
    description: 'Intelligent machines and automation',
    icon: '🤖',
    color: 'from-orange-500 to-red-600',
    contentCount: 36
  },
  {
    id: 'topic-6',
    title: 'Nanotechnology',
    description: 'Engineering at the molecular scale',
    icon: '🔬',
    color: 'from-teal-500 to-cyan-600',
    contentCount: 29
  },
  {
    id: 'topic-7',
    title: 'Climate Science',
    description: 'Understanding Earth\'s climate and weather patterns',
    icon: '🌍',
    color: 'from-blue-600 to-green-600',
    contentCount: 33
  },
  {
    id: 'topic-8',
    title: 'Biotechnology',
    description: 'Living systems and biological processes',
    icon: '🧬',
    color: 'from-emerald-500 to-teal-600',
    contentCount: 44
  }
];

// Topic-specific content (Astrophysics)
export const topicContent = {
  'topic-1': { // Astrophysics
    title: 'Astrophysics',
    description: 'Explore the mysteries of the cosmos - from black holes to the birth of galaxies',
    items: [
      {
        id: 'astro-video-1',
        type: 'video',
        category: 'core',
        title: 'Introduction to Black Holes',
        description: 'Understanding the most mysterious objects in the universe',
        duration: '8 min',
        thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=example1'
      },
      {
        id: 'astro-simulation-1',
        type: 'simulation',
        category: 'core',
        title: 'Galaxy Formation Simulator',
        description: 'Watch galaxies form and evolve over billions of years',
        duration: '10 min',
        thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
        url: '/simulations/galaxy-formation'
      },
      {
        id: 'astro-video-2',
        type: 'video',
        category: 'go-deeper',
        title: 'Dark Matter and Dark Energy',
        description: 'Exploring the invisible forces shaping our universe',
        duration: '12 min',
        thumbnail: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=300&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=example2'
      },
      {
        id: 'astro-tool-1',
        type: 'tool',
        category: 'core',
        title: 'Star Life Cycle Calculator',
        description: 'Calculate the lifespan and evolution of different star types',
        duration: '5 min',
        thumbnail: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop',
        url: '/tools/star-lifecycle'
      },
      {
        id: 'astro-course-1',
        type: 'course',
        category: 'go-deeper',
        title: 'Cosmology Fundamentals',
        description: 'From the Big Bang to the fate of the universe',
        duration: '15 min',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        lessons: 8,
        url: '/courses/cosmology-fundamentals'
      },
      {
        id: 'astro-simulation-2',
        type: 'simulation',
        category: 'go-deeper',
        title: 'Gravitational Lensing Lab',
        description: 'Experiment with how massive objects bend spacetime and light',
        duration: '9 min',
        thumbnail: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400&h=300&fit=crop',
        url: '/simulations/gravitational-lensing'
      },
      {
        id: 'astro-book-1',
        type: 'book',
        category: 'go-deeper',
        title: 'A Brief History of Time',
        description: 'Stephen Hawking\'s classic guide to the universe',
        duration: '60 min read',
        thumbnail: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=400&h=300&fit=crop',
        pages: 256,
        url: '/books/brief-history-time'
      },
      {
        id: 'astro-video-3',
        type: 'video',
        category: 'core',
        title: 'The Life and Death of Stars',
        description: 'From stellar birth in nebulae to supernova explosions',
        duration: '10 min',
        thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&h=300&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=example3'
      },
      {
        id: 'astro-tool-2',
        type: 'tool',
        category: 'core',
        title: 'Exoplanet Discovery Tool',
        description: 'Analyze data to discover planets around distant stars',
        duration: '7 min',
        thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop',
        url: '/tools/exoplanet-discovery'
      }
    ]
  }
};

// Related News Articles
export const relatedNews = [
  {
    id: 'news-1',
    title: 'NASA Discovers New Forces in Space',
    summary: 'Scientists at NASA have identified unusual gravitational forces near distant galaxies that challenge our understanding of physics.',
    date: '2025-01-10',
    source: 'Space Science Today',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
    category: 'Space',
    readTime: '5 min read',
    content: `NASA scientists have made a groundbreaking discovery that could revolutionize our understanding of fundamental forces in the universe. Using data from the James Webb Space Telescope, researchers observed anomalous gravitational patterns near the edges of distant galaxies.

These unusual force interactions suggest the presence of previously unknown particles or a modification to our understanding of gravity at cosmic scales. The discovery has implications for dark matter research and could help explain the accelerating expansion of the universe.

Dr. Sarah Chen, lead researcher on the project, stated: "What we're seeing challenges the Standard Model of physics. These forces behave differently than anything we've observed before."

The team is conducting further observations and mathematical modeling to understand the nature of these mysterious forces. This discovery could lead to a paradigm shift in theoretical physics and our understanding of the cosmos.`
  },
  {
    id: 'news-2',
    title: 'Breakthrough in Quantum Force Measurement',
    summary: 'Researchers develop a new technique to measure quantum forces with unprecedented precision, opening doors to quantum computing advances.',
    date: '2025-01-08',
    source: 'Quantum Physics Weekly',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    category: 'Quantum',
    readTime: '4 min read',
    content: `A team of physicists at MIT has developed a revolutionary technique for measuring quantum forces at the atomic scale with accuracy never before achieved. This breakthrough could accelerate the development of quantum computers and ultra-sensitive sensors.

The new method uses laser-cooled atoms trapped in an optical lattice, allowing researchers to detect forces as small as 10^-21 Newtons. This level of precision enables the study of quantum phenomena that were previously impossible to measure.

"This is a game-changer for quantum mechanics research," said Professor James Wong. "We can now probe the quantum world with tools that were once thought impossible."

Applications of this technology extend beyond quantum computing. It could lead to advances in materials science, medical imaging, and even the search for new fundamental particles. The research team is already collaborating with tech companies to commercialize the technology.`
  },
  {
    id: 'news-3',
    title: 'Engineers Create Friction-Free Material',
    summary: 'A new synthetic material with near-zero friction could transform transportation and manufacturing industries worldwide.',
    date: '2025-01-05',
    source: 'Engineering Innovation',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop',
    category: 'Engineering',
    readTime: '6 min read',
    content: `Material scientists at Stanford University have created a revolutionary synthetic surface with friction coefficients approaching zero. This breakthrough could dramatically reduce energy consumption in transportation and industrial machinery.

The material, dubbed "Frictionite," uses a unique molecular structure inspired by gecko feet and lotus leaves. When surfaces coated with Frictionite come into contact, they exhibit friction levels 1000 times lower than Teflon.

Dr. Maria Rodriguez, who led the research, explained: "Friction costs the global economy trillions of dollars annually in energy waste and wear. Frictionite could change that fundamentally."

Potential applications include:
- High-speed trains with 50% less energy consumption
- Industrial machinery with extended lifespans
- Medical devices requiring ultra-smooth surfaces
- Aerospace components for improved efficiency

The material is environmentally friendly and can be manufactured at scale. Several automotive companies have already expressed interest in licensing the technology for electric vehicle applications.`
  }
];
