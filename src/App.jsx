import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import Home from "./components/home";
import GalleryTab from "./components/gallery";
import {
	CssBaseline,
	Box,
	createTheme,
	ThemeProvider,
	Container,
} from "@mui/material";

const TABS = [
	{ label: "Home", name: "home" },
	{ label: "Skills", name: "skills", jsonFile: "skills.json" },
	{ label: "Works", name: "works", jsonFile: "works.json" },
	{ label: "Gallery", name: "gallery" },
	{ label: "Contact", name: "contact", jsonFile: "contact.json" },
];

const TAB_COMPONENTS = { home: Home, gallery: GalleryTab };

const THEME_STORAGE_KEY = "theme";

const getInitialDarkMode = () => {
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored) return stored === "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const getTabFromHash = () => {
	const name = window.location.hash.substring(1);
	return TABS.some((t) => t.name === name) ? name : null;
};

const formatBuildDate = (iso) => {
	if (!iso) return "";
	return new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(iso));
};

const App = () => {
	const [activeTab, setActiveTab] = useState(() => getTabFromHash() ?? "home");
	const [darkMode, setDarkMode] = useState(getInitialDarkMode);

	useEffect(() => {
		localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
	}, [darkMode]);

	useEffect(() => {
		const handlePopState = () => {
			setActiveTab(getTabFromHash() ?? "home");
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: darkMode ? "dark" : "light",
					primary: { main: "#1976d2", light: "#e3f2fd", dark: "#1565c0" },
					secondary: { main: "#f50057" },
				},
				typography: {
					fontFamily: "'Nunito','Roboto', sans-serif",
				},
				components: {
					MuiPaper: {
						styleOverrides: {
							root: { transition: "all 0.3s ease-in-out" },
						},
					},
				},
			}),
		[darkMode]
	);

	const handleTabChange = useCallback((newValue) => {
		setActiveTab(newValue);
		window.history.pushState(null, "", `#${newValue}`);
	}, []);

	const handleThemeToggle = useCallback(() => {
		setDarkMode((prev) => !prev);
	}, []);

	const activeTabData = TABS.find((tab) => tab.name === activeTab);
	const ActiveComponent = TAB_COMPONENTS[activeTab];

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container
				maxWidth="md"
				sx={{
					pt: { xs: "70px", md: 6 },
					pb: { xs: 2, md: 6 },
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: { xs: "flex-start", md: "center" },
				}}
			>
				<Header
					tabs={TABS}
					activeTab={activeTab}
					darkMode={darkMode}
					onTabChange={handleTabChange}
					onThemeToggle={handleThemeToggle}
				/>
				<Container
					maxWidth="lg"
					sx={{
						py: { xs: 4, md: 8 },
						background: (theme) =>
							theme.palette.mode === "dark"
								? "linear-gradient(135deg, #1e1e1e, #2d2d2d)"
								: "linear-gradient(135deg, #ece9e6, #ffffff)",
						borderRadius: 3,
						boxShadow: 3,
						mt: { xs: 2, md: 4 },
					}}
				>
					{ActiveComponent ? (
						<ActiveComponent />
					) : (
						<TabContent tab={activeTabData} />
					)}
				</Container>
				<Footer
					lastUpdated={formatBuildDate(__BUILD_DATE__)}
					darkMode={darkMode}
				/>
			</Container>
		</ThemeProvider>
	);
};

export default App;
