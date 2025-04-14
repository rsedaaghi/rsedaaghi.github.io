import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	useMediaQuery,
	useTheme as useMuiTheme,
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundColor: darkMode ? "#212121" : "#ffffff",
				color: darkMode ? "#ffffff" : "#212121",
				boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				{/* Logo or Title */}
				<Typography
					variant="h5"
					sx={{
						fontWeight: "bold",
						color: darkMode ? "#90caf9" : "#1976d2",
					}}
				>
					My Portfolio
				</Typography>

				{/* Navigation Tabs */}
				{!isMobile ? (
					<Tabs
						value={activeTab}
						onChange={(e, newValue) => onTabChange(newValue)}
						indicatorColor="primary"
						textColor="inherit"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: darkMode
									? "#90caf9"
									: "#1976d2",
							},
							"& .MuiTab-root": {
								color: darkMode ? "#b0bec5" : "#455a64",
								"&.Mui-selected": {
									color: darkMode ? "#ffffff" : "#1976d2",
									fontWeight: "bold",
								},
							},
						}}
					>
						{tabs.map((tab) => (
							<Tab
								key={tab.name}
								label={tab.label}
								value={tab.name}
								sx={{ textTransform: "capitalize" }}
							/>
						))}
					</Tabs>
				) : (
					<IconButton>
						<Menu
							sx={{ color: darkMode ? "#90caf9" : "#1976d2" }}
						/>
					</IconButton>
				)}

				{/* Dark Mode Toggle */}
				<IconButton
					onClick={onThemeToggle}
					sx={{
						color: darkMode ? "#fbc02d" : "#ffa000",
						transition: "color 0.3s ease",
					}}
				>
					{darkMode ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
