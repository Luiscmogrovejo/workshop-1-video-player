/* player.js — Workshop 1 video player controller
 * Vanilla JS. No framework. Target: <80 lines.
 * All events logged with [player] prefix for live demo visibility.
 */

(function () {
  'use strict';

  // ── Element references ───────────────────────────────────────────────────
  const video    = document.getElementById('player');
  const btnPlay  = document.getElementById('btn-play');
  const seek     = document.getElementById('seek');
  const timeDisp = document.getElementById('time-display');
  const volume   = document.getElementById('volume');
  const speed    = document.getElementById('speed');
  const btnFS    = document.getElementById('btn-fullscreen');

  // ── Helpers ──────────────────────────────────────────────────────────────
  function fmt(secs) {
    const s = Math.floor(secs);
    const m = Math.floor(s / 60);
    const ss = String(s % 60).padStart(2, '0');
    return `${m}:${ss}`;
  }

  function log(msg) {
    console.log('[player]', msg);
  }

  // ── Play / Pause ─────────────────────────────────────────────────────────
  btnPlay.addEventListener('click', function () {
    if (video.paused) {
      video.play();
      log('play');
    } else {
      video.pause();
      log('pause');
    }
  });

  video.addEventListener('play', function () {
    btnPlay.textContent = '⏸';
    btnPlay.setAttribute('aria-label', 'Pause');
    btnPlay.classList.add('active');
  });

  video.addEventListener('pause', function () {
    btnPlay.textContent = '▶';
    btnPlay.setAttribute('aria-label', 'Play');
    btnPlay.classList.remove('active');
  });

  // ── Seek bar ─────────────────────────────────────────────────────────────
  video.addEventListener('loadedmetadata', function () {
    seek.max = video.duration;
    log('duration loaded: ' + fmt(video.duration));
  });

  video.addEventListener('timeupdate', function () {
    seek.value = video.currentTime;
    timeDisp.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration || 0);
  });

  seek.addEventListener('input', function () {
    video.currentTime = seek.value;
    log('seek → ' + fmt(seek.value));
  });

  // ── Volume ───────────────────────────────────────────────────────────────
  volume.addEventListener('input', function () {
    video.volume = volume.value;
    log('volume → ' + volume.value);
  });

  // ── Playback speed ───────────────────────────────────────────────────────
  speed.addEventListener('change', function () {
    video.playbackRate = parseFloat(speed.value);
    log('playbackRate → ' + speed.value);
  });

  // ── Fullscreen ───────────────────────────────────────────────────────────
  btnFS.addEventListener('click', function () {
    const container = document.getElementById('video-container');
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(function (err) {
        log('fullscreen error: ' + err.message);
      });
      log('fullscreen ON');
    } else {
      document.exitFullscreen();
      log('fullscreen OFF');
    }
  });

  document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement) {
      btnFS.classList.add('active');
    } else {
      btnFS.classList.remove('active');
    }
  });

  log('player.js loaded');
}());
