// Herbal wellness background sound generator & audio controller

class BackgroundAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private currentVolume = 0.3;
  private currentTrack = 'herbal_zen';
  private customAudio: HTMLAudioElement | null = null;

  public init() {
    // will initialize on first user interaction to comply with browser autoplay policies
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume * 0.15, this.audioCtx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.currentVolume;
    }
  }

  public setTrack(track: string) {
    this.currentTrack = track;
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (url && url.trim()) {
      try {
        this.customAudio = new Audio(url);
        this.customAudio.loop = true;
        this.customAudio.volume = this.currentVolume;
      } catch (e) {
        console.warn('Failed to load custom audio URL', e);
      }
    }
  }

  public play() {
    if (this.isPlaying) return;

    if (this.customAudio) {
      this.customAudio.play().then(() => {
        this.isPlaying = true;
      }).catch(err => {
        console.warn('Autoplay prevented', err);
      });
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume * 0.15, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      this.isPlaying = true;
      this.scheduleHarmonics();
    } catch (e) {
      console.warn('Web Audio not supported or failed to start:', e);
    }
  }

  private scheduleHarmonics() {
    if (!this.isPlaying || !this.audioCtx || !this.masterGain) return;

    // Harmonic pentatonic peaceful herbal chords
    const chordFrequencies = this.currentTrack === 'herbal_zen' 
      ? [220, 277.18, 329.63, 440, 554.37] // A Major calm
      : this.currentTrack === 'gentle_breeze'
      ? [261.63, 329.63, 392.00, 523.25, 659.25] // C Major open
      : [196.00, 246.94, 293.66, 392.00, 493.88]; // G Major deep vitality

    const pickRandom = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)];
    const freq = pickRandom(chordFrequencies);

    this.playTone(freq, 4.5);

    // Schedule next harmonic chime in 3-5 seconds
    const nextInterval = 2500 + Math.random() * 2500;
    this.timer = window.setTimeout(() => {
      this.scheduleHarmonics();
    }, nextInterval);
  }

  private playTone(frequency: number, duration: number) {
    if (!this.audioCtx || !this.masterGain) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      // Smooth attack and long gentle exponential decay
      const now = this.audioCtx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.6, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio node cleanup
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const backgroundMusic = new BackgroundAudioManager();
