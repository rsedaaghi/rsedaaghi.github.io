import React, { useMemo } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import DataState from "../dataState";
import useJsonData from "../../utils/useJsonData";

const formatPeriod = (entry) => {
	if (!entry.startDate && !entry.endDate) return "";
	const end =
		entry.endDate === "" && entry.startDate ? "Present" : entry.endDate;
	return [entry.startDate, end].filter(Boolean).join(" – ");
};

const ExperienceTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/experience.json");

	const entries = useMemo(() => {
		const list = Array.isArray(data) ? data : [];
		return [...list].sort(
			(a, b) => (b.startDate || "0000").localeCompare(a.startDate || "0000")
		);
	}, [data]);

	return (
		<Box>
			<DataState loading={loading} error={error}>
				{entries.length > 0 ? (
					<Box
						sx={{
							position: "relative",
							pl: 4,
							borderLeft: "2px solid",
							borderColor: "divider",
							ml: { xs: 1, md: 0 },
						}}
					>
						{entries.map((entry) => {
							const isEducation = entry.kind === "education";
							const orgName = isEducation ? entry.institution : entry.company;
							return (
								<Box key={`${entry.kind}-${entry.role}-${orgName}`} sx={{ mb: 2.5 }}>
									<Box
										sx={{
											position: "absolute",
											left: -7.5,
											top: 14,
											width: 13,
											height: 13,
											borderRadius: "50%",
											bgcolor: "primary.main",
											border: "2px solid",
											borderColor: "background.default",
										}}
									/>
									<Card sx={{ bgcolor: (theme) => (theme.palette.mode === "dark" ? "grey.900" : "grey.50") }}>
										<CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
											<Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
												<Chip
													icon={isEducation ? <SchoolIcon /> : <WorkOutlineIcon />}
													label={isEducation ? "Education" : "Work"}
													size="small"
													variant="outlined"
													color={isEducation ? "secondary" : "primary"}
													sx={{ textTransform: "none" }}
												/>
												{formatPeriod(entry) && (
													<Typography variant="caption" sx={{ color: "text.secondary" }}>
														📅 {formatPeriod(entry)}
													</Typography>
												)}
											</Box>
											<Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }} component="div">
												{entry.role}
											</Typography>
											<Typography
												variant="subtitle2"
												sx={{ mb: 1, color: "primary.main" }}
											>
												{entry.companyUrl ? (
													<a
														href={entry.companyUrl}
														target="_blank"
														rel="noopener noreferrer"
														style={{ color: "inherit", textDecoration: "none" }}
													>
														{orgName}
													</a>
												) : (
													orgName
												)}
											</Typography>
											{entry.description && (
												<Typography variant="body2" component="div" sx={{ color: "text.secondary", textAlign: "justify" }}>
													{entry.description}
												</Typography>
											)}
										</CardContent>
									</Card>
								</Box>
							);
						})}
					</Box>
				) : (
					<Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}>
						No experience available.
					</Typography>
				)}
			</DataState>
		</Box>
	);
};

export default ExperienceTab;