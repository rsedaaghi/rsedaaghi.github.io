import React from "react";
import { Box, Typography } from "@mui/material";
import SkillsTab from "./tabs/skillsTab";
import WorksTab from "./tabs/worksTab";
import ContactTab from "./tabs/contactTab";

// Registry: tab.name -> component
// If a tab has no entry here it renders a generic message.
const TAB_COMPONENTS = {
	skills: SkillsTab,
	works: WorksTab,
	contact: ContactTab,
};

const TabContent = ({ tab }) => {
	if (!tab) {
		return (
			<Typography variant="body1" color="textSecondary" align="center">
				No tab selected
			</Typography>
		);
	}

	const TabComponent = TAB_COMPONENTS[tab.name];

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{
					fontWeight: "bold",
					textAlign: "center",
					mb: 4,
					color: "primary.main",
				}}
			>
				{tab.label}
			</Typography>

			{TabComponent ? (
				<TabComponent tab={tab} />
			) : (
				<Typography
					variant="body1"
					sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
				>
					No content available.
				</Typography>
			)}
		</Box>
	);
};

export default TabContent;
