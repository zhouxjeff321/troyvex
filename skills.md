# Skills and Knowledge Guide

This document outlines the skills, tools, and methodologies required to effectively work on the Troy VEX Robotics website.

---

## Core Technical Skills

### HTML5

- **Semantic markup**: Use proper elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- **Document structure**: Proper heading hierarchy (h1 > h2 > h3), landmark regions
- **Accessibility**: ARIA labels, alt text, focus management, keyboard navigation
- **SEO basics**: Meta tags, semantic structure, link relationships
- **Validation**: W3C HTML validator compliance

### CSS3

- **CSS Variables**: Custom properties for theming (`--primary-color`, etc.)
- **Flexbox**: One-dimensional layouts, alignment, justification
- **CSS Grid**: Two-dimensional layouts, grid-template-columns/rows, gaps
- **Responsive design**: Media queries, fluid units, mobile-first approach
- **Selectors**: Specificity management, BEM-like naming conventions
- **Performance**: Avoid expensive properties (box-shadow, filter), minimize reflows
- **Clean code**: No `!important` without justification, grouped selectors by purpose

### JavaScript (Minimal Usage)

- **DOM manipulation**: querySelector, addEventListener, classList
- **Local storage**: Persistence for theme preferences
- **Event delegation**: Efficient event handling
- **No frameworks**: Write vanilla JS only

---

## Development Tools

### Local Development Server

**Required**: The site uses extensionless URLs (`href="about"` not `href="about.html"`), requiring proper server configuration.

**Primary command:**
```bash
npx serve . --single
```

**Alternatives:**
```bash
# Python 3
python -m http.server 3000

# Node http-server
npx http-server -p 3000 --ext html

# PHP built-in server
php -S localhost:3000
```

**Why `--single` is required:** The extensionless URLs need URL rewriting to work. The `--single` flag treats all routes as the index file, allowing the server to resolve `href="about"` to `about.html`.

### Version Control (Git)

- **Atomic commits**: One logical change per commit
- **Descriptive messages**: Explain what and why, not just what
- **Branch naming**: Use descriptive branch names (e.g., `fix-mobile-nav`, `update-team-b`)
- **Asset management**: Never commit without verifying file references are updated

---

## Design Principles

### Visual Design

- **Typography**:
  - Geist font family for UI elements and body text
  - Georgia/Times for editorial headers
  - Consistent sizing scale (1rem = 16px base)

- **Color system**:
  - Primary accent: `#b12a34` (red)
  - Neutral palette: Black, white, grays
  - Dark mode support via CSS variables

- **Spacing system**:
  - rem-based spacing (0.5rem, 1rem, 1.5rem, 2rem, 3rem)
  - Consistent margins and padding
  - No magic numbers (use variables)

### Layout Principles

- **Mobile-first**: Base styles for mobile, enhance for larger screens
- **Container width**: Max-width constraints for readability (1200px typical)
- **Grid systems**: Use CSS Grid for complex layouts, Flexbox for linear arrangements
- **Responsive breakpoints**:
  - Mobile: default styles
  - Tablet: `@media (min-width: 768px)`
  - Desktop: `@media (min-width: 1024px)`

### User Experience

- **Navigation**: Consistent across all pages, clear current-page indication
- **Load performance**: Optimize images, minimize CSS/JS, use semantic HTML
- **Accessibility**: WCAG 2.1 AA compliance target
- **Professional tone**: Academic/military appropriate content and styling

---

## Project-Specific Knowledge

### File Structure

- **14 HTML pages**: All in root directory
- **Single CSS file**: `styles.css` contains all styling
- **Single JS file**: `darkmode.js` for theme toggle
- **Assets**: Root-level images, subdirectories for team/event photos

### Content Organization

- **Teams**: 7 teams (A, B, C, D, E, X, Y) with individual pages
- **Events**: Competition schedule with date, location, status
- **Sponsors**: Tiered structure (Platinum, Gold, Silver)
- **Navigation**: Extensionless URLs require server configuration

### Maintenance Patterns

- **Navigation updates**: Must be synchronized across all 14 HTML files
- **Styling**: All changes go in `styles.css`, no inline styles
- **Images**: Optimize before adding, use descriptive filenames
- **Testing**: Verify all breakpoints, test with local server

---

## Quality Standards

### Code Review Checklist

Before submitting changes:

- [ ] HTML validates (W3C validator)
- [ ] No inline styles (moved to CSS file)
- [ ] Navigation consistent across all pages (if modified)
- [ ] Mobile layout tested (≤768px)
- [ ] Tablet layout tested (769px - 1024px)
- [ ] Desktop layout tested (≥1025px)
- [ ] Images optimized and properly referenced
- [ ] No broken links
- [ ] Dark mode tested (if applicable)
- [ ] Site runs correctly with `npx serve . --single`

### Anti-Patterns to Avoid

- **Vibecoding**: Avoid trendy effects (excessive animations, glassmorphism, parallax)
- **Framework bloat**: Don't add React, Vue, Tailwind, etc.
- **Inline styles**: Keep all CSS in `styles.css`
- **Magic numbers**: Use CSS variables for repeated values
- **Deep nesting**: Keep selectors shallow (max 3 levels)
- **Placeholder content**: Use real content or request it

---

## Deployment Considerations

### Hosting Requirements

- Static file hosting (no server-side processing needed)
- URL rewriting support for extensionless URLs (or configure server to handle `.html` extensions)
- HTTPS for production

### Pre-Deployment Checklist

- [ ] All links work correctly
- [ ] Images load properly
- [ ] CSS loads without errors
- [ ] Mobile navigation functions
- [ ] Dark mode toggle works
- [ ] No console errors
- [ ] Performance audit (Lighthouse score)

---

## Resources

- **W3C HTML Validator**: https://validator.w3.org/
- **W3C CSS Validator**: https://jigsaw.w3.org/css-validator/
- **MDN Web Docs**: https://developer.mozilla.org/
- **WebAIM Accessibility**: https://webaim.org/
- **Can I Use**: https://caniuse.com/ (browser support)
