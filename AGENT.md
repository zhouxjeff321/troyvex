# 🤖 AGENT.md - Troy VEX Robotics Project Guide

Welcome to the **Troy High School NJROTC VEX Robotics** codebase. This document is the source of truth for all agents collaborating on this project.

## 🚀 Project Missions
Construct and maintain a premium, high-performance static website that reflects the excellence of a world-class JROTC robotics program.

---

## 🏗 Codebase Architecture

### Core Tech Stack
- **HTML5**: Pure semantic markup.
- **CSS3**: Vanilla CSS with a heavy focus on custom properties and responsive design.
- **JavaScript**: Minimal, performance-oriented vanilla JS (e.g., `darkmode.js`).
- **Assets**: Root-level image storage with subdirectories for specific team photos and events.

### Global Styles (`styles.css`)
This project uses a central design system defined in `:root`. Always use these variables rather than hardcoding colors.
- **Theming**: Integrated Light/Dark mode via `.dark-mode` class on `body`.
- **Typography**: 
  - `Geist`: Main sans-serif font for all body text and UI.
  - `Serif Header`: Georgia/Times New Roman (often overridden as `.serif-header`) for a high-end editorial look.
- **Cursors**: Custom SVG cursors (`circle_cursor.svg`) are globally enforced for a unique interactive feel.

---

## 🎨 Design System & Patterns

### 1. Glassmorphism (`.glass-card`)
A signature visual style. Use semi-transparent backgrounds with `backdrop-filter: blur(10px)` for high-end UI components.

### 2. Responsiveness
Every change must be "Mobile-First." 
- **Grids**: Use `grid-template-columns: 1fr` on mobile and `1fr 1fr` (or similar) on desktop.
- **Spacing**: Avoid huge fixed paddings; use responsive units or media query overrides.

### 3. Page-Specific CSS
To keep `styles.css` from becoming a monolith, larger pages have their own style sheets:
- `events.css`: Handlers for the competition schedule grid and status badges.
- `about.css`: Detailed layouts for leadership cards and philosophy sections.
- `donate.css`: Specialized formatting for booster club donation information.
- `teams.css`: Layouts for the narrative timeline and team individual pages.

---

## 🛠 Standard Operating Procedures

### Adding a New Page
1. Create the `.html` file in the root directory.
2. Link the global `styles.css` and the theme script `darkmode.js`.
3. If the page is complex, create a dedicated `.css` file for its unique components.
4. Ensure the `navbar` matches precisely across all pages (Copy/Paste the nav block).
5. Verify mobile navigation (Hamburger menu functionality).

### Updating Content
- **Competition Schedule**: Located in `events.html`. Always group by "Upcoming" vs "Completed."
- **Team Info**: Updates should be reflected in `teams.html` and individual team pages (e.g., `teama.html`, `teamb.html`).
- **Impact Copy**: Maintain professional, inspiring tone (military + technical excellence).

---

## 🚫 Restrictions & Taboos
- **NO Frameworks**: Do not install React, Next.js, or Tailwind unless the user specifically demands a total rebuild.
- **NO Placeholder Images**: Use the `generate_image` tool if real assets are missing.
- **NO Inline Styles**: All new styling must go into the appropriate `.css` file.
- **Asset Integrity**: Never rename or move image files without updating all HTML references globally.

---

## 📅 Roadmap / Todo
- [x] Refactor About page for mobile responsiveness.
- [x] Refactor Events page for mobile responsiveness.
- [x] Refactor Donate page for mobile responsiveness.
- [ ] Review Sponsors page for better mobile layout.
- [ ] Audit all team pages for visual consistency.
- [ ] Optimize image loading times.
