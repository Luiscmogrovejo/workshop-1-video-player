# R — Research

**Phase:** Research
**Checkpoint written:** 2026-04-17

---

## What Claude Code researched before touching a file

### HTML5 `<video>` API surface

The browser `<video>` element exposes a small, stable API. The methods and properties this player needs:

| API | Notes |
|-----|-------|
| `video.play()` | Returns a Promise (rejects on autoplay policy violation) |
| `video.pause()` | Synchronous |
| `video.currentTime` | Read/write — settable for seeking |
| `video.duration` | Available after `loadedmetadata` fires |
| `video.volume` | 0.0–1.0 float |
| `video.playbackRate` | Float; 0.5–2x is the practical range |
| `video.requestFullscreen()` | Returns Promise; call on container div for best results |
| `document.exitFullscreen()` | Exits fullscreen |
| `document.fullscreenElement` | null when not in fullscreen |

### Key events

- `loadedmetadata` — fires when `video.duration` becomes available
- `timeupdate` — fires ~4x/second during playback; use to sync seek bar
- `play` / `pause` — fired by the browser after state transitions
- `fullscreenchange` — fired on `document` when fullscreen state changes

### Traps and gotchas

1. **Autoplay policy:** `video.play()` returns a Promise. If the browser rejects it (no user gesture + not muted), the rejection must be caught or the console fills with unhandled rejections. Always `catch()` the Promise.

2. **Fullscreen target:** Call `requestFullscreen()` on the container `<div>`, not the `<video>` tag — this keeps the custom controls visible in fullscreen mode.

3. **Seek bar timing:** The `timeupdate` event drives the seek bar display. Do NOT drive it with a `setInterval` — `timeupdate` is already rate-limited by the browser and fires at the right cadence.

4. **Duration NaN:** `video.duration` is `NaN` before `loadedmetadata`. Always guard with `|| 0` when displaying.

5. **Mobile Safari:** Requires a user gesture before `play()` succeeds when not muted. The test harness adds `video.muted = true` before the auto-play assertion to satisfy this constraint.

6. **Volume vs muted:** Setting `video.volume = 0` does not set `video.muted = true`. They are independent. The workshop player uses `volume` only — this is fine for demo purposes.

### Public test video

`https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`

Known stable. No authentication. Works cross-origin. Used by Google for media API demos.

---

*Research complete. Proceeding to P — Plan.*
