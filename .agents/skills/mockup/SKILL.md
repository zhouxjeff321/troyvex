---
name: mockup
description: Build a single self-contained HTML mockups page with at least 5 distinct design variants BEFORE touching the live site. Use whenever the user asks for any design-level / visual change — redesign, restyle, new layout, "make it look like X", footer/header/hero/section redesign, color or gradient changes, or "give me options/mockups". Serve via serve.py and let the user pick before rolling out.
---

# Mockup Skill

Caveman talk. Short. Simple.

## When to use

User ask for design change → make mockups FIRST. Do not touch live pages yet.

Triggers: "redesign", "restyle", "new look", "make it like [image/site]", "mockups",
"give me options", "redo the footer/header/hero/section", color/gradient/layout changes,
or any image dropped as a design reference.

NOT for: bug fixes, copy/text edits, link fixes, content swaps. Those edit live direct.

## Iron rule

**Never edit the live site until user picks a mockup.** If you already made a live edit,
`git checkout -- .` to revert, THEN make mockups. Live site stays clean while user chooses.

## Steps

1. **Read the target.** Find current markup + CSS for the thing being redesigned. Note
   brand tokens: red `#b12a34`, navy `#0d1b3a`, coral `#e0563f`, font Geist. Match them
   unless user wants a new direction.

2. **Build ONE file:** `mockups/<thing>-mockups.html` (e.g. `mockups/footer-mockups.html`).
   - Self-contained: own `<style>`, no dependency on `site.css`. Works on plain file open
     AND through serve.py.
   - **At least 5 variants** (aim 6). Each visually distinct — not 6 recolors of one idea.
     Vary layout, structure, mood. At least one should closely match any reference image.
   - **Scope every variant's CSS** with a unique prefix (`.m1-`, `.m2-`, ...) so styles
     never collide.
   - Label each variant: number, short name, one-line description of the idea.
   - Use real Troy VEX content (teams, events, sponsors, address) not lorem ipsum.
   - Responsive: stack columns under ~760px.

3. **Serve it.** Make sure serve.py is running (it is `ThreadingHTTPServer` — single-thread
   hangs on Windows, do not revert that). Start detached if needed:
   ```powershell
   Start-Process -FilePath "C:\Users\ryanz\AppData\Local\Programs\Python\Python313\python.exe" -ArgumentList "serve.py" -WorkingDirectory "C:\Users\ryanz\Downloads\troyvex-1" -WindowStyle Hidden
   ```
   Verify with `Invoke-WebRequest http://127.0.0.1:3000/mockups/<thing>-mockups.html`
   (use `127.0.0.1`, not `localhost`). Give the user the `http://localhost:3000/...` URL.

4. **List the options** in chat: number, name, one-line description each. Ask which one
   (mixing/matching is fine).

5. **Roll out after pick.** Take chosen variant → real markup + `assets/css/site.css`.
   - Update footer/header/nav everywhere it repeats: all root `*.html` AND the `pages/`
     copies (use a PowerShell regex replace across files; the markup is identical per page).
   - Bump the `site.css?v=N` cache-buster in every HTML file when CSS changes.
   - Verify on serve.py at mobile + desktop widths.
   - Delete the `mockups/<thing>-mockups.html` scratch file (or leave if user wants it).

## Notes

- Mockup files live in `mockups/` — not live routes, safe to delete.
- Keep each variant tight and polished, not a wireframe. User judges on looks.
- If user drops a reference image, one variant must be a faithful take on it; the rest are
  creative-liberty directions.
