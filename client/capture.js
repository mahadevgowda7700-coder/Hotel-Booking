const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // 1. Rooms Page
    console.log("Navigating to /rooms...");
    await page.goto('http://localhost:5173/rooms', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'new_hotels_rooms_page.png', fullPage: true });

    // 2. Dashboard Page
    console.log("Navigating to /owner...");
    await page.goto('http://localhost:5173/owner', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'owner_dashboard_fixed.png', fullPage: true });

    console.log("Screenshots captured.");
    await browser.close();
})();
