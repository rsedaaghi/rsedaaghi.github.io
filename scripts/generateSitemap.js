import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

// Real section URLs: each resolves to dist/<name>/index.html which the
// build pre-renders (see generateSectionPages.js). Hash-only URLs (#works)
// were SEO dead ends because crawlers treat them as the same page as "/".
const links = [
	{ url: "/", changefreq: "weekly", priority: 1.0 },
	{ url: "/works/", changefreq: "weekly", priority: 0.9 },
	{ url: "/skills/", changefreq: "monthly", priority: 0.7 },
	{ url: "/experience/", changefreq: "monthly", priority: 0.8 },
	{ url: "/gallery/", changefreq: "weekly", priority: 0.6 },
	{ url: "/contact/", changefreq: "monthly", priority: 0.5 },
];

async function generateSitemap() {
	const sitemap = new SitemapStream({
		hostname: "https://rsedaaghi.github.io",
	});
	const writeStream = createWriteStream(path.resolve("dist/sitemap.xml"));
	sitemap.pipe(writeStream);

	links.forEach((link) => sitemap.write(link));
	sitemap.end();

	await streamToPromise(sitemap);
	console.log("Sitemap successfully generated!");
}

generateSitemap().catch(console.error);
