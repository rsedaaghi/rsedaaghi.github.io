import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const Education = () => {
	const [educationData, setEducationData] = useState([]);

	useEffect(() => {
		fetch("/assets/data/education.json")
			.then((response) => response.json())
			.then((data) => setEducationData(data))
			.catch((error) =>
				console.error("Error loading education data:", error)
			);
	}, []);

	return (
		<Box sx={{ py: 4 }}>
			<Typography
				variant="h4"
				sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
			>
				Education
			</Typography>
			<Grid container spacing={3}>
				{educationData.map((item, index) => (
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
								{item.degree} @ {item.school}
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
								sx={{ color: "#757575" }}
							>
								Grade: {item.grade}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Education;
