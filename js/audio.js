// audio.js — Web Audio API 8-bit 音效系统
const Audio8Bit = (() => {
  let ctx = null;
  let bgmInterval = null;
  let settings = { soundEnabled: true, bgmEnabled: true, volume: 0.5 };

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function resumeCtx() {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
  }

  function playTone(freq, duration, type = 'square', vol = null) {
    if (!settings.soundEnabled) return;
    resumeCtx();
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = (vol !== null ? vol : settings.volume) * 0.3;
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration);
  }

  function playSequence(notes, baseInterval = 0.12) {
    if (!settings.soundEnabled) return;
    notes.forEach(([freq, dur, type], i) => {
      setTimeout(() => playTone(freq, dur || 0.15, type || 'square'), i * baseInterval * 1000);
    });
  }

  function noise(duration, vol) {
    if (!settings.soundEnabled) return;
    resumeCtx();
    const c = getCtx();
    const bufferSize = c.sampleRate * duration;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buffer;
    const gain = c.createGain();
    gain.gain.value = (vol || settings.volume) * 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    src.connect(gain);
    gain.connect(c.destination);
    src.start();
  }

  return {
    init(s) {
      settings = { ...settings, ...s };
    },

    updateSettings(s) {
      Object.assign(settings, s);
    },

    // 短促"哔"声 — 页面切换
    playClick() {
      playTone(800, 0.06, 'square');
    },

    // 轻快"叮"声 — 选择选项
    playSelect() {
      playSequence([[660, 0.08], [880, 0.1]], 0.08);
    },

    // 上升音阶 — 匹配成功
    playMatch() {
      playSequence([
        [523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.25],
      ], 0.15);
    },

    // 咀嚼音 — 喂食
    playEat() {
      playSequence([
        [200, 0.06, 'sawtooth'], [300, 0.06, 'sawtooth'],
        [200, 0.06, 'sawtooth'], [300, 0.06, 'sawtooth'],
        [250, 0.06, 'sawtooth'], [350, 0.08, 'sawtooth'],
      ], 0.1);
    },

    // 欢快跳跃 — 玩耍
    playPlay() {
      playSequence([
        [523, 0.1], [659, 0.1], [784, 0.1],
        [659, 0.1], [784, 0.1], [1047, 0.15],
      ], 0.1);
    },

    // 柔和下降 — 睡觉
    playSleep() {
      playSequence([
        [523, 0.2, 'sine'], [440, 0.2, 'sine'],
        [392, 0.3, 'sine'], [330, 0.4, 'sine'],
      ], 0.25);
    },

    // 胜利号角 — 升级
    playLevelUp() {
      playSequence([
        [523, 0.1], [523, 0.1], [523, 0.1], [523, 0.2],
        [415, 0.15], [466, 0.15], [523, 0.1],
        [466, 0.08], [523, 0.3],
      ], 0.12);
    },

    // 宝箱打开 — 解锁装饰
    playUnlock() {
      playSequence([
        [330, 0.1], [392, 0.1], [523, 0.1],
        [659, 0.15], [784, 0.2],
      ], 0.1);
      setTimeout(() => noise(0.15, 0.3), 400);
    },

    // 硬币掉落 — 签到
    playCheckin() {
      playSequence([
        [1200, 0.08], [1400, 0.08], [1600, 0.06],
        [1800, 0.05], [2000, 0.1],
      ], 0.06);
    },

    // 休息音
    playRest() {
      playSequence([
        [440, 0.15, 'sine'], [523, 0.2, 'sine'],
      ], 0.2);
    },

    // 摸头
    playPat() {
      playSequence([
        [600, 0.08, 'sine'], [700, 0.08, 'sine'], [800, 0.12, 'sine'],
      ], 0.1);
    },

    // 散步
    playWalk() {
      playSequence([
        [300, 0.06], [350, 0.06], [300, 0.06], [350, 0.06],
        [400, 0.06], [450, 0.06], [500, 0.1],
      ], 0.12);
    },

    // 错误/拒绝
    playError() {
      playSequence([[200, 0.15, 'sawtooth'], [150, 0.2, 'sawtooth']], 0.18);
    },

    // BGM — 简单循环旋律
    playBGM() {
      if (!settings.bgmEnabled) return;
      this.stopBGM();
      const melody = [
        [523, 0.2, 'square'], [587, 0.2, 'square'], [659, 0.2, 'square'], [523, 0.2, 'square'],
        [659, 0.2, 'square'], [698, 0.2, 'square'], [784, 0.4, 'square'],
        [784, 0.15, 'square'], [880, 0.15, 'square'], [784, 0.15, 'square'], [698, 0.15, 'square'],
        [659, 0.2, 'square'], [523, 0.2, 'square'],
        [523, 0.2, 'square'], [392, 0.2, 'square'], [523, 0.4, 'square'],
      ];
      const totalDuration = melody.length * 0.2 * 1000 + 500;
      const play = () => {
        if (!settings.bgmEnabled) return;
        melody.forEach(([freq, dur, type], i) => {
          setTimeout(() => {
            if (settings.bgmEnabled) playTone(freq, dur, type, settings.volume * 0.15);
          }, i * 200);
        });
      };
      play();
      bgmInterval = setInterval(play, totalDuration);
    },

    stopBGM() {
      if (bgmInterval) {
        clearInterval(bgmInterval);
        bgmInterval = null;
      }
    },

    toggleSound() {
      settings.soundEnabled = !settings.soundEnabled;
      return settings.soundEnabled;
    },

    toggleBGM() {
      settings.bgmEnabled = !settings.bgmEnabled;
      if (settings.bgmEnabled) this.playBGM();
      else this.stopBGM();
      return settings.bgmEnabled;
    },

    getSettings() {
      return { ...settings };
    },
  };
})();
