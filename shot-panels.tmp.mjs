import { chromium } from "./node_modules/playwright/index.mjs";
const out = process.argv[2];
const browser = await chromium.launch();
for (const width of [360, 760, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 2200 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 180000 });
  const tab = page.getByRole("button", { name: /매매참고/ }).first();
  if (await tab.count()) await tab.click();
  await page.waitForTimeout(2500);
  for (const [name, text] of [["pair", "짝꿍매매 후보"], ["closebet", "종가배팅 후보"], ["themes", "함께 움직인 테마"]]) {
    const panel = page.locator("article", { hasText: text }).first();
    if (await panel.count()) {
      await panel.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await panel.screenshot({ path: `${out}/${name}-${width}.png` });
    } else console.log(`  ${width}px · ${text} 없음`);
  }
  const o = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, win: window.innerWidth }));
  console.log(`  ${width}px · 문서폭 ${o.doc}/${o.win}`);
  await page.close();
}
await browser.close();
