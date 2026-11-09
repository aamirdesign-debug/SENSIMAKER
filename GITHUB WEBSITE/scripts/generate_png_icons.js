import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const check = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(check, 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function generateIconPNG(width, height, isMaskable = false) {
  // RGBA buffer with 1 filter byte per scanline
  const stride = width * 4 + 1;
  const rawData = Buffer.alloc(stride * height);
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(width, height) / 2;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * stride;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Base background: #07030e with ambient crimson glow
      let r = 7;
      let g = 3;
      let b = 14;
      let a = 255;

      // Radial ambient center glow
      const glowFactor = Math.max(0, 1 - dist / (maxR * 1.1));
      r = Math.min(255, Math.floor(r + 35 * glowFactor));
      g = Math.min(255, Math.floor(g + 10 * glowFactor));
      b = Math.min(255, Math.floor(b + 20 * glowFactor));

      const scale = isMaskable ? 0.72 : 0.88;
      const outerRingR = maxR * scale * 0.95;
      const innerRingR = maxR * scale * 0.75;
      const centerDotR = maxR * scale * 0.18;

      // Outer reticle ring
      if (Math.abs(dist - outerRingR) < (width > 200 ? 3.5 : 2)) {
        r = 255; g = 30; b = 68; a = 240;
      }
      // Inner reticle ring
      else if (Math.abs(dist - innerRingR) < (width > 200 ? 5 : 2.5)) {
        r = 255; g = 50; b = 80; a = 255;
      }
      // Cardinal tick marks
      else if (
        (Math.abs(dx) <= (width > 200 ? 4 : 2) && ((y > cy - outerRingR - 15 && y < cy - innerRingR + 10) || (y < cy + outerRingR + 15 && y > cy + innerRingR - 10))) ||
        (Math.abs(dy) <= (width > 200 ? 4 : 2) && ((x > cx - outerRingR - 15 && x < cx - innerRingR + 10) || (x < cx + outerRingR + 15 && x > cx - innerRingR - 10)))
      ) {
        r = 255; g = 30; b = 68; a = 255;
      }
      // 3 Horizontal Equalizer Lines
      else if (
        (Math.abs(dy + maxR * 0.22) <= (width > 200 ? 4 : 2) && Math.abs(dx) < innerRingR * 0.75) ||
        (Math.abs(dy) <= (width > 200 ? 5 : 2.5) && Math.abs(dx) < innerRingR * 0.9) ||
        (Math.abs(dy - maxR * 0.22) <= (width > 200 ? 4 : 2) && Math.abs(dx) < innerRingR * 0.75)
      ) {
        r = 255; g = 30; b = 68; a = 200;
      }
      // Nodes on sliders
      else if (
        Math.hypot(dx - maxR * 0.28, dy + maxR * 0.22) <= (width > 200 ? 10 : 5) ||
        Math.hypot(dx + maxR * 0.28, dy - maxR * 0.22) <= (width > 200 ? 10 : 5)
      ) {
        r = 255; g = 255; b = 255; a = 255;
      }
      // Central laser beacon glow
      else if (dist <= centerDotR * 2.0) {
        const dFac = Math.max(0, 1 - dist / (centerDotR * 2.0));
        if (dist <= centerDotR * 0.4) {
          // White core
          r = 255; g = 255; b = 255; a = 255;
        } else if (dist <= centerDotR) {
          // Intense neon red
          r = 255; g = 30; b = 68; a = 255;
        } else {
          // Soft radial glow
          r = Math.min(255, Math.floor(r + 220 * dFac));
          g = Math.min(255, Math.floor(g + 20 * dFac));
          b = Math.min(255, Math.floor(b + 40 * dFac));
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  // PNG Signature
  const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type: RGBA
  ihdr[10] = 0; // Compression: Deflate
  ihdr[11] = 0; // Filter: Standard
  ihdr[12] = 0; // Interlace: None

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(rawData, { level: 9 }));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generateIconPNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generateIconPNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generateIconPNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generateIconPNG(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generateIconPNG(64, 64, false));

console.log('Successfully generated all PWA icons.');
