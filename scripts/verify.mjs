import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
await mkdir(".impeccable/review", { recursive: true });
const errors = [];
const routes = [
  "/",
  "/photography",
  "/projects",
  "/blog",
  "/blog/aprender-a-olhar",
  "/about",
  "/resume",
];
for (const [device, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
  ["tablet", 820, 1180],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push(`${device}: ${e.message}`));
  for (const route of routes) {
    await page.goto(`http://localhost:5173${route}`);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    // Trigger native lazy loading through the same scroll path a visitor takes.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 45));
      }
      window.scrollTo(0, 0);
      await Promise.all(
        [...document.images].map((img) => img.decode().catch(() => {})),
      );
    });
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      images: [...document.images]
        .filter((i) => !i.complete || !i.naturalWidth)
        .map((i) => i.src),
      h1: document.querySelector("h1")?.textContent,
    }));
    if (result.overflow || result.images.length || !result.h1)
      errors.push({ device, route, ...result });
    if (device !== "tablet")
      await page.screenshot({
        path: `.impeccable/review/${device}${route === "/" ? "" : route.replaceAll("/", "-")}.png`,
        fullPage: true,
      });
  }
  if (device === "mobile") {
    await page.goto("http://localhost:5173");
    await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
    await page.screenshot({
      path: ".impeccable/review/mobile-menu.png",
      fullPage: true,
    });
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: /Photography/ })
      .click();
    await page.waitForURL("**/photography");
    if (await page.locator("#mobile-nav").count())
      errors.push("Menu did not close after navigation");
  }
  await page.goto("http://localhost:5173/photography");
  await page.getByRole("button", { name: "Nature", exact: true }).click();
  if ((await page.locator(".photo-open").count()) !== 1)
    errors.push("Nature filter failed");
  await page.locator(".photo-open").first().click();
  await page.locator("dialog[open]").waitFor();
  await page.keyboard.press("Escape");
  if (await page.locator("dialog[open]").count())
    errors.push("Lightbox Escape failed");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.locator(".photo-open").first().click();
  await page.keyboard.press("ArrowRight");
  if (!(await page.locator(".lightbox h2").textContent()).includes("cidade"))
    errors.push("Lightbox navigation failed");
  await page.screenshot({ path: `.impeccable/review/${device}-lightbox.png` });
  await page.keyboard.press("Escape");
  // Revisit the lazy-loaded About route to guard hash navigation ordering.
  await page.goto("http://localhost:5173/about");
  await page.getByRole("link", { name: "Gustavo Hiroaki — Home" }).click();
  await page.getByRole("link", { name: "Encontre-me por aqui" }).click();
  await page.waitForURL("**/about#contact");
  await page.waitForTimeout(250);
  const contactTop = await page
    .locator("#contact")
    .evaluate((el) => el.getBoundingClientRect().top);
  if (contactTop < 0 || contactTop >= height)
    errors.push(`${device}: contact anchor out of view (${contactTop})`);
  await page.close();
}
await browser.close();
console.log(
  JSON.stringify({ errors, routes: routes.length, viewports: 3 }, null, 2),
);
if (errors.length) process.exitCode = 1;
