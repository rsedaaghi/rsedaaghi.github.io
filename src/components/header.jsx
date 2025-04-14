import {
	AppBar,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	IconButton,
	useMediaQuery,
	useTheme as useMuiTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = ({ tabs, onTabChange, activeTab, onThemeToggle, darkMode }) => {
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundColor: darkMode ? "#212121" : "#ffffff",
				color: darkMode ? "#ffffff" : "#000000",
				boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
				zIndex: 10,
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
					My Portfolio
				</Typography>
				{!isMobile && (
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
				<IconButton
					onClick={onThemeToggle}
					sx={{
						color: darkMode ? "#fbc02d" : "#ffa000",
					}}
				>
					{darkMode ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
