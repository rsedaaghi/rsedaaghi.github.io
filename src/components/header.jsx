import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	IconButton,
	useMediaQuery,
	useTheme as useMuiTheme,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Box, // Import Box component for styling
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import packageJSON from "../../package.json";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open) => () => {
		setDrawerOpen(open);
	};

	const drawerContent = (
		<List>
			{tabs.map((tab) => (
				<ListItem key={tab.name} disablePadding>
					<ListItemButton
						onClick={() => {
							onTabChange(tab.name);
							setDrawerOpen(false);
						}}
					>
						<ListItemText primary={tab.label} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);

	return (
		<>
			<AppBar
				position="sticky"
				sx={{
					backgroundColor: darkMode ? "#212121" : "#ffffff",
					color: darkMode ? "#ffffff" : "#000000",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
					borderRadius: "0 0 8px 8px", // Rounded bottom corners
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Typography
						variant="h6"
						sx={{
							fontWeight: "bold",
							color: darkMode ? "#90caf9" : "#1976d2",
						}}
					>
						{packageJSON.author}
					</Typography>
					{isMobile ? (
						<IconButton
							onClick={toggleDrawer(true)}
							sx={{ color: darkMode ? "#fbc02d" : "#ffa000" }}
						>
							<Menu />
						</IconButton>
					) : (
						<Tabs
							value={activeTab}
							onChange={(e, newValue) => onTabChange(newValue)}
							textColor="inherit"
							TabIndicatorProps={{
								style: {
									backgroundColor: darkMode
										? "#90caf9"
										: "#1976d2",
								},
							}}
						>
							{tabs.map((tab) => (
								<Tab
									key={tab.name}
									label={tab.label}
									value={tab.name}
									sx={{
										textTransform: "capitalize",
										fontWeight: "bold",
									}}
								/>
							))}
						</Tabs>
					)}
				</Toolbar>
			</AppBar>

			<Drawer
				anchor="right"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				sx={{
					"& .MuiDrawer-paper": {
						borderRadius: "8px 0 0 8px", // Rounded corners for the drawer
					},
				}}
			>
				<Box
					sx={{
						padding: 2, // Optional: add some padding
					}}
				>
					{drawerContent}
				</Box>
			</Drawer>
		</>
	);
};

export default Header;
