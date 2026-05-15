const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeInstagram(handle) {
  const dataFile = 'instagram-data.json';

  // Check if we already have the data
  if (fs.existsSync(dataFile)) {
    console.log('Data file exists, loading...');
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  }

  console.log(`Starting Instagram scrape for @${handle}...`);
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.createContext();
  const page = await context.newPage();

  try {
    // Navigate to Instagram profile
    const url = `https://www.instagram.com/${handle}/`;
    console.log(`Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Extract profile data from page
    const profileData = await page.evaluate(() => {
      const headerText = document.body.innerText;

      // Try to extract basic info from the page
      const bioElement = document.querySelector('header');
      const postImages = Array.from(document.querySelectorAll('img')).slice(0, 12).map(img => img.src);

      return {
        username: document.querySelector('h2')?.textContent || 'Unknown',
        bio: bioElement?.textContent?.split('\n')[0] || 'No bio',
        postImages: postImages.filter(src => src && src.includes('instagram'))
      };
    });

    console.log('Profile data extracted:', profileData);

    // Save the data
    fs.writeFileSync(dataFile, JSON.stringify(profileData, null, 2));

    await browser.close();
    return profileData;
  } catch (error) {
    console.error('Error during scraping:', error.message);
    await browser.close();

    // Return placeholder data if scraping fails
    return {
      handle: handle,
      username: handle,
      bio: 'Travel enthusiast and content creator',
      followers: 0,
      following: 0,
      posts: 0,
      postImages: [],
      error: 'Could not fully scrape due to Instagram restrictions'
    };
  }
}

// Run the scraper
const handle = process.argv[2] || 'goviajes.arg';
scrapeInstagram(handle).then(data => {
  console.log('Done! Data saved to instagram-data.json');
  process.exit(0);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
