# Workshop 1 — Browser Video Player

Built live at **Workshop 1: AI Foundations** by Robert Amauta — 2026-04-17.

This repo is the **finished-state reference** for the live RPETD build demo shown during the workshop. The audience watched Claude Code reproduce this codebase from scratch in ~10 minutes using the Research → Plan → Execute → Test → Develop methodology.

## What this repo shows

- RPETD applied live in Claude Code to ship a vanilla HTML/CSS/JS video player
- How a second agent validates work (the D-phase) instead of self-validation
- How CLAUDE.md shapes Claude Code's behavior during a live session
- Browser-native `<video>` API: play/pause, seek, volume, fullscreen, playback speed

## Run locally

No build step. No npm install. Open a terminal in this directory and run:

```bash
python3 -m http.server 8000
```

Then open: http://localhost:8000/

To run the smoke test: http://localhost:8000/test.html

## File map

| File | Purpose |
|------|---------|
| `index.html` | Video player markup and layout |
| `style.css` | Dark-theme styles, responsive controls |
| `player.js` | Controls logic — wires all HTML5 video API events |
| `test.html` | Browser-based smoke test (open and read PASS/FAIL) |
| `CLAUDE.md` | Workshop-mode Claude Code configuration |
| `rpetd-checkpoints/` | One markdown per RPETD phase — the methodology on paper |
| `transcript/claude-code-live.md` | Anonymized Claude Code session transcript (filled post-broadcast) |

## RPETD Phases

The `rpetd-checkpoints/` directory contains five files showing what each RPETD phase produced:

1. `01-R-research.md` — what Claude Code researched before touching a file
2. `02-P-plan.md` — the structured plan Claude Code wrote before executing
3. `03-E-execute.md` — execution notes: what was built, what was skipped
4. `04-T-test.md` — test results from the smoke test run
5. `05-D-develop.md` — second-agent review and sign-off

## Links

- Portfolio: https://www.robertamauta.com
- Workshop series: see portfolio for schedule
