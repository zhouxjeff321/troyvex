# Homepage Camp Banner Mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage Summer Camp banner balanced, content-driven proportions on screens up to 700px wide.

**Architecture:** Preserve the existing inline component and desktop CSS. Add focused overrides inside its existing mobile media query, with a source-level regression test that confirms the mobile rules neutralize the vertical flex-basis bug and set the intended compact dimensions.

**Tech Stack:** Static HTML/CSS, Python standard-library `unittest`

## Global Constraints

- Modify only the inline Summer Camp banner beneath the homepage story section.
- Keep desktop rules, content, colors, decorative orbs, destination, and dark mode unchanged.
- Preserve unrelated worktree changes.

---

### Task 1: Mobile Camp Banner Proportions

**Files:**
- Create: `tests/test_homepage_camp_banner.py`
- Modify: `index.html:60-63`

**Interfaces:**
- Consumes: The existing `@media (max-width: 700px)` rule in `index.html`.
- Produces: Mobile-only `.camp-banner`, `.txt`, `.act`, `.pill`, and heading overrides.

- [ ] **Step 1: Write the failing regression test**

Create a standard-library unit test that reads `index.html`, extracts the mobile
media query, and asserts it contains `flex: 0 1 auto`, compact banner spacing,
a smaller heading, and full-width action/button rules.

- [ ] **Step 2: Run the test to verify it fails**

Run: `python -m unittest tests.test_homepage_camp_banner -v`

Expected: FAIL because the mobile media query does not contain the new rules.

- [ ] **Step 3: Add the minimal mobile CSS overrides**

Use these rules inside the existing media query:

```css
.camp-banner {
  flex-direction: column; align-items: flex-start;
  margin: 3rem auto 2.5rem; padding: 1.75rem 1.25rem; gap: 1.25rem;
}
.camp-banner .txt { flex: 0 1 auto; }
.camp-banner h2 { font-size: 1.75rem; }
.camp-banner .act { width: 100%; align-items: stretch; text-align: center; }
.camp-banner .pill { width: 100%; text-align: center; }
```

- [ ] **Step 4: Run verification**

Run: `python -m unittest tests.test_homepage_camp_banner -v`

Expected: PASS with one test and zero failures.

Run: `python -m unittest discover -s tests -v`

Expected: PASS with zero failures.

- [ ] **Step 5: Commit only the plan, test, and homepage change**

Stage `docs/superpowers/plans/2026-07-10-homepage-camp-banner-mobile.md`,
`tests/test_homepage_camp_banner.py`, and `index.html`, inspect the staged diff,
then commit with a scoped Conventional Commit message.
