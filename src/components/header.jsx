import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: "transparent", // Makes the AppBar transparent
				boxShadow: "none", // Removes the default shadow
			}}
		>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
					My Portfolio
				</Typography>
				<Tabs
					value={activeTab} // Uses the activeTab prop
					onChange={onTabChange} // Calls the onTabChange passed from App.jsx
					indicatorColor="primary"
					textColor="primary"
					sx={{
						"& .MuiTabs-indicator": {
							backgroundColor: "#1976d2", // Blue line under active tab
						},
						"& .MuiTab-root": {
							color: "#1976d2", // Sets the text color for tabs
							"&.Mui-selected": {
								fontWeight: "bold", // Highlights selected tab for visibility
							},
						},
					}}
				>
					{tabs.map((tab) => (
						<Tab
							key={tab.name}
							label={tab.label}
							value={tab.name}
						/>
					))}
				</Tabs>
				{/* Dark Mode Icon Toggle */}
				<IconButton
					onClick={onThemeToggle}
					sx={{ marginLeft: 1 }}
				>
					{darkMode ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
