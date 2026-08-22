import { chromium } from "./node_modules/playwright/index.mjs";
const out = process.argv[2];
const browser = await chromium.launch();
for (const width of [360, 760, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 1600 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 180000 });
  const tab = page.getByRole("button", { name: /매매참고/ }).first();
  if (await tab.count()) await tab.click();
  await page.waitForTimeout(2500);
  const panel = page.locator("article", { hasText: "종가배팅 후보" }).first();
  const found = await panel.count();
  if (found) {
    await panel.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await panel.screenshot({ path: `${out}/cb-${width}.png` });
  }
  const o = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, win: window.innerWidth }));
  console.log(`  ${width}px · 패널 ${found ? "있음" : "없음"} · 문서폭 ${o.doc}/${o.win}`);
  await page.close();
}
await browser.close();
