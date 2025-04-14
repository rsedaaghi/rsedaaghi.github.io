import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const Experience = () => {
	const [experienceData, setExperienceData] = useState([]);

	useEffect(() => {
		fetch("/assets/data/experience.json")
			.then((response) => response.json())
			.then((data) => setExperienceData(data))
			.catch((error) =>
				console.error("Error loading experience data:", error)
			);
	}, []);

	return (
		<Box sx={{ py: 4 }}>
			<Typography
				variant="h4"
				sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
			>
				Experience
			</Typography>
			<Grid container spacing={3}>
				{experienceData.map((item, index) => (
					<Grid item xs={12} key={index}>
						<Paper
							sx={{
								p: 3,
								boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
							}}
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: "bold" }}
							>
								{item.title} @ {item.company}
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: "#757575", mb: 1 }}
							>
								{item.startDate} -{" "}
								{item.endDate ? item.endDate : "Present"}
							</Typography>
							<Typography
								variant="body1"
								sx={{ lineHeight: 1.7 }}
							>
								{item.description}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Experience;
