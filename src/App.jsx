import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TabContent from "./components/tabContent";
import Home from "./components/home";
import { Box, Card, createTheme, ThemeProvider } from "@mui/material";

const tabs = [
	{ label: "Home", name: "home", component: <Home /> },
	{ label: "About", name: "about", jsonFile: "about.json" },
	{ label: "Skills", name: "skills", jsonFile: "skills.json" },
	{ label: "Works", name: "works", jsonFile: "works.json" },
	{ label: "Contact", name: "contact", jsonFile: "contact.json" },
];

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
		},
	});

	const handleThemeToggle = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	const [activeTab, setActiveTab] = useState("home"); // Default value matches 'home'

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue); // Updates to the 'name' field of the selected tab
	};

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "calc(100vh - 1rem)",
					backgroundColor: "#f5f5f5",
					padding: "0 1rem",
					boxSizing: "border-box",
				}}
			>
				<Card
					sx={{
						borderRadius: 4, // Rounded corners
						boxShadow: 3, // Shadow
						padding: 3, // Internal spacing
						maxWidth: 800, // Set max width for the card
						width: "100%", // Responsive width
						height: "500px", // Fixed height
						backgroundColor: "#fff", // White card background
					}}
				>
					<Header
						tabs={tabs}
						onTabChange={handleTabChange}
						activeTab={activeTab} // Pass the correct activeTab
						onThemeToggle={handleThemeToggle} // Pass theme toggle function
            darkMode={darkMode}
					/>
					{activeTab === "home" ? (
						<Home />
					) : (
						<TabContent
							tab={tabs.find((tab) => tab.name === activeTab)}
						/>
					)}
					<Footer />
				</Card>
			</Box>
		</ThemeProvider>
	);
};

export default App;
