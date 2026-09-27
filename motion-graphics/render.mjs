// Renders ai-ml-books.html to a looping GIF + MP4.
// One-time setup in this folder: npm i playwright-core   (needs Google Chrome + ffmpeg)
// Run from this folder: node render.mjs gif ai-ml-books.html ai-ml-books 1.6
//      (last number = second of the 8s loop the GIF starts on; 1.6 opens on all 12 real covers)
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [mode, html, out, extra] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('page error:', e.message));
page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
await page.goto('file://' + path.resolve(html) + '?capture');
await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
const poster = page.locator('#poster');
if (mode === 'stills') {
  fs.mkdirSync(out, { recursive: true });
  for (const t of extra.split(',').map(Number)) { await page.evaluate(t => window.__render(t), t); await poster.screenshot({ path: `${out}/t${t.toFixed(2)}.png` }); }
} else {
  const start = +extra, TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'mg-'));
  for (const fps of [30, 20]) {
    const d = `${TMP}/f${fps}`; fs.mkdirSync(d);
    for (let i = 0; i < 8 * fps; i++) { await page.evaluate(t => window.__render(t), (start + i / fps) % 8); await poster.screenshot({ path: `${d}/f${String(i).padStart(4, '0')}.png` }); }
  }
  execFileSync('ffmpeg', ['-v','error','-y','-framerate','30','-i',`${TMP}/f30/f%04d.png`,'-filter_complex','loop=loop=2:size=240:start=0','-c:v','libx264','-pix_fmt','yuv420p','-crf','17','-preset','slow','-movflags','+faststart',out + '.mp4']);
  execFileSync('ffmpeg', ['-v','error','-y','-framerate','20','-i',`${TMP}/f20/f%04d.png`,'-vf','split[a][b];[a]palettegen=max_colors=160:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle','-loop','0',out + '.gif']);
  fs.rmSync(TMP, { recursive: true, force: true });
  for (const e of ['.gif', '.mp4']) console.log(path.basename(out + e), (fs.statSync(out + e).size / 1e6).toFixed(1) + ' MB');
}
await browser.close();
