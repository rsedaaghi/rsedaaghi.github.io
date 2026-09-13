import Home from "./home";
import GalleryTab from "./gallery";
import SkillsTab from "./tabs/skillsTab";
import WorksTab from "./tabs/worksTab";
import ContactTab from "./tabs/contactTab";

// Single source of truth for navigation config AND tab content (DRY):
// a new tab is registered exactly once here.
export const TABS = [
	{ label: "Home", name: "home" },
	{ label: "Skills", name: "skills", jsonFile: "skills.json" },
	{ label: "Works", name: "works", jsonFile: "works.json" },
	{ label: "Gallery", name: "gallery" },
	{ label: "Contact", name: "contact", jsonFile: "contact.json" },
];

export const TAB_COMPONENTS = {
	home: Home,
	skills: SkillsTab,
	works: WorksTab,
	gallery: GalleryTab,
	contact: ContactTab,
};

// Tabs that render a page heading above their content (home is its own hero).
export const TABS_WITH_HEADING = TABS.map((t) => t.name).filter(
	(name) => name !== "home"
);