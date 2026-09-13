import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../public/assets/data");
const OUT_DIR = path.resolve(__dirname, "../dist");

const SITE = "https://rsedaaghi.github.io";

const readJson = async (file) => {
	const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
	return JSON.parse(raw);
};

const yearOf = (work) => {
	const source = work?.startDate || work?.date;
	return source ? new Date(source).getFullYear() : null;
};

const formatYearRange = (work) => {
	if (work?.startDate && work?.endDate) {
		return `${yearOf(work)} - ${new Date(work.endDate).getFullYear()}`;
	}
	if (work?.startDate) return String(yearOf(work));
	return work?.date || "";
};

const shortSummary = (desc = "", max = 200) => {
	const cleaned = desc.trim();
	if (!cleaned) return "";
	const first = cleaned.split(". ")[0];
	return first.length > max ? `${first.slice(0, max - 1)}…` : first;
};

const normalizeSkills = (data) => {
	const entries = Array.isArray(data) ? data : [];
	const items = entries.map((entry) =>
		typeof entry === "string" ? { title: entry } : entry
	);
	if (items.some((entry) => Array.isArray(entry.skills))) {
		return items
			.filter((entry) => Array.isArray(entry.skills) && entry.skills.length > 0)
			.map((entry) => ({
				category: entry.category || "Skills",
				skills: entry.skills,
			}));
	}
	return [{ category: "Skills", skills: items.map((entry) => entry.title).filter(Boolean) }];
};

async function generate() {
	const works = Array.isArray(await readJson("works.json")) ? await readJson("works.json") : [];
	const home = await readJson("home.json");
	const contacts = (await readJson("contact.json")) ?? [];
	const skillSections = normalizeSkills(await readJson("skills.json"));

	const techCount = new Set(works.flatMap((w) => w.technologies ?? [])).size;
	const years = works.map(yearOf).filter((y) => y != null);
	const minYear = years.length ? Math.min(...years) : null;
	const programmingSince = home.programmingStartYear ?? minYear ?? 2011;
	const webSince = home.webDevelopmentStartYear ?? minYear ?? programmingSince;
	const currentYear = new Date().getFullYear();
	const programmingYears =
		programmingSince != null ? currentYear - programmingSince : null;
	const webYears = webSince != null ? currentYear - webSince : null;

	const bio = `Reza Sedaaghi (known as Parham) — Software Developer specializing in Python, Node.js, React, PostgreSQL, Docker, and CI/CD pipelines. Programming since ${programmingSince}; professional web development since ${webSince}. Public portfolio: ${SITE}`;

	const selectedTabs = [
		{ name: "Home", url: "/", note: "Welcome page with a summary and quick stats." },
		{ name: "Skills", url: "/skills/", note: "Technologies grouped by category." },
		{ name: "Works", url: "/works/", note: "Full project list with search and technology filters." },
		{ name: "Experience", url: "/experience/", note: "Work history and education timeline." },
		{ name: "Gallery", url: "/gallery/", note: "Image showcase of notable projects." },
		{ name: "Contact", url: "/contact/", note: "Ways to get in touch." },
	];

	const llmsTxt = [
		`# Reza Sedaaghi`,
		``,
		`> ${bio}`,
		``,
		`## Portfolio`,
		...selectedTabs.map((tab) => `- [${tab.name}](${SITE}${tab.url}): ${tab.note}`),
		`- [Full profile for AI assistants](${SITE}/llms-full.txt): Complete machine-readable profile with project details.`,
		``,
		`## Contact`,
		...contacts
			.filter((contact) => contact.url)
			.map((contact) => `- [${contact.name}](${contact.url})`),
		``,
		`## Key facts`,
		`- Official name: Reza Sedaaghi. Also known as: Parham.`,
		`- Role: Software Developer specializing in Python, Node.js, React, PostgreSQL, Docker, and CI/CD pipelines.`,
		`- Based in Iran.`,
		`- Programming since ${programmingSince}.`,
		`- Professional web development since ${webSince}.`,
	].join("\n");

	const sortedWorks = [...works].sort((a, b) => {
		const an = yearOf(a) ?? 0;
		const bn = yearOf(b) ?? 0;
		return bn - an;
	});

	const projectLines = sortedWorks
		.map((work) => {
			const range = formatYearRange(work);
			const summary = shortSummary(work.description);
			const tech = work.technologies?.length ? `Technologies: ${work.technologies.join(", ")}` : null;
			const lines = [`### ${work.title}${range ? ` (${range})` : ""}`];
			if (work.url) lines.push(`Link: ${work.url}`);
			if (summary) lines.push(`${summary}.`);
			if (tech) lines.push(tech);
			return lines.join("\n");
		})
		.join("\n\n");

	const skillLines = skillSections
		.map((section) => `**${section.category}:** ${section.skills.join(", ")}`)
		.join("\n");

	const llmsFullTxt = [
		`# Reza Sedaaghi — Full Profile`,
		``,
		`> Machine-readable profile for AI assistants and answer engines. Mirrors the live portfolio at ${SITE} (generated at build time from the same data the site renders).`,
		``,
		`## About`,
		``,
		home.description || "",
		``,
		`- Projects showcased: ${works.length}+`,
		`- Technologies in use: ${techCount}+`,
		`- Years of programming: ${programmingYears != null ? `${programmingYears}+` : "—"} (since ${programmingSince})`,
		`- Years of web development: ${webYears != null ? `${webYears}+` : "—"} (since ${webSince})`,
		``,
		`## Skills`,
		``,
		skillLines,
		``,
		`## Projects`,
		``,
		projectLines,
		``,
		`## Contact`,
		``,
		...contacts
			.filter((contact) => contact.url)
			.map((contact) => `- ${contact.label || contact.name}: ${contact.url}`),
	].join("\n");

	await fs.mkdir(OUT_DIR, { recursive: true });
	await fs.writeFile(path.join(OUT_DIR, "llms.txt"), llmsTxt, "utf8");
	await fs.writeFile(path.join(OUT_DIR, "llms-full.txt"), llmsFullTxt, "utf8");
	console.log(`Generated llms.txt and llms-full.txt (${works.length} projects, ${techCount} technologies).`);
}

generate().catch((error) => {
	console.error("SEO generation failed:", error.message);
	process.exit(1);
});