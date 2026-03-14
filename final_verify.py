import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000')
        await page.wait_for_selector('div[class*="bg-[#050505]"]', state='hidden', timeout=15000)
        await asyncio.sleep(2)
        await page.screenshot(path='final_preview.png', full_page=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
