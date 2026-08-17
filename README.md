# troyvex

Static website for the Troy High School VEX Robotics program.

## Structure

- Root `*.html` files - canonical public routes required for static clean URLs like `/about`.
- `assets/css/site.css` - shared navigation, footer, layout, and component styles.
- `assets/css/pages/` - route-specific styles loaded only by the pages that need them.
- `assets/js/site.js` - shared image fallback, safe-link, and accessible mobile navigation behavior.
- `assets/js/analytics.js` - deferred Google Analytics and PostHog bootstrap.
- `assets/js/pages/` - route-specific interactions for events and the gallery.
- `assets/images/brand/` - logos and editable brand source files.
- `assets/images/program/` - program history and leadership photos.
- `assets/images/teams/` - team thumbnails, team photos, and robot images.
- `assets/images/events/` - event galleries grouped by season/year.
- `assets/images/people/` - alumni and people-specific portraits.
- `docs/troy-vex-sponsorship-proposal.pdf` - downloadable sponsorship packet.

## Local Preview

Use the custom server so extensionless routes like `/about` resolve correctly:

```bash
python3 serve.py
```

Then open `http://localhost:3000`.

Production CSS and JavaScript are cached immutably. When changing an existing asset, bump its `?v=` value in the HTML so returning visitors receive the update.
