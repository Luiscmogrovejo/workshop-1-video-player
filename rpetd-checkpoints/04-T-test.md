# T — Test

**Phase:** Test
**Checkpoint written:** 2026-04-17

---

## Test results from `test.html`

### Test harness overview

`test.html` loads the same `player.js` with a hidden duplicate of the DOM structure. After 1 second (to allow `player.js` to initialize), 11 assertions run. Results render as `[PASS]` / `[FAIL]` lines in a `<pre id="results">` element.

Open http://localhost:8000/test.html and read the results.

### Results (human-attested run on 2026-04-17)

```
[PASS] T-01: video element exists in DOM
[PASS] T-02: default playbackRate is 1
[PASS] T-03: default volume is 1
[PASS] T-04: video is initially paused
[PASS] T-05: #btn-play exists
[PASS] T-06: #seek range input exists
[PASS] T-07: #volume range input exists
[PASS] T-08: #speed select exists
[PASS] T-09: speed select has 5 options
[PASS] T-10: #btn-fullscreen exists
[PASS] T-11: clicking play → video.paused becomes false

All 11 tests passed.
```

### What T-11 actually tests

T-11 calls `video.muted = true` then `video.play()`. The `muted` flag is required to satisfy browser autoplay policy in headless/test contexts — the flag does not affect the workshop demo itself (the demo is manually triggered by the presenter clicking play). T-11 asserts `video.paused` becomes `false` after the play Promise resolves.

### Manual checks (not in test.html)

| Check | Result |
|-------|--------|
| Seek bar scrubs video position | PASS — video.currentTime updates |
| Volume range changes audio level | PASS — volume drops at 0.3, near-silent at 0.05 |
| Playback speed at 2x is audibly faster | PASS |
| Fullscreen toggle shows controls | PASS — controls visible inside fullscreen container |
| Console shows `[player]` prefixed logs | PASS — all events logged |
| Mobile Safari test (iOS 17 simulator) | SKIPPED — not available in this environment |

### Open items

- T-11 is sensitive to network: if `BigBuckBunny.mp4` is unreachable (no internet), `play()` rejects with a network error. The fallback plan for live demo is to use a local video file — see README note about fallback.

---

*Test complete. Proceeding to D — Develop.*
