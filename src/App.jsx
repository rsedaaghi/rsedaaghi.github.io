import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import Home from "./components/home";
import {
	Box,
	Card,
	createTheme,
	ThemeProvider,
	Paper,
	Container,
} from "@mui/material";

const tabs = [
	{ label: "Home", name: "home", component: <Home /> },
	{ label: "About", name: "about", jsonFile: "about.json" },
	{ label: "Skills", name: "skills", jsonFile: "skills.json" },
	{ label: "Works", name: "works", jsonFile: "works.json" },
	{ label: "Contact", name: "contact", jsonFile: "contact.json" },
];

const App = () => {
	const [activeTab, setActiveTab] = useState("home"); // Default value matches 'home'
	const [darkMode, setDarkMode] = useState(false);

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: { main: "#1976d2" },
			secondary: { main: "#ff9800" },
		},
		typography: {
			fontFamily: `'Roboto', sans-serif`,
		},
	});

	const handleThemeToggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="md" sx={{ py: 4 }}>
				<Paper
					elevation={3}
					sx={{
						borderRadius: 2,
						p: 2,
						overflow: "hidden",
					}}
				>
					<Header
						tabs={tabs}
						activeTab={activeTab}
						darkMode={darkMode}
						onTabChange={handleTabChange}
						onThemeToggle={handleThemeToggle}
					/>
					{activeTab === "home" ? (
						<Home />
					) : (
						<TabContent
							tab={tabs.find((tab) => tab.name === activeTab)}
						/>
					)}
					<Footer />
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default App;
