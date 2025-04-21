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
	Box,
	Button,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import packageJSON from "../../package.json";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open) => () => {
		setDrawerOpen(open);
	};

	const handleAuthorClick = () => {
		onTabChange("home");
		window.history.pushState(null, "", "#home");
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
				position={isMobile ? "fixed" : "sticky"}
				sx={{
					top: 0,
					backgroundColor: darkMode ? "#212121" : "#ffffff",
					color: darkMode ? "#ffffff" : "#000000",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
					borderRadius: isMobile ? "0" : "0 0 8px 8px",
				}}
			>
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<Button
						onClick={handleAuthorClick}
						sx={{ textTransform: "none", p: 0 }}
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
					</Button>
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
							slotProps={{
								indicator: {
									sx: {
										backgroundColor: darkMode
											? "#90caf9"
											: "#1976d2",
									},
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
						borderRadius: "8px 0 0 8px",
					},
				}}
			>
				<Box sx={{ padding: 2 }}>{drawerContent}</Box>
			</Drawer>
		</>
	);
};

export default Header;
