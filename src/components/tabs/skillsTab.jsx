import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import useJsonData from "../../utils/useJsonData";

const SkillsTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/skills.json");

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error) {
		return (
			<Typography align="center" color="error">
				Failed to load content.
			</Typography>
		);
	}

	const skills = (Array.isArray(data) ? data : []).map((skill) =>
		typeof skill === "string" ? { title: skill } : skill
	);

	return (
		<Box>
			{skills.length > 0 ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						gap: 2,
						px: 2,
					}}
				>
					{skills.map((skill) => (
						<Chip
							key={skill.title}
							label={skill.title}
							color="primary"
							variant="outlined"
							sx={{ fontSize: "1rem", padding: "0.5rem" }}
						/>
					))}
				</Box>
			) : (
				<Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}>
					No skills available.
				</Typography>
			)}
		</Box>
	);
};

export default SkillsTab;
