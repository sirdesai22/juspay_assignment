# Dashboard Application

A modern, feature-rich dashboard application built with React, TypeScript, and Vite. This application provides a comprehensive admin interface with data visualization, order management, and analytics capabilities.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd juspay_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🛠️ Tech Stack

### Core
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **ShadCN** - Component framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful icon library
- **next-themes** - Seamless theme switching

### Data Visualization
- **Recharts** - Composable charting library for React
- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (buttons, inputs, etc.)
│   ├── dashboard.tsx   # Main dashboard layout
│   ├── header.tsx      # Top navigation header
│   ├── sidebar.tsx     # Side navigation menu
│   ├── order-list.tsx  # Order management interface
│   ├── chart.tsx       # Projections vs Actuals chart
│   ├── sales-chart.tsx # Sales analytics chart
│   └── ...             # Other feature components
├── lib/                # Utility functions
├── assets/             # Static assets
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## 🎯 Key Components

### Order List
- Enabled filtering and sorting capabilities
- Real-time search with animated results
- Selection management with checkboxes
- Pagination support (with enough data)
- Smooth animations and micro-interactions

### Charts
- **Sales Chart** - Line chart showing current vs previous week sales with projections
- **Projections vs Actuals** - Stacked bar chart with enhanced hover tooltips
- Custom tooltips with detailed information and smooth animations

### Dashboard
- Stat cards with key metrics
- Multiple chart visualizations
- Responsive grid layouts
- Theme-aware styling

## 🎨 Theme Support

The application supports both dark and light themes. Users can:
- Toggle between themes using the theme switcher
- Use system preference detection
- Experience seamless theme transitions