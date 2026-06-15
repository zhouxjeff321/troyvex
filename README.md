# troyvex

Static website for the Troy High School VEX Robotics program.

## Structure

- `*.html` - live pages kept at the project root for clean URLs.
- `assets/css/site.css` - bundled stylesheet used by every live page.
- `assets/js/darkmode.js` - dark mode toggle and mobile navigation behavior.
- `assets/images/` - all site images, logos, robots, team photos, and gallery media.
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
