# Agent Guide - Troy VEX Robotics

## Codebase Overview
This project is a static website for the Troy High School NJROTC VEX Robotics program. It showcases teams, events, sponsors, and awards.

### Tech Stack
- **Core**: HTML5, CSS3, Vanilla JavaScript.
- **Styling**: `styles.css` containing global styles, variables for theming, and utility classes.
- **Dark Mode**: Implemented via `darkmode.js` and CSS variables (`--bg-color`, `--text-color`, etc.).
- **Server**: Local testing via `http-server`.

## Directory Structure
- `/` (Root): Main HTML pages (`index.html`, `about.html`, `teams.html`, etc.).
- `styles.css`: Main stylesheet.
- `darkmode.js`: Dark mode toggle logic.
- Images: Stored in root or subfolders (e.g., `diamond/`).

## Design Guidelines
- **Aesthetic**: Premium, "Landing Page" style. Clean layouts, clear typography, and high-quality visuals.
- **Typography**: 
  - Primary: 'Geist' (Sans-serif).
  - Headers: 'Playfair Display' (Serif) for a premium feel (`.serif-header`).
- **Components**:
  - **Glass Cards**: `.glass-card` for transparent, blur-effect containers.
  - **Split Layouts**: `.split-section` for text/image pairings.
  - **Badges**: Avoid using small colored "stat badges" (e.g., "Est. 2023") unless explicitly requested; user prefers cleaner looks.
- **Navigation**: Sticky navbar with blur effect. "Our Teams" link must be present in the Teams dropdown on all pages.

## Restrictions & Rules
1.  **Frameworks**: Do NOT introduce heavyweight frameworks (React, Vue, Tailwind) unless explicitly asked. Stick to plain HTML/CSS.
2.  **Files**: Do not modify image files or move them unless necessary.
3.  **Content**: Ensure "Why Sponsor Us" and other impact-related text remains prominent on the Sponsors page.

## Key Files
- `styles.css`: Central point for all visual changes.
- `teams.html`: The hub for team information (keep this simple/functional as per user preference).
- `sponsors.html`: Critical page for donations; prioritization on "Why Sponsor Us" content and clear CTAs.
