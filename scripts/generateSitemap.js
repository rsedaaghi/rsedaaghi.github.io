import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

// Define your website URLs
const links = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/about", changefreq: "weekly", priority: 0.7 },
    { url: "/skills", changefreq: "weekly", priority: 0.7 },
    { url: "/gallery", changefreq: "weekly", priority: 0.8 },
    { url: "/works", changefreq: "weekly", priority: 0.9 },
    { url: "/contact", changefreq: "weekly", priority: 0.6 },
];

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: "https://rsedaaghi.github.io" });
    const writeStream = createWriteStream(path.resolve("dist/sitemap.xml"));
    sitemap.pipe(writeStream);

    links.forEach((link) => sitemap.write(link));
    sitemap.end();

    await streamToPromise(sitemap);
    console.log("Sitemap successfully generated!");
}

generateSitemap().catch(console.error);
