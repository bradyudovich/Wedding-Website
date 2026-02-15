# Wedding Website

A beautiful, single-page React application that functions as a multi-page wedding website with English/Spanish language support.

## Features

- 🎨 **Modern Design**: Clean, elegant interface with Tailwind CSS
- 🌐 **Multi-language**: Toggle between English and Spanish instantly
- 📱 **Responsive**: Mobile-friendly layout
- 🚀 **Fast**: Built with Vite for optimal performance
- 🗺️ **Multiple Pages**: Home, Travel Information, FAQ, and RSVP

## Tech Stack

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Google Fonts** - Poppins & Playfair Display

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bradyudovich/Wedding-Website.git
cd Wedding-Website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Wedding-Website/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation bar with language toggle
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Travel.jsx          # Travel information page
│   │   └── FAQ.jsx             # Frequently asked questions page
│   ├── App.jsx                 # Main app component with routing
│   ├── LanguageContext.jsx     # Language state management
│   ├── translations.js         # English/Spanish translations
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── index.html                  # HTML template
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies and scripts
```

## Language Support

The website supports English and Spanish. Toggle between languages using the button in the navigation bar. All content updates instantly thanks to React Context API.

## Design Specifications

- **Background**: Soft off-white (#F9F8F6)
- **Fonts**: 
  - Poppins for UI elements and body text
  - Playfair Display for headings
- **Color Scheme**: Rose/pink accents for a romantic feel

## License

This project is private and intended for personal use.
