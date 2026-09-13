import React, { useMemo } from "react";
import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import LaunchIcon from "@mui/icons-material/Launch";
import DataState from "../dataState";
import useJsonData from "../../utils/useJsonData";

const formatPeriod = (entry) => {
	if (!entry.startDate && !entry.endDate) return "";
	const end =
		entry.endDate === "" && entry.startDate ? "Present" : entry.endDate;
	return [entry.startDate, end].filter(Boolean).join(" – ");
};

// antd-style Timeline dot: a filled state dot sitting on the vertical rail.
// Ongoing entries get a soft pulsing halo (disabled under reduced-motion).
const TimelineDot = ({ isEducation, isOngoing }) => (
	<Box
		className="timeline-dot"
		aria-hidden="true"
		sx={{
			position: "absolute",
			top: 18,
			left: "50%",
			transform: "translateX(-50%)",
			width: 13,
			height: 13,
			borderRadius: "50%",
			bgcolor: isEducation ? "secondary.main" : "primary.main",
		}}
	>
		{isOngoing && (
			<Box
				className="timeline-pulse"
				sx={{
					position: "absolute",
					inset: -5,
					borderRadius: "50%",
					border: "2px solid",
					borderColor: isEducation ? "secondary.main" : "primary.main",
				}}
			/>
		)}
	</Box>
);

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
					<Box>
						{entries.map((entry, index) => {
							const isEducation = entry.kind === "education";
							const orgName = isEducation
								? entry.institution
								: entry.company;
							const period = formatPeriod(entry);
							const isOngoing = Boolean(entry.startDate) && entry.endDate === "";
							const isLast = index === entries.length - 1;

							return (
								<Box
									key={`${entry.kind}-${entry.role}-${orgName}`}
									sx={{ display: "flex", alignItems: "stretch" }}
								>
									{/* Date label rail (antd "mode=left"); moves into the card on mobile. */}
									<Typography
										variant="body2"
										sx={{
											display: { xs: "none", md: "block" },
											flex: "0 0 150px",
											pt: 1.4,
											pr: 2.5,
											textAlign: "right",
											color: "text.secondary",
											fontWeight: 600,
										}}
									>
										{period}
									</Typography>

									{/* Vertical connector rail */}
									<Box
										sx={{
											flex: "0 0 24px",
											position: "relative",
											"&::before": {
												content: '""',
												position: "absolute",
												top: 0,
												left: "50%",
												transform: "translateX(-50%)",
												width: 2,
												bgcolor: "divider",
												...(isLast
													? { bottom: 25 }
													: { bottom: 0 }),
											},
										}}
									>
										<TimelineDot
											isEducation={isEducation}
											isOngoing={isOngoing}
										/>
									</Box>

									{/* Content card */}
									<Box sx={{ flex: 1, minWidth: 0, pb: { xs: 2.5, md: 3 } }}>
										<Card
											sx={{
												bgcolor: (theme) =>
													theme.palette.mode === "dark"
														? "grey.900"
														: "grey.50",
											}}
										>
											<CardContent
												sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}
											>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														gap: 1,
														flexWrap: "wrap",
													}}
												>
													<Chip
														icon={
															isEducation ? (
																<SchoolIcon />
															) : (
																<WorkOutlineIcon />
															)
														}
														label={isEducation ? "Education" : "Work"}
														size="small"
														variant="outlined"
														color={isEducation ? "secondary" : "primary"}
														sx={{ textTransform: "none" }}
													/>
													{period && (
														<Typography
															variant="caption"
															sx={{
																color: "text.secondary",
																display: { xs: "inline-flex", md: "none" },
																alignItems: "center",
															}}
														>
															📅 {period}
														</Typography>
													)}
												</Box>
												<Typography
													variant="h6"
													sx={{ fontWeight: "bold", mt: 1 }}
													component="div"
												>
													{entry.role}
												</Typography>
												<Typography
													variant="subtitle2"
													sx={{ mb: 1, color: "primary.main" }}
												>
													{orgName}
												</Typography>
												{entry.websiteUrl && (
													<Button
														variant="outlined"
														size="small"
														href={entry.websiteUrl}
														target="_blank"
														rel="noopener noreferrer"
														startIcon={<LaunchIcon />}
														sx={{ mb: 1.5, px: 1.5 }}
													>
														Website
													</Button>
												)}
												{entry.description && (
													<Typography
														variant="body2"
														component="div"
														sx={{
															color: "text.secondary",
															textAlign: "justify",
														}}
													>
														{entry.description}
													</Typography>
												)}
											</CardContent>
										</Card>
									</Box>
								</Box>
							);
						})}
					</Box>
				) : (
					<Typography
						variant="body1"
						sx={{
							textAlign: "center",
							color: "text.secondary",
							mt: 2,
						}}
					>
						No experience available.
					</Typography>
				)}
			</DataState>
		</Box>
	);
};

export default ExperienceTab;