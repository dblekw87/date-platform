import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "docs", "date", "implementation", "responsive-audit-2026-08-08", "screenshots");
const tabs = [
  ["market", "/"],
  ["news", "/?tab=news"],
  ["calendar", "/?tab=calendar"],
  ["breaking", "/?tab=breaking"],
  ["flow", "/?tab=flow"]
];
const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["tablet", { width: 768, height: 1024 }],
  ["mobile", { width: 390, height: 844 }],
  ["narrow", { width: 320, height: 568 }]
];

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const [viewportName, viewport] of viewports) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

  for (const [tab, url] of tabs) {
    const target = `http://localhost:3000${url}`;
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto(target, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector("main", { timeout: 30000 });
    await page.waitForTimeout(700);

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const summary = document.querySelector("section[aria-labelledby='kr-home-title']");
      const tabs = document.querySelector("nav[aria-label='홈 탭']");
      const panel = document.querySelector("[data-tab]");
      const activeTab = document.querySelector("nav[aria-label='홈 탭'] [aria-pressed='true']")?.textContent?.trim() ?? "";
      const all = [...document.querySelectorAll("body *")];
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const overflowing = all
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
            className: typeof el.className === "string" ? el.className : "",
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            display: style.display,
            overflowX: style.overflowX
          };
        })
        .filter((item) => item.width > 0 && item.display !== "none" && item.right > viewportWidth + 2 && item.overflowX !== "scroll" && item.overflowX !== "auto")
        .slice(0, 12);
      const heroRect = summary?.getBoundingClientRect();
      const tabsRect = tabs?.getBoundingClientRect();
      const panelRect = panel?.getBoundingClientRect();

      return {
        title: document.title,
        activeTab,
        viewportWidth,
        viewportHeight,
        scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
        scrollHeight: Math.max(doc.scrollHeight, body.scrollHeight),
        hasHorizontalOverflow: Math.max(doc.scrollWidth, body.scrollWidth) > viewportWidth + 2,
        heroBottom: heroRect ? Math.round(heroRect.bottom) : null,
        tabsBottom: tabsRect ? Math.round(tabsRect.bottom) : null,
        panelTop: panelRect ? Math.round(panelRect.top) : null,
        overflowing
      };
    });

    const file = `${viewportName}-${tab}.png`;
    const filepath = path.join(outDir, file);
    await page.screenshot({ path: filepath, fullPage: true });

    results.push({
      viewport: viewportName,
      tab,
      url: target,
      status: response?.status() ?? null,
      screenshot: filepath,
      errors: [...new Set(errors)].slice(0, 8),
      ...metrics
    });
  }

  await page.close();
}

await browser.close();

const reportPath = path.join(path.dirname(outDir), "responsive-audit-results.json");
await fs.writeFile(reportPath, JSON.stringify(results, null, 2), "utf8");
console.log(reportPath);
console.log(JSON.stringify(results.map(({ viewport, tab, status, hasHorizontalOverflow, scrollWidth, viewportWidth, activeTab, heroBottom, tabsBottom, panelTop, errors, overflowing }) => ({
  viewport,
  tab,
  status,
  activeTab,
  hasHorizontalOverflow,
  scrollWidth,
  viewportWidth,
  heroBottom,
  tabsBottom,
  panelTop,
  errors: errors.length,
  overflowing: overflowing.length
})), null, 2));
