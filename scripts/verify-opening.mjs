import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch();
try {
  await Promise.all([1440, 390].map(async (width) => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:5173');
    await page.waitForSelector('.site-opening-morph');
    // Browser layout/scroll restoration must not act as an explicit skip.
    await page.evaluate(() => {
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('scroll'));
      document.querySelector('#main').focus({ preventScroll: true });
    });
    await page.waitForTimeout(400);
    assert.equal(await page.locator('.site-opening-morph').count(), 1);
    assert.equal(await page.locator('.site-opening').evaluate(el => getComputedStyle(el).display), 'grid');
    await page.waitForFunction(() => document.querySelector('.site-opening-mark')?.getAnimations().length === 1);
    const alignment = await page.evaluate(() => {
      const moving = document.querySelector('.site-opening-mark');
      const target = document.querySelector('.hero-mark');
      const flight = moving.getAnimations()[0];
      flight.pause();
      flight.currentTime = 600;
      const before = moving.getBoundingClientRect().top;
      const initialScroll = window.scrollY;
      window.scrollTo({ top: 220, behavior: 'instant' });
      const after = moving.getBoundingClientRect().top;
      const followsScroll = Math.abs(after - before + window.scrollY - initialScroll);
      // Change direction before checking the final transfer to the real mark.
      window.scrollTo({ top: 80, behavior: 'instant' });
      flight.currentTime = 1199;
      const from = moving.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const endpoint = Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y));
      flight.finish();
      return { followsScroll, endpoint };
    });
    assert(alignment.followsScroll < 1, `Logo detached from scrolling page: ${JSON.stringify(alignment)}`);
    assert(alignment.endpoint < 1, `Logo jumps at handoff: ${JSON.stringify(alignment)}`);
    await page.waitForFunction(() => !document.querySelector('.site-opening'));
    assert.equal(await page.locator('.hero-mark').evaluate(el => getComputedStyle(el).visibility), 'visible');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.waitForFunction(() => !document.querySelector('.site-opening'));
    await page.close();
  }));
  const delayed = await browser.newPage();
  await delayed.route('**/*.js*', async route => {
    await new Promise(resolve => setTimeout(resolve, 3600));
    await route.continue();
  });
  await delayed.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await delayed.waitForSelector('.site-opening-morph');
  const draw = await delayed.locator('.site-opening path').first().evaluate(el => ({
    name: getComputedStyle(el).animationName,
    elapsed: el.getAnimations()[0]?.currentTime,
  }));
  assert.equal(draw.name, 'opening-draw');
  assert(draw.elapsed < 1000, 'Drawing must restart after delayed hydration');
  await delayed.waitForFunction(() => !document.querySelector('.site-opening'));
  await delayed.close();
  console.log('Opening OK: desktop/mobile, restored focus, resize, scroll, reduced motion and delayed hydration.');
} finally {
  await browser.close();
}
