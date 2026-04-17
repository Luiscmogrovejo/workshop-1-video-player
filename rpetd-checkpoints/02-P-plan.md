# P — Plan

**Phase:** Plan
**Checkpoint written:** 2026-04-17

---

## The build plan Claude Code wrote before executing

### Goal

A working browser video player: play/pause, seek bar, volume, fullscreen, playback speed. No framework. No npm. Open `index.html` in a browser tab — it works.

### Files to create

| File | What it contains |
|------|-----------------|
| `index.html` | HTML5 `<video>` element, custom controls markup, `<link>` to style.css, `<script>` to player.js |
| `style.css` | Dark theme, controls bar pinned below video, seek bar full width, hover states |
| `player.js` | All event wiring — play/pause, seek, volume, fullscreen, speed |

### Element IDs (contract between HTML and JS)

```
#player          — the <video> element
#video-container — wrapper div for fullscreen
#controls        — the controls bar div
#btn-play        — play/pause toggle button
#seek            — seek range input
#time-display    — current/total time label
#volume          — volume range input
#speed           — playback speed select
#btn-fullscreen  — fullscreen toggle button
```

### player.js logic map

```
1. Get all element references
2. btnPlay click → video.play() or video.pause()
3. video 'play'  → update button text to ⏸
4. video 'pause' → update button text to ▶
5. video 'loadedmetadata' → set seek.max = video.duration
6. video 'timeupdate'     → seek.value = currentTime, update timeDisplay
7. seek 'input'  → video.currentTime = seek.value
8. volume 'input' → video.volume = volume.value
9. speed 'change' → video.playbackRate = parseFloat(speed.value)
10. btnFS click  → requestFullscreen() / exitFullscreen()
11. document 'fullscreenchange' → toggle active class on btnFS
```

### Line count target

- `index.html`: ~55 lines
- `style.css`: ~90 lines
- `player.js`: ~80 lines
- Total: ~225 lines (acceptable — all three files together still fast to skim live)

### Execution order

1. Write `index.html` — markup only, no JS inline
2. Write `style.css` — dark theme, responsive at 480px
3. Write `player.js` — event wiring IIFE
4. Verify in browser: play, pause, seek, volume, fullscreen, speed
5. Fix any issues found

### Risk mitigations from R phase

- Wrap `video.play()` in `.catch()` — handles autoplay policy
- Call `requestFullscreen()` on `#video-container`, not `<video>`
- Guard `video.duration` with `|| 0` in time formatter
- Set `seek.max` only inside `loadedmetadata`, not on page load

---

*Plan complete. Proceeding to E — Execute.*
