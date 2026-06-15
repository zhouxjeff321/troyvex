# troyvex

Static website for the Troy High School VEX Robotics program.

## Structure

- `index.html` - homepage entry point kept at the project root.
- `pages/about/` - about, alumni, and our work pages.
- `pages/teams/` - teams overview and individual team profile pages.
- `pages/events/` - events and gallery pages.
- `pages/program/` - awards and program-result pages.
- `pages/support/` - sponsors, donate, join, and contact pages.
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
