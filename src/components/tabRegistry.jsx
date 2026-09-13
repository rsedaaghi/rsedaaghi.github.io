import Home from "./home";
import GalleryTab from "./gallery";
import SkillsTab from "./tabs/skillsTab";
import WorksTab from "./tabs/worksTab";
import ExperienceTab from "./tabs/experienceTab";
import ContactTab from "./tabs/contactTab";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// Single source of truth for navigation config AND tab content (DRY):
// a new tab is registered exactly once here.
export const TABS = [
	{ label: "Home", name: "home", icon: HomeIcon },
	{ label: "Skills", name: "skills", jsonFile: "skills.json", icon: CodeIcon },
	{ label: "Works", name: "works", jsonFile: "works.json", icon: WorkOutlineIcon },
	{ label: "Experience", name: "experience", jsonFile: "experience.json", icon: WorkHistoryIcon },
	{ label: "Gallery", name: "gallery", icon: PhotoLibraryIcon },
	{ label: "Contact", name: "contact", jsonFile: "contact.json", icon: MailOutlineIcon },
];

export const TAB_COMPONENTS = {
	home: Home,
	skills: SkillsTab,
	works: WorksTab,
	experience: ExperienceTab,
	gallery: GalleryTab,
	contact: ContactTab,
};

// Tabs that render a page heading above their content (home is its own hero).
export const TABS_WITH_HEADING = TABS.map((t) => t.name).filter(
	(name) => name !== "home"
);

// Tabs whose counts (shown in the nav) are computed from a JSON data file.
export const COUNT_FILES = {
	skills: "skills.json",
	works: "works.json",
	experience: "experience.json",
};