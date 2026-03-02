# agent.md

Runtime notes for AI agents working in this repository. Complements `CLAUDE.md`.

## Starting the Dev Server

Always use `serve.py`, not `python -m http.server`. The plain server does not resolve extensionless URLs and every page except `/` will 404.

```bash
python serve.py           # starts on http://localhost:3000
```

From Claude Code, use the Preview tool:
```
preview_start("troyvex")   # defined in .claude/launch.json
```

Python executable on this machine: `C:\Users\ryanz\AppData\Local\Programs\Python\Python313\python.exe`

## Verifying All Pages Load

After any server or routing change, confirm all 16 pages return 200:

```bash
for path in "/" "/about" "/teams" "/teama" "/teamb" "/teamc" "/teamd" "/teame" \
            "/teamx" "/teamy" "/sponsors" "/events" "/awards" "/contact" \
            "/donate" "/gallery"; do
  code=$(curl -s -o NUL -w "%{http_code}" "http://localhost:3000${path}")
  echo "$code  http://localhost:3000${path}"
done
```

All should return `200`.

## JavaScript / CSS Cache Busting

`darkmode.js` is versioned via query string in every HTML file (`?v=2`). After editing `darkmode.js`, bump the version across all HTML files:

```bash
# Example: increment v=2 to v=3
sed -i 's|darkmode.js?v=2|darkmode.js?v=3|g' *.html
```

Then hard-reload the preview: `location.reload(true)` in the browser console.

## Mobile Navigation Architecture

The hamburger menu is injected by `darkmode.js` at runtime (not in HTML). Key behaviors:

| Behavior | How it works |
|---|---|
| Open | Click `.hamburger` → adds `.active` to hamburger, `.nav-links`, `.menu-overlay` + `body.menu-open` |
| Close via X | Click `.hamburger` again — always visible because `header` z-index (10000) > panel (9998) |
| Close via overlay | Click the dimmed backdrop (`.menu-overlay.active`) on the left side of screen |
| Dropdown accordion | Tap dropdown parent link → toggles `.active` on `.dropdown`; collapses any other open one |
| Close on nav link | Any non-dropdown top-level `<a>` click calls `closeMenu()` |
| Close on sub-link | Any `.dropdown-menu a` click calls `closeMenu()` |

**Critical z-index stack — do not change these without updating all four values together:**

```
header (mobile):     z-index: 10000  ← must be highest so hamburger is always tappable
.hamburger (mobile): z-index: 9999   ← position: relative required for z-index to apply
.nav-links (mobile): z-index: 9998   ← slide-in panel from right
.menu-overlay:       z-index: 9996   ← full-screen dimmed backdrop
```

## Changelog

| Date | Files | Summary |
|---|---|---|
| 2026-03-02 | `serve.py`, `.claude/launch.json` | Added custom Python server with extensionless URL support |
| 2026-03-02 | `darkmode.js`, `styles.css`, all `*.html` | Fixed mobile menu: hamburger z-index, overlay backdrop, close-on-link-tap, dropdown accordion |
