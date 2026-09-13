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

	const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

	const handleTabChange = (newValue) => {
		setActiveTab(newValue);
		window.history.pushState(null, "", `#${newValue}`);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const activeTabData = TABS.find((tab) => tab.name === activeTab);

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
						pt: { xs: "70px", md: 1 },
						pb: { xs: 1, md: 1 },
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: { xs: "flex-start", md: "center" },
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