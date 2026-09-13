import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Scope B of the SEO plan: turn the single-URL hash SPA into real paths.
// After `vite build`, this script emits one statically pre-rendered HTML page
// per section (dist/<name>/index.html) so crawlers see unique URLs with real
// content, titles, previews, and structured data — not just "/" with empty
// #root shells. Each page ships the same hashed JS/CSS as the SPA, so the
// React app mounts on top instantly and the pre-rendered markup is replaced
// client-side (createRoot), keeping dynamic behavior intact.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../public/assets/data");
const OUT_DIR = path.resolve(__dirname, "../dist");

const SITE = "https://rsedaaghi.github.io";
const OG_IMAGE = `${SITE}/assets/images/profile.jpg`;
const TWITTER_CREATOR = "@rsedaaghi";
const GOOGLE_SITE_VERIFICATION = "PUdeBw2zuqT1xsESbvh8JCV6rrFB9D5CHHKsAhUpQ1M";

const readJson = async (file) => {
	const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
	return JSON.parse(raw);
};

const esc = (value) =>
	String(value ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");

// Mirrors src/utils/helpers.jsx formatDateRange so static markup agrees with
// the rendered SPA.
const formatYear = (value) => new Date(value).getFullYear().toString();
const dateRange = (work) => {
	if (work.startDate && work.endDate) {
		return `${formatYear(work.startDate)} - ${formatYear(work.endDate)}`;
	}
	if (work.startDate) return formatYear(work.startDate);
	return work.date || "";
};

const shortSummary = (desc = "") => {
	const cleaned = desc.trim();
	if (!cleaned) return "";
	const first = cleaned.split(". ")[0];
	return first.length > 200 ? `${first.slice(0, 199)}…` : first;
};

const err = (message) => {
	console.error(message);
	process.exit(1);
};

// ---- Static body builders (semantic, crawlable) ---------------------------

const homeBody = (home, worksCount) => {
	const currentYear = new Date().getFullYear();
	const programmingYears =
		home.programmingStartYear != null
			? currentYear - home.programmingStartYear
			: null;
	const webYears =
		home.webDevelopmentStartYear != null
			? currentYear - home.webDevelopmentStartYear
			: null;
	const stats = [
		{ value: worksCount, suffix: "+", label: "Projects Showcased" },
		{ value: programmingYears, suffix: "+", label: "Years of Programming" },
		{ value: webYears, suffix: "+", label: "Years Web Development" },
	];
	return `
		<main>
			<section aria-label="Introduction">
				<p class="static-role">${esc(home.role ?? "Software Developer")}</p>
				<h1>Reza Sedaaghi — ${esc(home.headline ?? "")}</h1>
				<p class="static-about">${esc(home.description ?? "")}</p>
				<p class="static-cta">
					<a href="/works/">View My Work</a>
					${home.contactButton?.isOn ? `<a href="${esc(home.contactButton.url)}">Contact Me</a>` : ""}
				</p>
			</section>
			<section class="static-stats" aria-label="Stats">
				${stats
					.map(
						(stat) => `
				<div class="static-stat"><strong>${stat.value != null ? stat.value : "—"}${esc(stat.suffix ?? "")}</strong><span>${esc(stat.label)}</span></div>`
					)
					.join("")}
			</section>
		</main>`;
};

const skillsBody = (sections) => `
		<main>
			<h1>Skills</h1>
			${sections
				.map(
					(section) => `
			<section>
				<h2>${esc(section.category ?? "Skills")}</h2>
				<ul>${(section.skills ?? []).map((skill) => `<li>${esc(skill)}</li>`).join("")}</ul>
			</section>`
				)
				.join("")}
		</main>`;

const worksBody = (works) => `
		<main>
			<h1>Projects</h1>
			<p>${works.length} project${works.length === 1 ? "" : "s"} showcased.</p>
			${works
				.map(
					(work) => `
			<section>
				<h2><a href="${esc(work.url ?? "/works/")}">${esc(work.title)}</a></h2>
				${dateRange(work) ? `<p class="static-date">${esc(dateRange(work))}</p>` : ""}
				<p>${esc(work.description ?? "")}</p>
				${work.technologies?.length ? `<ul class="static-tags">${work.technologies.map((tech) => `<li>${esc(tech)}</li>`).join("")}</ul>` : ""}
			</section>`
				)
				.join("")}
		</main>`;

const experienceBody = (entries) => {
	const blocks = (entries ?? [])
		.map((entry) => {
			const place = entry.kind === "education" ? entry.institution : entry.company;
			const range =
				entry.startDate && entry.endDate
					? `${esc(entry.startDate)} - ${esc(entry.endDate)}`
					: entry.startDate
						? `${esc(entry.startDate)} - Present`
						: "";
			const label = entry.role
				? `${esc(entry.role)}${place ? ` — ${esc(place)}` : ""}`
				: esc(place ?? "");
			return `
			<section>
				<h2>${label}</h2>
				${range ? `<p class="static-date">${range}</p>` : ""}
			</section>`;
		})
		.join("");
	return `
		<main>
			<h1>Experience</h1>${blocks}
		</main>`;
};

const galleryBody = (works) => {
	const figures = works
		.flatMap((work) =>
			(work.images ?? []).map(
				(image) => `
			<figure>
				<img src="${esc(image.src)}" alt="${esc(work.title)}${image.caption ? ` — ${esc(image.caption)}` : ""}" loading="lazy">
				<figcaption>${esc(image.caption ?? "")} ${work.title ? `— ${esc(work.title)}` : ""}</figcaption>
			</figure>`
			)
		)
		.join("");
	return `
		<main>
			<h1>Gallery</h1>${figures}
		</main>`;
};

const contactBody = (contacts) => `
		<main>
			<h1>Contact</h1>
			<ul class="static-contact">
				${(contacts ?? [])
					.filter((contact) => contact.url)
					.map(
						(contact) => `<li>${esc(contact.name)}: <a href="${esc(contact.url)}">${esc(contact.label || contact.name)}</a></li>`
					)
					.join("")}
			</ul>
		</main>`;

// ---- Structured data (JSON-LD) -------------------------------------------

const pageJsonLd = (type, id, url, name, description, mainEntity) => ({
	"@context": "https://schema.org",
	"@type": type,
	"@id": id,
	url,
	name,
	description,
	...mainEntity,
});

const worksJsonLd = (works) => [
	pageJsonLd(
		"CollectionPage",
		`${SITE}/works/#collection`,
		`${SITE}/works/`,
		"Projects — Reza Sedaaghi",
		`Portfolio of software projects developed by Reza Sedaaghi, including ${works
			.slice(0, 3)
			.map((work) => work.title)
			.join(", ")}${works.length > 3 ? " and more" : ""}.`,
		{
			mainEntity: {
				"@type": "ItemList",
				itemListElement: works.map((work, index) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "WebApplication",
						name: work.title,
						...(work.url ? { url: work.url } : {}),
						...(work.startDate || work.date
							? { datePublished: work.startDate || work.date }
							: {}),
						description: shortSummary(work.description),
					},
				})),
			},
		}
	),
];

const skillsJsonLd = (sections) => {
	const allSkills = [...new Set(sections.flatMap((section) => section.skills ?? []))];
	return [
		pageJsonLd(
			"WebPage",
			`${SITE}/skills/#page`,
			`${SITE}/skills/`,
			"Skills — Reza Sedaaghi",
			"Technologies and tools Reza Sedaaghi works with, grouped by category.",
			{
				mainEntity: {
					"@type": "Person",
					name: "Reza Sedaaghi",
					jobTitle: "Software Developer",
					knowsAbout: allSkills,
				},
			}
		),
	];
};

const experienceJsonLd = (entries) => [
	pageJsonLd(
		"WebPage",
		`${SITE}/experience/#page`,
		`${SITE}/experience/`,
		"Experience — Reza Sedaaghi",
		"Work experience and education history of Reza Sedaaghi.",
		{
			mainEntity: {
				"@type": "ItemList",
				itemListElement: (entries ?? [])
					.filter((entry) => entry.role)
					.map((entry, index) => ({
						"@type": "ListItem",
						position: index + 1,
						item: {
							"@type": entry.kind === "education" ? "EducationalOrganization" : "Organization",
							name:
								entry.kind === "education"
									? `${entry.role} at ${entry.institution}`
									: `${entry.role} at ${entry.company}`,
							...(entry.websiteUrl ? { url: entry.websiteUrl } : {}),
							...(entry.startDate
								? {
										description: `${entry.startDate}${entry.endDate ? ` - ${entry.endDate}` : " - Present"}`,
									}
								: {}),
						},
					})),
			},
		}
	),
];

const contactJsonLd = (contacts, home) => {
	const email = contacts.find((contact) => contact.muiIcon === "Email")?.url;
	const phone = contacts.find((contact) => contact.muiIcon === "Phone")?.url;
	const sameAs = contacts
		.map((contact) => contact.url)
		.filter((url) => url && !url.startsWith("mailto:") && !url.startsWith("tel:"));
	const person = {
		name: "Reza Sedaaghi",
		alternateName: "Parham",
		jobTitle: "Software Developer",
		...(email ? { email } : {}),
		...(phone ? { telephone: phone } : {}),
		...(sameAs.length ? { sameAs } : {}),
	};
	return [
		pageJsonLd(
			"ContactPage",
			`${SITE}/contact/#page`,
			`${SITE}/contact/`,
			"Contact — Reza Sedaaghi",
			`Ways to get in touch with Reza Sedaaghi${home.role ? `, ${home.role}` : ""}.`,
			{ mainEntity: person }
		),
	];
};

// ---- Page assembly --------------------------------------------------------

const buildPage = (assetsHead, title, description, canonicalPath, bodyStatic, jsonLdBlocks) => {
	const jsonLd = jsonLdBlocks
		.map((block) => `<script type="application/ld+json">\n${JSON.stringify(block, null, 2)}\n\t</script>`)
		.join("\n\t");
	return `<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<link rel="icon" type="image/x-icon" href="/favicon.ico">
	<link rel="manifest" href="/manifest.webmanifest">
	<link rel="canonical" href="${SITE}${canonicalPath}">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="theme-color" content="#4f46e5">
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
	<meta name="author" content="Reza Sedaaghi">
	<meta name="description" content="${esc(description)}">
	<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}">

	<!-- Open Graph -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="${SITE}${canonicalPath}">
	<meta property="og:site_name" content="Reza Sedaaghi Portfolio">
	<meta property="og:title" content="${esc(title)}">
	<meta property="og:description" content="${esc(description)}">
	<meta property="og:image" content="${OG_IMAGE}">

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="${esc(title)}">
	<meta name="twitter:description" content="${esc(description)}">
	<meta name="twitter:image" content="${OG_IMAGE}">
	<meta name="twitter:creator" content="${TWITTER_CREATOR}">

	<title>${esc(title)}</title>

	${jsonLd}
	${assetsHead}
</head>

<body>
	<div id="root">${bodyStatic}</div>

</body>

</html>
`;
};

// ---- Main -------------------------------------------------------------------

const generate = async () => {
	const works =
		Array.isArray(await readJson("works.json")) ? await readJson("works.json") : [];
	const home = await readJson("home.json");
	const contacts = (await readJson("contact.json")) ?? [];
	const skillSections = await readJson("skills.json");
	const experience = await readJson("experience.json");
	const gitHubContacts = contacts.filter((contact) => contact.muiIcon === "GitHub");
	const githubUrl = gitHubContacts[0]?.url;

	const indexHtml = await fs.readFile(path.join(OUT_DIR, "index.html"), "utf8");
	// Reuse the hashed CSS/JS + PWA registration script from the SPA build so
	// every section page hydrates into the full app without extra requests.
	const assetsHead = [
		...indexHtml.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/gi),
		...indexHtml.matchAll(/<script[^>]+src="[^"]+"[^>]*><\/script>/gi),
	]
		.map((match) => match[0])
		.join("\n\t");

	// Works collection order matches the SPA's data order.
	const sections = [
		{
			name: "skills",
			title: "Skills — Reza Sedaaghi",
			description: "Technologies and tools Reza Sedaaghi works with, grouped by category: backend, data and storage, frontend, DevOps, and mobile and desktop.",
			body: skillsBody(skillSections),
			jsonLd: skillsJsonLd(skillSections),
		},
		{
			name: "works",
			title: "Projects — Reza Sedaaghi",
			description: `Portfolio of ${works.length} software projects developed by Reza Sedaaghi, including ${works
				.slice(0, 3)
				.map((work) => work.title)
				.join(", ")}${works.length > 3 ? " and more" : ""}.`,
			body: worksBody(works),
			jsonLd: worksJsonLd(works),
		},
		{
			name: "experience",
			title: "Experience — Reza Sedaaghi",
			description: "Work experience and education history of Reza Sedaaghi, a software developer from Iran.",
			body: experienceBody(experience),
			jsonLd: experienceJsonLd(experience),
		},
		{
			name: "gallery",
			title: "Gallery — Reza Sedaaghi",
			description: "Screenshots from notable projects in the portfolio of Reza Sedaaghi.",
			body: galleryBody(works),
			jsonLd: [
				pageJsonLd(
					"WebPage",
					`${SITE}/gallery/#page`,
					`${SITE}/gallery/`,
					"Gallery — Reza Sedaaghi",
					"Screenshots from notable projects in the portfolio of Reza Sedaaghi.",
					{}
				),
			],
		},
		{
			name: "contact",
			title: "Contact — Reza Sedaaghi",
			description: "Ways to get in touch with Reza Sedaaghi: email, LinkedIn, GitHub, and phone.",
			body: contactBody(contacts),
			jsonLd: contactJsonLd(contacts, home),
		},
	];

	for (const section of sections) {
		const target = path.join(OUT_DIR, section.name);
		await fs.mkdir(target, { recursive: true });
		const html = buildPage(
			assetsHead,
			section.title,
			section.description,
			`/${section.name}/`,
			section.body,
			section.jsonLd
		);
		await fs.writeFile(path.join(target, "index.html"), html, "utf8");
		console.log(`Generated dist/${section.name}/index.html`);
	}

	// Inject the home content into the SPA shell so the root URL is crawlable too.
	if (!indexHtml.includes('<div id="root"></div>')) {
		err("dist/index.html is missing the #root element; aborting home injection.");
	}
	const indexedHome = indexHtml.replace(
		'<div id="root"></div>',
		`<div id="root">${homeBody(home, works.length)}</div>`
	);
	await fs.writeFile(path.join(OUT_DIR, "index.html"), indexedHome, "utf8");
	console.log(`Injected static home content into dist/index.html (${works.length} projects).`);

	console.log(`Section pages done. GitHub: ${githubUrl ?? "n/a"}.`);
};

generate().catch((error) => {
	console.error("Section page generation failed:", error.stack || error.message);
	process.exit(1);
});