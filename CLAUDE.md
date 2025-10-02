# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for the Troy High School VEX Robotics program. The site showcases the robotics teams, sponsors, events, and program information.

## Project Structure

- **Static HTML/CSS Website**: No build system or package manager (no package.json)
- **Single CSS file**: `styles.css` contains all styling
- **Four main pages**:
  - `index.html` - Home/About page
  - `teams.html` - Team information
  - `sponsors.html` - Sponsor information
  - `events.html` - Event schedule and competitions

## Development

### Running the Website
Simply open any HTML file in a web browser. No build process or server required.

### File Organization
- All pages share the same navigation structure and styling
- Consistent header/footer across all pages
- Responsive design with mobile-friendly CSS
- Color scheme: Blue (#3498db) and dark blue (#2c3e50) theme

### CSS Architecture
- Mobile-first responsive design with media queries
- Grid and flexbox layouts for content organization
- Component-based CSS classes (`.hero`, `.team-card`, `.sponsor-level`, etc.)
- Consistent spacing and typography system

## Content Areas

- **Teams**: Displays team cards with focus areas and team numbers
- **Sponsors**: Three-tier sponsorship system (Platinum, Gold, Silver)
- **Events**: Upcoming and past events with competition schedule
- **About**: Program highlights and mission statement

## Common Development Tasks

- Adding new team cards: Copy existing `.team-card` structure in `teams.html`
- Adding sponsors: Use appropriate sponsor level classes (`.platinum`, `.gold`, `.silver`)
- Adding events: Use `.event-card` structure in `events.html`
- Styling updates: Modify `styles.css` - all styling is centralized

## Notes

- This is a simple static website - no JavaScript, frameworks, or build tools
- All pages follow the same template structure with shared navigation
- The site is designed to be easily maintainable with consistent patterns