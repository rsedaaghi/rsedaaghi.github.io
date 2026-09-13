import React, { useMemo } from "react";
import { Box, Chip, Typography } from "@mui/material";
import DataState from "../dataState";
import useJsonData from "../../utils/useJsonData";

const normalizeItem = (item) => {
	if (typeof item === "string") return { title: item };
	return item;
};

const SkillsTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/skills.json");

	const sections = useMemo(() => {
		const skills = Array.isArray(data) ? data.map(normalizeItem) : [];
		const isCategorized = skills.some((skill) => Array.isArray(skill.skills));
		if (isCategorized) {
			return skills
				.filter((skill) => Array.isArray(skill.skills) && skill.skills.length > 0)
				.map((skill) => ({
					category: skill.category || "Skills",
					skills: skill.skills,
				}));
		}
		return [{ category: "Skills", skills: skills.map((s) => s.title).filter(Boolean) }];
	}, [data]);

	return (
		<Box>
			<DataState loading={loading} error={error}>
				{sections.length > 0 ? (
					sections.map((section) => (
						<Box key={section.category} sx={{ mb: 3, textAlign: "center" }}>
							<Typography
								variant="h6"
								sx={{
									fontWeight: "bold",
									mb: 1.25,
									color: "primary.main",
								}}
							>
								{section.category}
							</Typography>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									flexWrap: "wrap",
									gap: 1.25,
									px: 1.5,
								}}
							>
								{section.skills.map((title) => (
									<Chip
										key={title}
										label={title}
										color="primary"
										variant="outlined"
										sx={{ fontSize: "0.85rem", px: 0.5 }}
									/>
								))}
							</Box>
						</Box>
					))
				) : (
					<Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}>
						No skills available.
					</Typography>
				)}
			</DataState>
		</Box>
	);
};

export default SkillsTab;