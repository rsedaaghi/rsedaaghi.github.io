import { lazy } from "react";
import Home from "./home";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// Home stays eager (initial view). The rest are code-split so their chunk
// (and its icons/images/MUI pieces) only parse when that tab is first opened.
const GalleryTab = lazy(() => import("./gallery"));
const SkillsTab = lazy(() => import("./tabs/skillsTab"));
const WorksTab = lazy(() => import("./tabs/worksTab"));
const ExperienceTab = lazy(() => import("./tabs/experienceTab"));
const ContactTab = lazy(() => import("./tabs/contactTab"));

// Single source of truth for navigation config AND tab content (DRY):
// a new tab is registered exactly once here. `path` is the canonical SEO
// URL path for the section (served from dist/<name>/index.html).
export const TABS = [
	{ label: "Home", name: "home", path: "/", icon: HomeIcon },
	{ label: "Skills", name: "skills", path: "/skills/", jsonFile: "skills.json", icon: CodeIcon },
	{ label: "Works", name: "works", path: "/works/", jsonFile: "works.json", icon: WorkOutlineIcon },
	{ label: "Experience", name: "experience", path: "/experience/", jsonFile: "experience.json", icon: WorkHistoryIcon },
	{ label: "Gallery", name: "gallery", path: "/gallery/", icon: PhotoLibraryIcon },
	{ label: "Contact", name: "contact", path: "/contact/", jsonFile: "contact.json", icon: MailOutlineIcon },
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