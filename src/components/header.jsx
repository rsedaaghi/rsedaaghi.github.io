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

	const modeColor = (theme) =>
		darkMode ? theme.palette.warning.light : theme.palette.warning.main;

	const drawerContent = (
		<List>
			{tabs.map((tab) => (
				<ListItem key={tab.name} disablePadding>
					<ListItemButton
						onClick={() => {
							onTabChange(tab.name);
							setDrawerOpen(false);
						}}
						sx={{ borderRadius: 2 }}
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
								background: (theme) =>
									darkMode
										? "none"
										: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
								...(darkMode
									? {}
									: {
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
										backgroundClip: "text",
									}),
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
								sx={{ color: modeColor }}
							>
								{darkMode ? <LightMode /> : <DarkMode />}
							</IconButton>
							<IconButton
								onClick={toggleDrawer(true)}
								aria-label="Open navigation menu"
								sx={{ color: modeColor }}
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
						sx={{ color: modeColor, ml: 1 }}
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
						bgcolor: "background.default",
					},
				}}
			>
				<Box sx={{ padding: 2, minWidth: 220 }}>{drawerContent}</Box>
			</Drawer>
		</>
	);
};

export default Header;