import React, { Suspense } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { TAB_COMPONENTS, TABS_WITH_HEADING } from "./tabRegistry";

// Renders the currently active tab. Component resolution is centralized in
// tabRegistry (DRY): this file owns presentation only (SOLID).
const TabContent = ({ tab, onNavigate }) => {
	if (!tab) {
		return (
			<Typography variant="body1" color="textSecondary" align="center">
				No tab selected
			</Typography>
		);
	}

	const TabComponent = TAB_COMPONENTS[tab.name];

	if (!TabComponent) {
		return (
			<Typography
				variant="body1"
				sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
			>
				No content available.
			</Typography>
		);
	}

	return (
		<Box>
			{TABS_WITH_HEADING.includes(tab.name) && (
				<Typography
					variant="h4"
					sx={{
						fontWeight: "bold",
						textAlign: "center",
						mb: 2.5,
						color: "primary.main",
					}}
				>
					{tab.label}
				</Typography>
			)}
			<Suspense
				fallback={
					<Box
						sx={{
							py: 4,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: 240,
						}}
					>
						<CircularProgress size={32} />
					</Box>
				}
			>
				<TabComponent tab={tab} onNavigate={onNavigate} />
			</Suspense>
		</Box>
	);
};

export default TabContent;