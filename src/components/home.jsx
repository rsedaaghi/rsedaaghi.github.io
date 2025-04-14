import { useEffect, useState } from "react";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";

const Home = () => {
	const [homeData, setHomeData] = useState({});
	useEffect(() => {
		fetch("/assets/data/home.json")
			.then((response) => {
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);
				return response.json();
			})
			.then((data) => setHomeData(data))
			.catch((error) => console.error("Error loading home data:", error));
	}, []);

	return (
		<Paper
			elevation={3}
			sx={{
				p: 4,
				borderRadius: 2,
				backgroundColor: "#f9f9f9",
				boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
			}}
		>
			<Grid container spacing={4} alignItems="center">
				{/* Text Section */}
				<Grid item xs={12} md={6}>
					<Box sx={{ textAlign: "left" }}>
						<Typography
							variant="h4"
							gutterBottom
							sx={{
								color: "#1976d2",
								fontWeight: "bold",
							}}
						>
							Welcome
						</Typography>
						<Typography
							variant="body1"
							sx={{
								mb: 2,
								lineHeight: 1.7,
								color: "#455a64",
							}}
						>
							{homeData.description}
						</Typography>
						{homeData.contactButton?.isOn && (
							<Button
								variant="contained"
								href={homeData.contactButton.url}
								sx={{
									backgroundColor: "#1976d2",
									color: "#fff",
									"&:hover": { backgroundColor: "#1565c0" },
									borderRadius: 1,
									px: 4,
									py: 1,
								}}
							>
								Contact Me
							</Button>
						)}
					</Box>
				</Grid>

				{/* Image Section */}
				<Grid item xs={12} md={6} container justifyContent="center">
					<Box
						component="img"
						src={homeData.image}
						alt="Profile"
						sx={{
							width: "85%",
							objectFit: "cover",
							borderRadius: "10px",
							boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
						}}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Home;
