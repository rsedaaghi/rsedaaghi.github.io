import { useEffect, useState } from "react";
import { Grid, Typography, Button, Box, Paper, Container } from "@mui/material";

const Home = () => {
	const [homeData, setHomeData] = useState({});

	useEffect(() => {
		fetch("/assets/data/home.json")
			.then((response) => response.json())
			.then((data) => setHomeData(data))
			.catch((error) => console.error("Error loading home data:", error));
	}, []);

	return (
		<Container
			maxWidth="lg"
			sx={{
				py: 8,
				background: "linear-gradient(135deg, #ece9e6, #ffffff)",
				borderRadius: 3,
				boxShadow: 3,
				mt: 4,
			}}
		>
			<Grid
				container
				spacing={6}
				alignItems="center"
				justifyContent="center"
				sx={{ textAlign: { xs: "center", md: "left" } }}
			>
				{/* Left Section: Text Content */}
				<Grid item xs={12} md={6}>
					<Typography
						variant="h3"
						sx={{
							fontWeight: "700",
							mb: 2,
							color: "primary.main",
						}}
					>
						Welcome to My Portfolio
					</Typography>

					<Typography
						variant="body1"
						sx={{
							mb: 4,
							color: "text.secondary",
							fontSize: { xs: "1rem", md: "1.15rem" },
						}}
					>
						{homeData.description}
					</Typography>

					{homeData.contactButton?.isOn && (
						<Button
							variant="contained"
							href={homeData.contactButton.url}
							sx={{
								borderRadius: 2,
								px: 5,
								py: 1.5,
								transition: "transform 0.2s ease-in-out",
								"&:hover": {
									transform: "scale(1.05)",
									backgroundColor: "#1565c0",
								},
							}}
						>
							Contact Me
						</Button>
					)}
				</Grid>

				{/* Right Section: Image with Modern Style */}
				<Grid item xs={12} md={6}>
					<Box
						component="img"
						src={homeData.image}
						alt="Portfolio Profile"
						sx={{
							width: "100%",
							maxWidth: "400px",
							borderRadius: "8px", // Changed from 50% to a softer rounding
							boxShadow: 4,
							mx: "auto",
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
