import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Captures the screens used in the README.
 *
 * Run the frontend and backend first, and set DATE_MOCK_AUTH=true so the
 * signed-in screens can be reached without going through a real OAuth provider:
 *
 *   node scripts/capture-portfolio.mjs
 */

const baseUrl = process.env.CAPTURE_BASE_URL ?? "http://localhost:3000";
const outDir = path.join(process.cwd(), "public", "portfolio");
const desktop = { width: 1440, height: 960 };
const mobile = { width: 390, height: 844 };

const screens = [
  { name: "login", url: "/auth/login", auth: false, fullPage: false },
  { name: "community", url: "/community", auth: true, fullPage: false },
  { name: "community-post", url: "post", auth: true, fullPage: false },
  { name: "trade-journal", url: "/journal/trades", auth: true, fullPage: false },
  { name: "profile", url: "/profile", auth: true, fullPage: false },
  { name: "my-posts", url: "/profile/posts", auth: true, fullPage: false }
];

// Prefer a post that has replies so the capture shows the comment thread.
async function postPath(page) {
  const response = await page.request.get(`${baseUrl}/api/backend/community/posts?limit=20`);
  const items = (await response.json()).items ?? [];
  const target = items.find((item) => item.reply_count > 0) ?? items[0];

  if (!target) throw new Error("no community post to capture");

  return `/community/posts/${target.id}`;
}

async function capture(context, screen, viewport, suffix) {
  const page = await context.newPage();

  await page.setViewportSize(viewport);

  const target = screen.url === "post" ? await postPath(page) : screen.url;

  await page.goto(`${baseUrl}${target}`, { waitUntil: "networkidle" });
  // Client-side lists fetch after hydration, so give them a beat to arrive.
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: path.join(outDir, `${screen.name}${suffix}.png`),
    fullPage: screen.fullPage
  });
  await page.close();

  console.log(`  captured ${screen.name}${suffix}.png`);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2, locale: "ko-KR" });
const signIn = await context.newPage();

await signIn.goto(`${baseUrl}/auth/mock?provider=mock&next=/community`, { waitUntil: "networkidle" });

if (signIn.url().includes("/auth/mock")) {
  throw new Error("mock sign-in is disabled; set DATE_MOCK_AUTH=true and restart the dev server");
}

await signIn.close();

for (const screen of screens) {
  await capture(context, screen, desktop, "");
}

await capture(context, screens[1], mobile, "-mobile");
await capture(context, screens[3], mobile, "-mobile");

await browser.close();

console.log(`\nwrote ${outDir}`);
