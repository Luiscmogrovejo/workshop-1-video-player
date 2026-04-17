# CLAUDE.md — Workshop 1 Live Mode

This file configures Claude Code for the **Workshop 1 live build demo**. Read this file before doing anything else in this repo.

## Tone

Dense, concrete, no corporate speak. Narrate what you are doing in short declarative sentences — the audience is watching. No hedging. No preamble. If you are about to write a file, say the filename. If you found a bug, name it.

## Permission model

Ask before running shell commands that affect the host system. Ask before touching files outside this repository directory. You may freely create and edit files inside `demo-repo/workshop-1-video-player/` without asking.

## RPETD sequence

For the live build, run phases in strict order:

1. **R — Research**: State what you know about the HTML5 video API and what traps to watch for. Write the findings to `rpetd-checkpoints/01-R-research.md`.
2. **P — Plan**: Write the build plan — what files, what each does, what order. Write it to `rpetd-checkpoints/02-P-plan.md`.
3. **E — Execute**: Build the files. Narrate each file as you write it. Write execution notes to `rpetd-checkpoints/03-E-execute.md`.
4. **T — Test**: Open `test.html` results, record what passed. Write to `rpetd-checkpoints/04-T-test.md`.
5. **D — Develop**: A second agent (subagent) reviews the work and signs off. Write to `rpetd-checkpoints/05-D-develop.md`. Do NOT self-validate.

Move to the next phase only after writing the checkpoint file.

## Scope

Browser video player with custom controls using only browser-native APIs:

- Play / Pause toggle
- Seek bar (scrubable)
- Volume control
- Fullscreen toggle
- Playback speed dropdown: 0.5x / 1x / 1.25x / 1.5x / 2x

**Stack:** HTML5 `<video>` element, vanilla CSS, vanilla JavaScript. No framework. No npm. No build step.

**Target size:** under 200 lines total across `index.html`, `style.css`, `player.js`.

## Guardrails

- Do not fetch external dependencies (no CDN, no npm, no framework).
- Do not rewrite an existing file without narrating why. Say: "I am rewriting X because Y."
- Do not skip a checkpoint step. The audience needs to see the methodology, not just the output.
- If something fails, say so clearly and fix it live. Failure is part of the demo.

## Video source

Use the public test video URL for live demos:
```
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
```

This is a known stable public URL. It works without authentication.
