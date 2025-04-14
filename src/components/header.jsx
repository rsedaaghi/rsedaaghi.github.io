import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	useMediaQuery,
	useTheme as useMuiTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: "transparent", boxShadow: "none" }}
		>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
					My Portfolio
				</Typography>
				{isMobile ? (
					// Render a hamburger menu that opens a Drawer on mobile devices.
					<MobileMenu
						tabs={tabs}
						onTabChange={onTabChange}
						activeTab={activeTab}
					/>
				) : (
					<Tabs
						value={activeTab}
						onChange={onTabChange}
						indicatorColor="primary"
						textColor="primary"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: "#1976d2",
							},
							"& .MuiTab-root": {
								color: "#1976d2",
								"&.Mui-selected": { fontWeight: "bold" },
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
				)}
				<IconButton onClick={onThemeToggle} sx={{ ml: 1 }}>
					{darkMode ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
