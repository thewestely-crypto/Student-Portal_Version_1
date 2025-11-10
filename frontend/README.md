# Homie.ai Learning Dashboard

An AI-powered learning ecosystem dashboard inspired by Duolingo's gamified interface, built with React, Tailwind CSS, and Shadcn UI.

## 🎨 Design Features

### Dark Theme Design System
- **Primary Color**: Vibrant Teal (`hsl(180, 80%, 50%)`)
- **Accent Color**: Bright Green (`hsl(120, 60%, 50%)`)
- **Background**: Deep Navy/Teal (`hsl(200, 18%, 11%)`)
- **Typography**: Space Grotesk & Inter fonts

### Key Components

#### 1. **Left Sidebar Navigation**
- 7 menu items: Learn, Letters, Leaderboards, Quests, Shop, Profile, More
- Active state with teal border highlight
- Icon-based navigation with color-coded items

#### 2. **Top Stats Bar**
- Lessons completed (49)
- Day streak counter (3)
- Total XP earned (505)
- Lives remaining (5)
- Hover effects on all badges

#### 3. **Learning Path (Center)**
- Current lesson card with gradient background
- Interactive learning nodes:
  - **Active Node**: Glowing green with START badge
  - **Completed Node**: Teal with checkmark
  - **Available Node**: Gray with play icon
  - **Locked Node**: Dark gray with lock icon
- Floating mascot character with animation
- Toast notifications for user feedback

#### 4. **Right Panel**
- **Premium Card**: "Try Super for free" upgrade promotion
- **Unlock Leaderboards**: Progress tracker for unlocking features
- **Daily Quests**: XP earning challenges with progress bars

## 🎯 Interactive Features

### Navigation
- Click any sidebar menu item to change active state
- Smooth transitions and hover effects

### Learning Nodes
- Click active nodes to start lessons (shows success toast)
- Completed nodes show achievement feedback
- Locked nodes display helpful unlock messages

### Visual Effects
- Floating mascot with CSS animation
- Glowing/pulsing effects on active elements
- Gradient cards with depth and shadows
- Smooth hover transitions throughout

## 🛠️ Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: Shadcn UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner (toast library)
- **Routing**: React Router DOM

## 🎭 Design System Tokens

All colors are defined as HSL tokens in `index.css`:

```css
--sidebar-bg: 200 25% 8%
--main-bg: 200 18% 11%
--card-bg: 200 20% 14%
--teal-vivid: 180 80% 50%
--green-bright: 120 60% 50%
--purple-accent: 270 60% 60%
--orange-warm: 25 95% 53%
```

## 📱 Responsive Design

- Desktop-optimized layout (1920x1080)
- Three-column layout: Sidebar | Content | Right Panel
- Flexible components that adapt to content

## 🎨 Animation Classes

- `animate-float`: Smooth floating animation
- `animate-pulse-glow`: Pulsing glow effect
- `hover-lift`: Subtle lift on hover
- Custom transitions using cubic-bezier curves

## 🚀 Running the App

```bash
cd /app/frontend
yarn start
```

Visit `http://localhost:3000` to view the dashboard.

## 📝 Mock Data

This is a **frontend-only prototype** with mock functionality:
- All data is hardcoded for demonstration
- Node interactions trigger toast notifications
- No backend integration (prototype phase)
- Focus on UI/UX and visual design

## ✨ Future Enhancements

- Backend API integration for real data
- User authentication and profiles
- Actual lesson content and progression tracking
- Real-time leaderboards
- Achievement system
- Analytics dashboard for teachers/admins

---

**Built with ❤️ for Homie.ai - Empowering students through AI-powered learning**
