# AGENT.md - Troy VEX Robotics Project Guide

This document is the source of truth for all agents collaborating on the Troy High School NJROTC VEX Robotics website project.

## Project Mission

Construct and maintain a professional, high-performance static website that accurately represents a world-class JROTC robotics program. The site should prioritize:

- Clean, maintainable code over trendy effects
- Fast load times and accessibility
- Mobile-first responsive design
- Professional appearance suitable for academic/military context

---

## Codebase Architecture

### Core Technologies

- **HTML5**: Semantic markup with proper document structure
- **CSS3**: Vanilla CSS with CSS custom properties for theming
- **JavaScript**: Minimal, performance-oriented vanilla JS (only `darkmode.js`)
- **Assets**: Root-level image storage with subdirectories for team/event photos

### File Structure

```
/
|-- index.html          # Homepage
|-- about.html          # About the program
|-- teams.html          # Teams overview
|-- team[a-y].html      # Individual team pages (7 total)
|-- sponsors.html       # Sponsor showcase
|-- events.html         # Competition schedule
|-- awards.html         # Awards and achievements
|-- contact.html        # Contact information
|-- donate.html         # Donation page
|-- gallery.html        # Photo gallery
|-- styles.css          # Global stylesheet (single source of truth)
|-- darkmode.js         # Theme toggle functionality
|-- NJROTC.jpg          # Logo asset
|-- team[a-y]-photo.jpg # Team photos
|-- teamphotos.jpg      # Group photo
|-- README.md           # Public documentation
|-- CLAUDE.md           # Development guidance
|-- AGENT.md            # This file
|-- skills.md           # Required competencies
```

### Global Styles (`styles.css`)

The project uses a centralized design system. Always reference and extend existing patterns rather than creating new ones.

**Key design tokens:**
- Primary accent: `#b12a34` (red)
- Typography: 'Geist' for UI text, Georgia/Times for editorial headers
- Dark mode: Controlled via `.dark-mode` class on `body`
- Custom cursor: `circle_cursor.svg` for interactive elements

---

## Development Environment

### Running the Site Locally

**Important**: Do NOT use `file://` protocol or `localhost` without a proper server. The site uses extensionless URLs (`href="about"` not `href="about.html"`) which require server-side URL rewriting.

**Primary method - using npx:**
```bash
# Serve the current directory on port 3000
npx serve . --single

# Then open http://localhost:3000 in your browser
```

**Alternative methods:**
```bash
# Python 3
python -m http.server 3000

# Node http-server
npx http-server -p 3000 --ext html

# PHP
php -S localhost:3000
```

The `--single` flag (or SPA mode) is required to properly handle the extensionless URLs.

### Browser Testing

Test at these breakpoints:
- Mobile: ≤768px
- Tablet: 769px - 1024px
- Desktop: ≥1025px

---

## Design System

### Visual Principles

1. **Clean over complex**: Avoid excessive animations, glassmorphism, or trendy effects
2. **Consistent spacing**: Use the existing `rem`-based spacing scale
3. **Semantic HTML**: Use proper heading hierarchy, landmark elements, and ARIA labels
4. **Performance first**: Minimize HTTP requests, optimize images, avoid render-blocking resources

### Component Patterns

**Navigation**
- Fixed header with logo, dropdown menus, and consistent page links
- Must be identical across all 14 HTML files
- Mobile hamburger menu with slide-out drawer

**Content Sections**
- `.hero`: Centered, prominent header sections
- `.split-section`: Two-column layouts (text + image)
- `.card`: Bordered content containers with consistent padding
- `.page-header`: Section title areas

**Team Pages**
- `.team-details`: Main container for team information
- `.team-info-section`: Grouped content blocks
- Team roster tables with consistent styling

---

## Development Standards

### Code Quality Rules

1. **No inline styles**: All styling belongs in `styles.css`
2. **No duplicate CSS**: Extend existing utility classes
3. **Semantic HTML**: Use `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` appropriately
4. **Accessibility**: Include `alt` text, proper contrast ratios, keyboard navigation
5. **No frameworks**: Do not add React, Vue, Tailwind, etc. without explicit approval
6. **Validate HTML**: Run through W3C validator before committing

### Adding New Pages

1. Create the `.html` file in the root directory
2. Copy the navigation block from an existing page (lines 17-50 in `index.html`)
3. Link `styles.css` and `darkmode.js`
4. Use existing CSS classes for layout and styling
5. Update all navigation blocks if adding a new top-level link
6. Test responsive behavior at all breakpoints

### Updating Content

- **Competition Schedule**: Located in `events.html`
- **Team Info**: Update both `teams.html` and individual team pages
- **Sponsors**: Maintain tier structure (Platinum/Gold/Silver) in `sponsors.html`
- **Navigation**: Must be updated in all 14 HTML files simultaneously

### Image Management

- Store images in root directory or appropriate subdirectories
- Use descriptive filenames (e.g., `teama-robot.jpg` not `IMG_1234.jpg`)
- Optimize images before committing (compress JPGs, minimize PNGs)
- Update all HTML references if moving/renaming image files

---

## Restrictions

### Do Not

- Install JavaScript frameworks or CSS preprocessors
- Use inline styles (style attributes) - move to CSS file
- Add placeholder images - use actual assets or request them
- Rename or move image files without updating all references
- Use `!important` in CSS without documentation
- Add excessive animations or trendy effects
- Break navigation consistency across pages

### Do

- Test locally with `npx serve . --single` before committing
- Validate HTML and CSS
- Follow existing naming conventions
- Maintain mobile-first responsive design
- Keep the professional, academic tone in all copy

---

## Roadmap

- [ ] Audit all pages for inline style removal
- [ ] Consolidate duplicate CSS patterns
- [ ] Review sponsors page mobile layout
- [ ] Standardize team page structures
- [ ] Optimize image loading with lazy loading
- [ ] Add print stylesheets for awards/events pages
