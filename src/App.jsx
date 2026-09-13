import React, { useEffect, useMemo, useState } from "react";
import { CssBaseline, Box, ThemeProvider, Container } from "@mui/material";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import useJsonData from "./utils/useJsonData";
import { TABS } from "./components/tabRegistry";
import { createAppTheme } from "./theme";

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

	const { data: skillsData } = useJsonData("/assets/data/skills.json");
	const { data: worksData } = useJsonData("/assets/data/works.json");
	const { data: experienceData } = useJsonData("/assets/data/experience.json");

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

	const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

	// Small item counts enrich the nav labels (e.g. "Works · 24").
	const navTabs = useMemo(() => {
		const counts = {
			skills: Array.isArray(skillsData) ? skillsData.length : 0,
			works: Array.isArray(worksData) ? worksData.length : 0,
			experience: Array.isArray(experienceData) ? experienceData.length : 0,
		};
		return TABS.map((tab) =>
			counts[tab.name] > 0 ? { ...tab, count: counts[tab.name] } : tab
		);
	}, [skillsData, worksData, experienceData]);

	const handleTabChange = (newValue) => {
		setActiveTab(newValue);
		window.history.pushState(null, "", `#${newValue}`);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const activeTabData = TABS.find((tab) => tab.name === activeTab);
	// Short pages (home, skills, contact) center vertically on desktop, but if
	// they ever outgrow the viewport they must fall back to normal page scroll
	// ("safe center") instead of clipping the top. Tall pages stay top-aligned.
	const isCompactCentered = ["home", "skills", "contact"].includes(activeTab);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Header
					tabs={navTabs}
					activeTab={activeTab}
					darkMode={darkMode}
					onTabChange={handleTabChange}
					onThemeToggle={() => setDarkMode((prev) => !prev)}
				/>
				<Container
					maxWidth="md"
					sx={{
						pt: { xs: "70px", md: 1 },
						pb: { xs: 1, md: 1 },
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: {
							xs: "flex-start",
							md: isCompactCentered ? "safe center" : "flex-start",
						},
					}}
				>
					<Container
						maxWidth="lg"
						sx={{
							py: { xs: 2.5, md: 2 },
							background: (theme) =>
								theme.custom.surfaceGradient[theme.palette.mode],
							borderRadius: 4,
							boxShadow: (theme) =>
								theme.palette.mode === "dark"
									? "0 18px 48px rgba(0,0,0,0.45)"
									: "0 18px 48px rgba(79,70,229,0.10)",
							mt: { xs: 1, md: 1 },
						}}
					>
						<Box className="fade-in" key={activeTab}>
							<TabContent
								tab={activeTabData}
								onNavigate={handleTabChange}
							/>
						</Box>
					</Container>
					<Footer
						lastUpdated={formatBuildDate(__BUILD_DATE__)}
						darkMode={darkMode}
					/>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default App;