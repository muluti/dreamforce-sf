// Text-to-Speech (TTS) using Web Speech API
export function speakText(text: string): void {
  if (!("speechSynthesis" in window)) {
    alert("현재 브라우저는 음성 재생을 지원하지 않습니다.");
    return;
  }

  window.speechSynthesis.cancel(); // 이전 재생 중단

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9; // 살짝 천천히 명확하게
  utterance.pitch = 1.0;

  // 영어 목소리 우선 선택
  const voices = window.speechSynthesis.getVoices();
  const usVoice = voices.find(v => v.lang === "en-US" || v.lang.startsWith("en"));
  if (usVoice) {
    utterance.voice = usVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Web Audio API White Noise / Relaxing Sound Synthesizer (No external MP3 files needed)
let audioCtx: AudioContext | null = null;
let currentSourceNode: AudioNode | null = null;
let currentGainNode: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopSleepSound(): void {
  if (currentSourceNode) {
    try {
      (currentSourceNode as AudioBufferSourceNode).stop();
      currentSourceNode.disconnect();
    } catch {
      // ignore
    }
    currentSourceNode = null;
  }
}

export function playSleepSound(type: "rain" | "cabin" | "waves"): void {
  stopSleepSound();
  const ctx = getAudioContext();

  const bufferSize = ctx.sampleRate * 4; // 4 seconds looping buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === "cabin") {
      // Brown noise (Deep airplane cabin roar)
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      data[i] = lastOut * 3.5;
    } else if (type === "rain") {
      // Pink noise (Rain soothing texture)
      lastOut = (lastOut + (0.05 * white)) / 1.05;
      data[i] = lastOut * 2.0;
    } else {
      // Waves (Slow modulated pink noise)
      const t = i / ctx.sampleRate;
      const mod = (Math.sin(2 * Math.PI * 0.25 * t) + 1) / 2;
      lastOut = (lastOut + (0.04 * white)) / 1.04;
      data[i] = lastOut * (1.2 + mod * 1.5);
    }
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const gain = ctx.createGain();
  gain.gain.value = 0.3; // Comfort level
  currentGainNode = gain;

  noise.connect(gain);
  gain.connect(ctx.destination);
  noise.start();
  currentSourceNode = noise;
}
