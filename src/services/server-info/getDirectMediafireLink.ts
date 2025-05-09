import puppeteer from 'puppeteer';

export async function getDirectMediafireLink(
  mediafireUrl: string
): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );
    await page.goto(mediafireUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    await page.waitForSelector('#downloadButton', { timeout: 30000 });

    const downloadLink = await page.$eval(
      '#downloadButton',
      (el) => (el as HTMLAnchorElement).href
    );

    if (!downloadLink.startsWith('https://download')) {
      throw new Error('Link direto de download não encontrado');
    }

    return downloadLink;
  } finally {
    await browser.close();
  }
}
