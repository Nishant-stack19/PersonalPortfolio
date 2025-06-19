# Portfolio Website

## Overview

This is a static portfolio website built with HTML, CSS, and JavaScript. It uses a modern dark theme with blue accents and features a responsive side navigation panel. The site is designed to showcase personal information, skills, projects, and contact details in a professional manner.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML/CSS/JavaScript implementation without any frameworks
- **Responsive Design**: Uses Bootstrap 5.3.0 for responsive grid system and components
- **Dark Theme**: Custom CSS with blue color palette and gradient accents
- **Font Integration**: Google Fonts (Inter, JetBrains Mono) and Font Awesome icons
- **Single Page Application**: Navigation between sections using JavaScript without page reloads

### File Structure
```
/
├── index.html          # Main HTML structure
├── css/styles.css      # Custom styling with CSS variables
├── js/main.js         # JavaScript functionality
├── assets/
│   ├── icons.svg      # SVG icon definitions
│   └── resume.pdf     # Placeholder resume file
└── .replit           # Replit configuration
```

## Key Components

### Navigation System
- **Side Navigation Panel**: Collapsible sidebar with smooth animations
- **Section-based Navigation**: JavaScript-powered smooth scrolling between sections
- **Mobile Responsive**: Toggle functionality for mobile devices
- **Active State Management**: Visual feedback for current section

### Sections Structure
- **Home/Hero**: Landing section with introduction
- **About**: Personal information and background
- **Skills**: Technical skills with animated progress bars
- **Projects**: Portfolio showcase
- **Contact**: Contact information and social links

### Styling System
- **CSS Custom Properties**: Centralized color and spacing variables
- **Dark Theme**: Primary dark (#0a0a0a), secondary (#1a1a1a), tertiary (#2a2a2a)
- **Blue Palette**: Navy blue, royal blue, sky blue, and accent colors
- **Gradient System**: Multiple gradient combinations for visual appeal
- **Typography**: Inter font family for body text, JetBrains Mono for code

## Data Flow

### Client-Side Only
1. **Static File Serving**: Python HTTP server serves static files
2. **DOM Manipulation**: JavaScript handles all interactivity
3. **Event-Driven**: User interactions trigger JavaScript functions
4. **State Management**: Simple JavaScript variables track navigation state
5. **No Backend**: All functionality runs in the browser

### JavaScript Functionality
- Navigation toggle and smooth scrolling
- Intersection Observer for section detection
- Skill bar animations
- Cursor-reactive animations (placeholder for future enhancement)

## External Dependencies

### CDN Resources
- **Bootstrap 5.3.0**: CSS framework for responsive design
- **Font Awesome 6.4.0**: Icon library for UI elements
- **Google Fonts**: Inter and JetBrains Mono font families

### Development Tools
- **Python HTTP Server**: Simple static file serving
- **No Build Process**: Direct file serving without compilation

## Deployment Strategy

### Current Setup
- **Simple Static Hosting**: Python HTTP server on port 5000
- **Replit Deployment**: Configured for Replit hosting environment
- **No Database**: All content is static HTML/CSS/JS

### Scalability Considerations
- Easy migration to any static hosting service (Netlify, Vercel, GitHub Pages)
- CDN integration for better performance
- Image optimization and lazy loading can be added later

### Environment Configuration
- **Multi-language Support**: Configured for Node.js and Python
- **Port Configuration**: Default port 5000 with automatic port detection
- **No Environment Variables**: All configuration is static

## Changelog

```
Changelog:
- June 19, 2025. Initial setup with side navigation
- June 19, 2025. Complete redesign with fixed navigation bar and footer
- June 19, 2025. Added Spline 3D model integration to hero section
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Technical Notes

### Future Enhancements
- The JavaScript file includes placeholders for cursor-reactive 2D animations
- Resume PDF is a placeholder and needs to be replaced with actual content
- Social media links are placeholder and need actual URLs
- Project section content needs to be populated

### Code Organization
- Clean separation of concerns between HTML structure, CSS styling, and JavaScript behavior
- Modern JavaScript practices with strict mode and proper event handling
- CSS custom properties for maintainable theming
- Semantic HTML structure for accessibility

### Performance Considerations
- Minimal JavaScript footprint
- CSS-only animations where possible
- Optimized font loading with display=swap
- Lazy loading ready for future image content