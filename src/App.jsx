import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import Home from "./components/home";
import GalleryTab from "./components/gallery";
import packageJson from "../package.json";
import {
	CssBaseline,
	Box,
	createTheme,
	ThemeProvider,
	Container,
} from "@mui/material";

const tabs = [
	{ label: "Home", name: "home", component: <Home /> },
	// { label: "About", name: "about", jsonFile: "about.json" },
	{ label: "Skills", name: "skills", jsonFile: "skills.json" },
	{ label: "Works", name: "works", jsonFile: "works.json" },
	{ label: "Gallery", name: "gallery", component: <GalleryTab /> }, // New Gallery tab
	{ label: "Contact", name: "contact", jsonFile: "contact.json" },
];

const App = () => {
	const [activeTab, setActiveTab] = useState("home");
	const [darkMode, setDarkMode] = useState(false);
	const [lastUpdated, setLastUpdated] = useState("");

	// On mount, check for a URL hash to set an active tab.
	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const tabName = hash.substring(1); // remove '#' (e.g., from '#skills')
			if (tabs.some((tab) => tab.name === tabName)) {
				setActiveTab(tabName);
			}
		}
	}, []);

	useEffect(() => {
		const lastModified = packageJson.last_update;
		setLastUpdated(lastModified);
	}, []);

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: { main: "#3f51b5" },
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
	});

	const handleTabChange = (newValue) => {
		setActiveTab(newValue);
		window.history.pushState(null, "", `#${newValue}`);
	};

	const handleThemeToggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	const activeTabData = tabs.find((tab) => tab.name === activeTab);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container
				maxWidth="md"
				sx={{
					// Provide extra top padding on mobile to compensate for the fixed header.
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
					tabs={tabs}
					activeTab={activeTab}
					darkMode={darkMode}
					onTabChange={handleTabChange}
					onThemeToggle={handleThemeToggle}
				/>
				<Container
					maxWidth="lg"
					sx={{
						py: { xs: 4, md: 8 },
						background: "linear-gradient(135deg, #ece9e6, #ffffff)",
						borderRadius: 3,
						boxShadow: 3,
						mt: { xs: 2, md: 4 },
					}}
				>
					{activeTabData.component ? (
						activeTabData.component
					) : (
						<TabContent tab={activeTabData} />
					)}
				</Container>
				<Footer lastUpdated={lastUpdated} darkMode={darkMode} />
			</Container>
		</ThemeProvider>
	);
};

export default App;
