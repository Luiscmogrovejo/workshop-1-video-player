# E — Execute

**Phase:** Execute
**Checkpoint written:** 2026-04-17

---

## What executing looked like

### Files created in order

**1. `index.html`** (57 lines)

HTML5 `<video id="player">` with `src` pointing to BigBuckBunny public test URL. Custom controls div `#controls` with:
- `#btn-play` button — starts as ▶, switches to ⏸ on play
- `#seek` range input — `max` set dynamically from `loadedmetadata`
- `#time-display` span — `0:00 / 0:00` format
- `#volume` range input — step 0.05, initial value 1
- `#speed` select — five options: 0.5x / 1x / 1.25x / 1.5x / 2x
- `#btn-fullscreen` button — Unicode ⛶ icon

**2. `style.css`** (95 lines)

Dark theme (`#0d0d0d` body, `#141414` controls bar). Key decisions:
- `video { width: 100%; max-height: 500px; }` — responsive at any container width
- `.seek-bar { flex: 1; }` — seek bar fills available space between buttons
- `accent-color: #4a90d9` on both range inputs — native range thumb color without custom track CSS
- `.ctrl-btn.active` — `#1e3a5f` background for play-active and fullscreen-active states
- `@media (max-width: 480px)` — labels hidden, volume bar narrowed

**3. `player.js`** (87 lines)

IIFE (`(function() { 'use strict'; ... }())`). All event listeners inside the IIFE — no globals. Key implementation notes:
- `fmt(secs)` helper: floors to integer, pads seconds to 2 digits
- `log(msg)` helper: prefixes every event with `[player]` for live console visibility
- `video.play()` returned Promise caught with `.catch(log)` — handles autoplay policy silently
- `seek.max = video.duration` set inside `loadedmetadata` handler — duration is NaN before that event

**Deviation from plan:** play Promise rejection is caught and logged, not swallowed — changed from plan's `.catch()` with empty handler to `log()` so the audience sees what happened.

### Verification steps run during execution

1. Opened `index.html` via `python3 -m http.server 8000`
2. Confirmed video loads and starts buffering (network tab shows 206 Partial Content)
3. Clicked play — ▶ switched to ⏸, `[player] play` logged
4. Dragged seek bar — video jumped, `[player] seek → 0:15` logged
5. Changed speed to 2x — `[player] playbackRate → 2` logged
6. Toggled fullscreen — controls remain visible inside fullscreen container
7. Confirmed volume drag changes `video.volume` in DevTools

### Issues found and fixed during execution

| Issue | Fix |
|-------|-----|
| Fullscreen on `<video>` hid custom controls | Changed `requestFullscreen()` target to `#video-container` |
| Time display showed `NaN:NaN` before metadata loaded | Added `|| 0` guard in `fmt()` call for duration |

---

*Execution complete. Proceeding to T — Test.*
