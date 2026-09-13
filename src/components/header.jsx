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
	ListItemIcon,
	ListItemText,
	ListItemButton,
	Box,
	Button,
	Badge,
} from "@mui/material";
import { Menu, DarkMode, LightMode, Close } from "@mui/icons-material";
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
		<List sx={{ py: 1 }}>
			{tabs.map((tab) => {
				const Icon = tab.icon;
				const isActive = tab.name === activeTab;
				return (
					<ListItem key={tab.name} disablePadding>
						<ListItemButton
							onClick={() => {
								onTabChange(tab.name);
								setDrawerOpen(false);
							}}
							selected={isActive}
							sx={{
								borderRadius: 2,
								mx: 1,
								mb: 0.5,
								minHeight: 48,
								color: isActive ? "primary.main" : "text.primary",
								"&.Mui-selected": { bgcolor: "rgba(79,70,229,0.12)" },
								"&.Mui-selected:hover": { bgcolor: "rgba(79,70,229,0.18)" },
							}}
						>
							{Icon && (
								<ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
									<Icon />
								</ListItemIcon>
							)}
							<ListItemText
								primary={tab.label}
								primaryTypographyProps={{ fontWeight: 700 }}
								secondary={tab.count != null ? `${tab.count} items` : undefined}
							/>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);

	return (
		<>
			<AppBar
				position={isMobile ? "fixed" : "sticky"}
				sx={{
					top: 0,
					paddingTop: "env(safe-area-inset-top)",
					backgroundColor: "background.paper",
					color: "text.primary",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
					borderRadius: isMobile ? "0" : "0 0 8px 8px",
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						gap: 1,
						minHeight: { xs: 64, md: 64 },
						px: { xs: 1.5, md: 2 },
					}}
				>
					<Button
						onClick={() => onTabChange("home")}
						sx={{ textTransform: "none", p: 0 }}
					>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								whiteSpace: "nowrap",
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
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<IconButton
								onClick={onThemeToggle}
								aria-label="Toggle dark mode"
								size="large"
								sx={{ color: modeColor }}
							>
								{darkMode ? <LightMode /> : <DarkMode />}
							</IconButton>
							<IconButton
								onClick={toggleDrawer(true)}
								aria-label="Open navigation menu"
								size="large"
								sx={{ color: modeColor }}
							>
								<Menu />
							</IconButton>
						</Box>
					) : (
						<>
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
								{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<Tab
										key={tab.name}
										value={tab.name}
										icon={Icon ? <Icon sx={{ fontSize: 18 }} /> : undefined}
										iconPosition="start"
										label={
											<span>
												{tab.label}
												{tab.count != null && (
													<Badge
														color="primary"
														badgeContent={tab.count}
														sx={{
															ml: 1,
															"& .MuiBadge-badge": {
																position: "static",
																transform: "none",
															},
														}}
													/>
												)}
											</span>
										}
										sx={{
											textTransform: "capitalize",
											fontWeight: "bold",
											minHeight: 48,
										}}
									/>
								);
							})}
							</Tabs>
							<IconButton
								onClick={onThemeToggle}
								aria-label="Toggle dark mode"
								sx={{ color: modeColor, ml: 1 }}
							>
								{darkMode ? <LightMode /> : <DarkMode />}
							</IconButton>
						</>
					)}
				</Toolbar>
			</AppBar>

			<Drawer
				anchor="right"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				sx={{
					"& .MuiDrawer-paper": {
						borderRadius: "12px 0 0 12px",
						bgcolor: "background.default",
						pb: "env(safe-area-inset-bottom)",
					},
				}}
			>
				<Box sx={{ p: 1.5, minWidth: { xs: 280, sm: 320 } }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 1,
							pb: 1,
							mb: 1,
							borderBottom: "1px solid",
							borderColor: "divider",
						}}
					>
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: "bold", color: "text.secondary" }}
						>
							Navigate
						</Typography>
						<IconButton
							onClick={toggleDrawer(false)}
							aria-label="Close navigation menu"
							sx={{ color: "text.secondary" }}
						>
							<Close />
						</IconButton>
					</Box>
					{drawerContent}
				</Box>
			</Drawer>
		</>
	);
};

export default Header;