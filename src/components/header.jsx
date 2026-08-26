import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	IconButton,
	useMediaQuery,
	useTheme,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Box,
	Button,
} from "@mui/material";
import { Menu, DarkMode, LightMode } from "@mui/icons-material";
import packageJSON from "../../package.json";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	const muiTheme = useTheme();
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
				position={isMobile ? "fixed" : "sticky"}
				sx={{
					top: 0,
					backgroundColor: "background.paper",
					color: "text.primary",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
					borderRadius: isMobile ? "0" : "0 0 8px 8px",
				}}
			>
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
				>
					<Button
						onClick={() => onTabChange("home")}
						sx={{ textTransform: "none", p: 0 }}
					>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								color: darkMode ? "primary.light" : "primary.main",
							}}
						>
							{packageJSON.author}
						</Typography>
					</Button>
					{isMobile ? (
						<>
							<IconButton
								onClick={onThemeToggle}
								aria-label="Toggle dark mode"
								sx={{ color: darkMode ? "#fbc02d" : "#ffa000" }}
							>
								{darkMode ? <LightMode /> : <DarkMode />}
							</IconButton>
							<IconButton
								onClick={toggleDrawer(true)}
								sx={{ color: darkMode ? "#fbc02d" : "#ffa000" }}
							>
								<Menu />
							</IconButton>
						</>
					) : (
						<Tabs
							value={activeTab}
							onChange={(e, newValue) => onTabChange(newValue)}
							textColor="inherit"
							slotProps={{
								indicator: {
									sx: { backgroundColor: "primary.main" },
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
					<IconButton
						onClick={onThemeToggle}
						aria-label="Toggle dark mode"
						sx={{ color: darkMode ? "#fbc02d" : "#ffa000", ml: 1 }}
					>
						{darkMode ? <LightMode /> : <DarkMode />}
					</IconButton>
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
