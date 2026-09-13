import React, { useEffect, useMemo, useState } from "react";
import { CssBaseline, Box, ThemeProvider, Container } from "@mui/material";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import { TABS } from "./components/tabRegistry";
import { createAppTheme } from "./theme";

const THEME_STORAGE_KEY = "theme";

const getInitialDarkMode = () => {
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored) return stored === "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const getTabFromPath = () => {
	const { pathname } = window.location;
	// "/works/" -> "works"; "/" -> "home"; deeper segments ignored (SPA).
	const name = pathname.split("/").filter(Boolean)[0];
	return TABS.some((t) => t.name === name) ? name : "home";
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
	const [activeTab, setActiveTab] = useState(() => getTabFromPath());
	const [darkMode, setDarkMode] = useState(getInitialDarkMode);

	useEffect(() => {
		localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
	}, [darkMode]);

	useEffect(() => {
		const handlePopState = () => {
			setActiveTab(getTabFromPath());
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

	const handleTabChange = (newValue) => {
		setActiveTab(newValue);
		const tab = TABS.find((t) => t.name === newValue);
		const url = tab ? tab.path : "/";
		window.history.pushState(null, "", url);
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
					tabs={TABS}
					activeTab={activeTab}
					darkMode={darkMode}
					onTabChange={handleTabChange}
					onThemeToggle={() => setDarkMode((prev) => !prev)}
				/>
				<Container
					maxWidth="md"
					sx={{
						pt: { xs: "calc(64px + env(safe-area-inset-top))", md: 1 },
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