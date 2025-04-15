import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import Home from "./components/home";
import Experience from "./components/experience";
import Education from "./components/education";
import packageJson from "../package.json";
import {
	Box,
	createTheme,
	ThemeProvider,
	Paper,
	Container,
	Divider,
} from "@mui/material";

const tabs = [
	{ label: "Home", name: "home", component: <Home /> },
	{ label: "About", name: "about", jsonFile: "about.json" },
	{ label: "Skills", name: "skills", jsonFile: "skills.json" },
	// { label: "Experience", name: "experience", component: <Experience /> },
	// { label: "Education", name: "education", component: <Education /> },
	{ label: "Works", name: "works", jsonFile: "works.json" },
	{ label: "Contact", name: "contact", jsonFile: "contact.json" },
];

const App = () => {
	const [activeTab, setActiveTab] = useState("home");
	const [darkMode, setDarkMode] = useState(false);
	const [lastUpdated, setLastUpdated] = useState("");

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
			fontFamily: "'Roboto', sans-serif",
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						transition: "all 0.3s ease-in-out",
					},
				},
			},
		},
	});

	const handleThemeToggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	const handleTabChange = (newValue) => {
		setActiveTab(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				maxWidth="md"
				sx={{
					py: 6,
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Paper
					elevation={darkMode ? 10 : 4}
					sx={{
						borderRadius: 4,
						p: 4,
						width: "100%",
						boxShadow: darkMode
							? "0px 8px 16px rgba(0,0,0,0.8)"
							: "0px 8px 16px rgba(0,0,0,0.2)",
						backgroundColor: darkMode ? "#424242" : "#fff",
					}}
				>
					<Header
						tabs={tabs}
						activeTab={activeTab}
						darkMode={darkMode}
						onTabChange={handleTabChange}
						onThemeToggle={handleThemeToggle}
					/>
					<Divider sx={{ my: 3 }} />
					{activeTab === "home" ? (
						<Home />
					) : (
						<TabContent
							tab={tabs.find((tab) => tab.name === activeTab)}
						/>
					)}
				</Paper>
				<Footer lastUpdated={lastUpdated} darkMode={darkMode} />
			</Container>
		</ThemeProvider>
	);
};

export default App;
