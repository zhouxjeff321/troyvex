# Homepage Camp Banner Mobile Design

## Goal

Correct the proportions of the inline Troy VEX Summer Camp banner beneath the
homepage's "Defining Excellence in JROTC Robotics" section on screens up to
700px wide, without changing its desktop layout or content.

## Cause

The banner switches from a row to a column on mobile, but its text block keeps
the desktop `flex: 1 1 380px` rule. In a column layout, that 380px flex basis
applies vertically and makes the text region much taller than its content.

## Design

Keep the current component and breakpoint. Within the existing mobile media
query:

- reset the text block's flex sizing so its height follows its content;
- reduce outer padding, vertical gap, heading size, and section margins for a
  compact mobile card;
- let the action group and signup link use the banner's available width while
  keeping the limited-spots note aligned with the call to action.

Desktop rules, copy, colors, decorative orbs, link destination, and dark-mode
styling remain unchanged.

## Verification

Add a regression check that reads the homepage CSS and confirms the mobile
media query neutralizes the desktop flex basis and includes the intended
mobile sizing rules. Run that check before and after the CSS change to record
the expected red-green cycle, then run the repository's relevant validation.
