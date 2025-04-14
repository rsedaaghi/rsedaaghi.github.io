import { useEffect, useState } from "react";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";

const Home = () => {
	const [homeData, setHomeData] = useState({});
	useEffect(() => {
		fetch("/assets/data/home.json")
			.then((response) => response.json())
			.then((data) => setHomeData(data))
			.catch((error) => console.error("Error loading home data:", error));
	}, []);

	return (
		<Paper
			sx={{
				p: 4,
				borderRadius: 4,
				backgroundColor: "#f9f9f9",
				boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
			}}
		>
			<Grid container spacing={4} alignItems="center">
				<Grid item xs={12} md={6}>
					<Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
						Welcome to My Portfolio
					</Typography>
					<Typography
						variant="body1"
						sx={{ mb: 3, color: "#455a64" }}
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
								borderRadius: 2,
								px: 4,
								py: 1,
								"&:hover": { backgroundColor: "#1565c0" },
							}}
						>
							Contact Me
						</Button>
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<Box
						component="img"
						src={homeData.image}
						alt="Profile"
						sx={{
							width: "100%",
							maxWidth: "500px",
							borderRadius: 4,
							boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
						}}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Home;
