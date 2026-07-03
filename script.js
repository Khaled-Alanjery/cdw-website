// ---- Front-camera flicker-wave effect ----
// Click the demo button -> front camera turns on -> the screen fills with
// horizontal stripes. Stripes riding the wave show live camera video
// (with a random flicker), the rest of the screen shows tiled text.

const startBtn = document.getElementById('demoButton');
const display = document.getElementById('messageDisplay');

// Change this to whatever text you want filling the gaps
const MESSAGE = 'HELLO WORLD';

let video, canvas, ctx, textCanvas, textCtx;
let running = false;
let mirror = true; // flip horizontally for a natural "selfie" view

async function startCameraWave() {
  if (running) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });

    video = document.createElement('video');
    video.srcObject = stream;
    video.playsInline = true;
    video.muted = true;
    await video.play();

    canvas = document.createElement('canvas');
    canvas.id = 'waveCanvas';