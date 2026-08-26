import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- Configuration -------------------------------------------------------
const IMAGES_DIR = path.resolve(__dirname, "../public/assets/images");
const DATA_DIR = path.resolve(__dirname, "../public/assets/data");
const SIZE_THRESHOLD_BYTES = 300 * 1024; // Only convert files larger than this
const WEBP_QUALITY = 85; // 1-100, higher = better quality/larger file
// ---------------------------------------------------------------------------

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const fullPath = path.join(dir, entry.name);
			return entry.isDirectory()
			? walk(fullPath)
			: Promise.resolve([fullPath]);
		})
	);
	return files.flat();
}

// Converts "/abs/path/public/assets/images/x.png" -> "/assets/images/x.png"
function toPublicUrl(filePath) {
	const normalized = filePath.split(path.sep).join("/");
	const index = normalized.indexOf("/assets/");
	return index === -1 ? null : normalized.slice(index);
}

async function updateJsonReferences(convertedPairs) {
	const jsonFiles = (await fs.readdir(DATA_DIR))
	.filter((file) => file.endsWith(".json"))
	.map((file) => path.join(DATA_DIR, file));

	for (const jsonPath of jsonFiles) {
		let content = await fs.readFile(jsonPath, "utf8");
		let modified = false;

		for (const [srcPath, destPath] of convertedPairs) {
			const srcUrl = toPublicUrl(srcPath);
			const destUrl = toPublicUrl(destPath);
			if (srcUrl && destUrl && content.includes(srcUrl)) {
				content = content.split(srcUrl).join(destUrl);
				modified = true;
			}
		}

		if (modified) {
			await fs.writeFile(jsonPath, content, "utf8");
			console.log(`Updated references in ${path.basename(jsonPath)}`);
		}
	}
}

async function convertImagesToWebp() {
	const candidates = (await walk(IMAGES_DIR)).filter(
		(file) => path.extname(file).toLowerCase() === ".png"
	);

	const converted = [];
	for (const src of candidates) {
		const stat = await fs.stat(src);
		if (stat.size <= SIZE_THRESHOLD_BYTES) continue;

		const dest = `${src.slice(0, -path.extname(src).length)}.webp`;
		await sharp(src).webp({ quality: WEBP_QUALITY }).toFile(dest);

		const newStat = await fs.stat(dest);
		const savedPercent = ((1 - newStat.size / stat.size) * 100).toFixed(1);
		console.log(
		`${path.basename(src)} -> ${path.basename(dest)} ` +
			`(KB ${Math.round(stat.size / 1024)} -> ${Math.round(newStat.size / 1024)}, -${savedPercent}%)`
		);
		converted.push([src, dest]);
	}

	if (converted.length === 0) {
		console.log(
		`No PNG files larger than ${SIZE_THRESHOLD_BYTES / 1024} KB found. Nothing to do.`
		);
		return;
	}

	await updateJsonReferences(converted);

	console.log(`\nDone. Converted ${converted.length} file(s) to WebP.`);
	console.log("Review the results, then remove the original .png files:");
	console.log("  git rm <original.png>   (repeat per file)");
}

convertImagesToWebp().catch((error) => {
	console.error("Conversion failed:", error.message);
	process.exit(1);
});
