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
				py: 6,
				px: { xs: 2, md: 6 },
				backgroundColor: "#f5f5f5",
				borderRadius: 4,
				boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
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
						variant="h2"
						sx={{
							fontWeight: "bold",
							mb: 3,
							color: "#1976d2",
							fontSize: { xs: "2.5rem", md: "3rem" },
						}}
					>
						Welcome to My Portfolio
					</Typography>
					<Typography
						variant="body1"
						sx={{
							mb: 4,
							color: "#455a64",
							lineHeight: 1.8,
							fontSize: { xs: "1rem", md: "1.25rem" },
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
								borderRadius: 2,
								px: 5,
								py: 1.5,
								fontSize: { xs: "0.9rem", md: "1rem" },
								boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
								"&:hover": { backgroundColor: "#1565c0" },
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
							borderRadius: "50%",
							boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
							mx: { xs: "auto", md: 0 },
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
