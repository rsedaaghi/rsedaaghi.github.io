import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
// Import the mask from your src folder
import mask from "../assets/masks/mask.svg";

const Home = () => {
	const [homeData, setHomeData] = useState({});

	useEffect(() => {
		fetch("/assets/data/home.json")
			.then((response) => response.json())
			.then((data) => setHomeData(data))
			.catch((error) => console.error("Error loading home data:", error));
	}, []);

	return (
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

			{/* Right Section: Image with Mask */}
			<Grid item xs={12} md={6}>
				<Box
					sx={{
						width: "100%",
						maxWidth: "400px",
						mx: "auto",
						// Apply the imported mask using CSS mask properties
						maskImage: `url(${mask})`,
						WebkitMaskImage: `url(${mask})`,
						maskSize: "cover", // or "contain" based on the desired effect
						WebkitMaskSize: "cover",
						maskRepeat: "no-repeat",
						WebkitMaskRepeat: "no-repeat",
						maskPosition: "center",
						WebkitMaskPosition: "center",
						backgroundColor: "#fff",
					}}
				>
					<Box
						component="img"
						src={homeData.image}
						alt="Portfolio Profile"
						sx={{
							width: "100%",
							borderRadius: "8px",
						}}
					/>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Home;
