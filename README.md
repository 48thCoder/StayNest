# StayNest

A modern PG (Paying Guest) accommodation platform built with React, Vite, and TailwindCSS. StayNest helps users find premium PG accommodations across India's top cities with a beautiful, responsive interface.

## Features

- **Property Listings**: Browse and search PG accommodations with filtering options
- **Detailed PG Pages**: View comprehensive information about each property
- **Responsive Design**: Fully responsive UI that works on all devices
- **Smooth Animations**: Modern animations using Framer Motion
- **Intuitive Navigation**: Easy-to-use navigation with smooth scrolling
- **Modern UI**: Clean, contemporary design with TailwindCSS

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Installation

1. Clone the repository:
```bash
git clone https://github.com/48thCoder/StayNest.git
cd StayNest/Frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
StayNest/
├── Frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── assets/      # Image assets
│   │   ├── components/  # React components
│   │   ├── data/        # Mock data
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   ├── index.css    # Global styles
│   │   └── main.jsx     # Entry point
│   ├── index.html       # HTML template
│   ├── package.json     # Dependencies
│   └── vite.config.js   # Vite configuration
└── README.md
```

## Components

- **Navbar**: Navigation with logo and menu
- **Footer**: Footer with links and social icons
- **Hero**: Landing hero section
- **FeaturedListings**: Showcases featured PG properties
- **PGCard**: Individual property card component
- **HowItWorks**: Explains the platform's workflow
- **Testimonials**: User testimonials section
- **FiltersSidebar**: Search and filter panel

## Pages

- **HomePage**: Main landing page
- **ListingsPage**: Browse all PG listings
- **PGDetailPage**: Detailed view of a specific PG

## License

This project is open source and available under the MIT License.
