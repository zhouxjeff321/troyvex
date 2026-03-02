# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for the Troy High School VEX Robotics program. The site showcases the robotics teams, sponsors, events, and program information.

## Project Structure

- **Static HTML/CSS Website**: No build system, package manager, or JavaScript framework
- **Single CSS file**: `styles.css` contains all styling
- **Single JS file**: `darkmode.js` handles dark mode toggle + mobile navigation
- **16 HTML pages** organized into:
  - **Home/About**: `index.html` (home), `about.html` (detailed about)
  - **Teams**: `teams.html` (overview) + 7 individual team pages (`teama.html` through `teamy.html`)
  - **Program pages**: `sponsors.html`, `events.html`, `awards.html`, `contact.html`
  - **Other**: `donate.html`, `gallery.html`
- **Image assets**: Team photos (`teama-photo.jpg`, etc.), logos (`NJROTC.jpg`, `troyvexlogo.jpg`)
- **Server script**: `serve.py` — custom Python server with extensionless URL support

## Development

### Running the Website Locally

**IMPORTANT**: Do NOT use plain `python -m http.server` or `file://` URLs. The site uses extensionless URLs (`href="about"` instead of `href="about.html"`) which require a server that resolves them automatically.

**Recommended method — custom Python server (pre-configured):**
```bash
python serve.py
```
`serve.py` (project root) maps extensionless requests to `.html` files automatically and serves on port 3000. This is the only method guaranteed to work on this machine.

**Claude Preview integration** — `.claude/launch.json` is configured to start `serve.py` via the `preview_start("troyvex")` tool. Python path used: `C:\Users\ryanz\AppData\Local\Programs\Python\Python313\python.exe`.

**Alternative methods (if serve.py unavailable):**
```bash
# npx serve — requires Node in PATH; on Windows use full path
"C:\Program Files\nodejs\npx.cmd" serve . --single

# http-server with .html extension fallback
npx http-server -p 3000 --ext html

# PHP
php -S localhost:3000
```

Then open `http://localhost:3000` in your browser.

### Cache-Busting

All HTML files reference `darkmode.js` with a version query string (`?v=2`). When `darkmode.js` changes, increment the version in all 16 HTML files:
```bash
sed -i 's|darkmode.js?v=2|darkmode.js?v=3|g' *.html
```

### File Organization
- **Template-based structure**: All pages share identical navigation header
- **Navigation pattern**: Fixed header with logo, dropdown menu for teams, and consistent page links
- **Responsive design**: Mobile-first CSS with media queries in `styles.css`
- **Color scheme**: Black/white theme with red accents (`#b12a34` for highlights)
- **Typography**: Google Fonts 'Geist' family throughout

### CSS Architecture
- **Mobile-first**: Media queries at 768px and 1024px breakpoints
- **Layout systems**: Flexbox for navigation, Grid for content sections
- **Component classes**: `.hero`, `.team-card`, `.sponsor-level`, `.event-card`, `.page-header`
- **Navigation components**: `.navbar`, `.nav-links`, `.dropdown`, `.dropdown-menu`, `.hamburger`, `.menu-overlay`
- **Consistent spacing**: `rem`-based spacing system with `1rem = 16px` base

### Mobile Navigation — Key z-index Stack
| Element | z-index | Notes |
|---|---|---|
| `header` (mobile) | 10000 | Must stay highest so hamburger is always clickable |
| `.hamburger` (mobile) | 9999 | `position: relative` required for z-index to apply |
| `.nav-links` (mobile) | 9998 | Slide-in panel from right |
| `.menu-overlay` (mobile) | 9996 | Dimmed backdrop, closes menu on tap |

**Rule**: Never set `header` z-index below `.nav-links` z-index on mobile — the hamburger button will become unclickable.

## Page Architecture

### Navigation Template (present in all HTML files)
```html
<header>
    <nav class="navbar">
        <div class="logo-container">
            <a href="/"><img src="NJROTC.jpg" alt="Troy VEX Logo" class="logo"></a>
            <span class="logo-text" style="font-size:2rem;">Troy VEX Robotics</span>
        </div>
        <ul class="nav-links">
            <li><a href="about">About</a></li>
            <li class="dropdown">
                <a href="teams">Teams</a>
                <ul class="dropdown-menu">
                    <li><a href="teams">Our Teams</a></li>
                    <li><a href="teama">Team A - Aegis</a></li>
                    <li><a href="teamb">Team B - Ouroboros</a></li>
                    <li><a href="teamc">Team C - Jinx</a></li>
                    <li><a href="teamd">Team D - Nyx</a></li>
                    <li><a href="teame">Team E - Eclipse</a></li>
                    <li><a href="teamx">Team X - Paradox</a></li>
                    <li><a href="teamy">Team Y - Atlantis</a></li>
                </ul>
            </li>
            <li><a href="sponsors">Sponsors</a></li>
            <li class="dropdown">
                <a href="events">Events</a>
                <ul class="dropdown-menu">
                    <li><a href="events">Event List</a></li>
                    <li><a href="gallery">Gallery</a></li>
                </ul>
            </li>
            <li><a href="awards">Awards</a></li>
            <li><a href="donate">Donate</a></li>
        </ul>
    </nav>
</header>
```

### Content Section Patterns
- **Hero sections**: `.hero` class with centered content
- **Team cards**: `.team-card` in grid layout on `teams.html`
- **Team detail pages**: `.team-details` with `.team-info-section`
- **Sponsor tiers**: `.platinum`, `.gold`, `.silver` classes with distinct styling
- **Event cards**: `.event-card` with date and location info

## Common Development Tasks

### Adding New Content
- **New team page**: Copy `teama.html` structure, update team-specific content
- **New team card**: Copy `.team-card` div in `teams.html`, update links and info
- **New sponsor**: Add to appropriate tier section in `sponsors.html`
- **New event**: Copy `.event-card` structure in `events.html`
- **Navigation updates**: Must be updated in all 16 HTML files

### Styling Updates
- **All styling**: Modify `styles.css` — no other CSS files exist (except `about.css`)
- **Component styling**: Search for class names (`.team-card`, `.sponsor-level`, etc.)
- **Responsive adjustments**: Media queries at bottom of `styles.css`
- **Color changes**: Update CSS custom properties or direct color values

### Maintenance Notes
- **Navigation consistency**: Any header/nav changes must be replicated across all 16 HTML files
- **No build process**: Direct file editing only, no compilation or bundling
- **Browser testing**: Test responsive behavior at mobile (≤768px), tablet (769-1024px), desktop (≥1025px)

## Technical Notes

- **Minimal JavaScript**: `darkmode.js` only — handles dark mode + mobile hamburger nav
- **No package.json**: No runtime dependencies
- **No build tools**: No webpack, vite, or other build configuration
- **No frameworks**: No React, Vue, or other JavaScript frameworks
- **Extensionless URLs**: Links use `href="about"` not `href="about.html"` — requires `serve.py` or equivalent
- **Deployment**: Copy all files to any web server or static hosting service
- **Git**: Repository tracks all source files directly

## Refinement Loop

Use this loop for any non-trivial change to keep edits safe, consistent, and easy to review.

1. **Define target outcome**
   - State what should be different for a user after the change.
   - List exactly which files are expected to change.
2. **Inspect before editing**
   - Read the current HTML/CSS for the affected section and identify shared patterns.
   - For navigation edits, identify all pages that must stay in sync.
3. **Make the smallest useful change**
   - Apply one focused edit at a time.
   - Prefer reusing existing classes and layout patterns over creating new ones.
4. **Verify locally**
   - Start server with `preview_start("troyvex")` and validate desktop + mobile views.
   - Check extensionless links, navigation dropdowns, and image paths.
5. **Review for consistency**
   - Confirm styling and spacing match surrounding sections.
   - Confirm repeated structures (especially header/nav) are updated everywhere required.
6. **Document delta**
   - Summarize what changed, why it changed, and any follow-up tasks.
7. **Repeat**
   - If the result is not yet correct, run the loop again with a narrower scope.

### Done Criteria

- Target behavior is visible in browser on mobile and desktop.
- No broken links, missing images, or obvious layout regressions.
- Repeated content remains synchronized across all relevant pages.
