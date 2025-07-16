# Advanced Pokemon Table - React | Next JS | React-Query | Typescript | SSR | Tailwind CSS

A modern, server-side rendered Pokemon application built with Next.js, React Query, and shadcn/ui components.

![Next JS](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React Query](https://img.shields.io/badge/React_Query-5.17-red?style=for-the-badge&logo=react-query)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 **Comprehensive Pokémon Details**

- **High-Resolution Images**: Official artwork and sprites
- **Detailed Statistics**: Base stats with visual progress bars
- **Abilities System**: Normal and hidden abilities with descriptions
- **Move Database**: Complete moveset with filtering by damage class
- **Species Information**: Capture rate, growth rate, habitat, and more

### 📊 **Evolution System**

- **Evolution Triggers Table**: Comprehensive table view of all evolution methods
- **Interactive Pagination**: Navigate through evolution trigger data

### ⚡ **Performance Optimizations**

- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js Image component with WebP/AVIF support

## Getting Started

### Installation

1. **Clone the repository**

```js
   git clone https://github.com/your-username/pokemon-table-app.git
   cd pokemon-table-app
```

2. **Install dependencies**

```js
  npm install
```

3. **Start the development server**

```js
 npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```js

# Development

npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server

# Code Quality

npm run lint # Run ESLint

```

## 🏗️ Project Structure

```js

pokemon-table-app/
├── app/ # Next.js App Router
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ ├── loading.tsx # Loading UI
│ └── page.tsx # Home page SSR
├── components/ # React components
│
│ ├── ui/ # shadcn/ui components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ ├── table.tsx
│ │ └── ...
│ ├── evolution-trigger-table
│ ├── pokemon-dialog.tsx # Enhanced Pokémon modal
│ ├── pokemon-list-loading.tsx # Client-side table wrapper
│ ├── pokemon-list.tsx # Server-side data fetching
├── hooks/ # Custom React hooks
│ ├── use-pokemon.ts # Pokémon data hooks (React Query)
│ ├── use-debounces.ts # Enhanced util hooks
│ └── use-pagination.ts
├── lib/ # Utility libraries
│ ├── api # All the fetch apis
│ ├── fetcher # util function for fetch api
│ └── utils.ts # Utility functions
├── types/ # TypeScript type definitions
│ └── index.ts # Pokémon type definitions
├── public/ # Static assets
├── .eslint.config.mjs # ESLint configuration
├── .gitignore # Git ignore rules
├── next.config.mjs # Next.js configuration
├── package.json # Dependencies and scripts
├── postcss.config.mjs # PostCSS configuration
└── tsconfig.json # TypeScript configuration

```

## 🛠️ Technology Stack

### **Frontend Framework**

- **[Next.js 14](https://nextjs.org/)**: React framework with App Router
- **[React 18](https://reactjs.org/)**: UI library with concurrent features
- **[TypeScript 5.3](https://www.typescriptlang.org/)**: Type-safe JavaScript

### **State Management & Data Fetching**

- **[TanStack React Query 5](https://tanstack.com/query)**: Server state management

### **UI Components & Styling**

- **[shadcn/ui](https://ui.shadcn.com/)**: Re-usable component library
- **[Tailwind CSS 3.4](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icons

## 📡 API Integration

### **PokéAPI Integration**

- **Base URL**: `https://pokeapi.co/api/v2/`
- **Endpoints Used**:

- `/pokemon` - Pokémon list and details

## 🚀 Deployment

### **Vercel Deployment** (Recommended)

1. **Connect Repository**

```js

# Install Vercel CLI

npm i -g vercel

# Deploy

vercel

```

2. **Environment Variables**

- No environment variables required (uses public PokéAPI)

3. **Build Configuration**
   ```js
   {
   "buildCommand": "npm run build",
   "outputDirectory": ".next",
   "framework": "nextjs"
   }
   ```
