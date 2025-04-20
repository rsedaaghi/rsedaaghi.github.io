// scripts/generateSitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// List your URLs – for instance, if your content is known here.
// You could also iterate through your JSON data if needed.
const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/skills', changefreq: 'monthly', priority: 0.7 },
    { url: '/gallery', changefreq: 'monthly', priority: 0.8 },
    { url: '/works', changefreq: 'monthly', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.6 },
];

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: 'https://rsedaaghi.github.io' });
    const writeStream = createWriteStream(path.resolve(__dirname, '../dist/sitemap.xml'));
    sitemap.pipe(writeStream);

    links.forEach(link => sitemap.write(link));
    sitemap.end();

    await streamToPromise(sitemap);
    console.log('Sitemap successfully generated!');
}

generateSitemap().catch(console.error);
