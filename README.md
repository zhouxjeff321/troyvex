# troyvex

Static website for the Troy High School VEX Robotics program.

## Structure

- Root `*.html` files - public route files required for static clean URLs like `/about`.
- `pages/about/` - grouped reference copies for about, alumni, and our work pages.
- `pages/teams/` - grouped reference copies for teams overview and individual team profiles.
- `pages/events/` - grouped reference copies for events and gallery pages.
- `pages/program/` - grouped reference copy for awards.
- `pages/support/` - grouped reference copies for sponsors, donate, join, and contact pages.
- `assets/css/site.css` - bundled stylesheet used by every live page.
- `assets/js/darkmode.js` - dark mode toggle and mobile navigation behavior.
- `assets/images/brand/` - logos and editable brand source files.
- `assets/images/program/` - program history and leadership photos.
- `assets/images/teams/` - team thumbnails, team photos, and robot images.
- `assets/images/events/` - event galleries grouped by season/year.
- `assets/images/people/` - alumni and people-specific portraits.
- `assets/images/ui/` - UI-only assets such as cursor files.
- `docs/troy-vex-sponsorship-proposal.pdf` - downloadable sponsorship packet.
- `archive/mockups/` - non-live design mockups.
- `archive/source-css/css/` - original pre-bundle CSS files kept for reference.
- `archive/screenshots/` - old reference screenshots.

## Local Preview

Use the custom server so extensionless routes like `/about` resolve correctly:

```bash
python serve.py
```

Then open `http://localhost:3000`.
