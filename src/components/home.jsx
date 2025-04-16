import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import maskUrl from "../assets/masks/mask.svg?url";

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
			sx={{ textAlign: { xs: "center", md: "left" } }}
		>
			{/* Left Section: Text Content */}
			<Grid size={{ xs: 12, md: 6 }}>
				<Typography
					variant="h3"
					sx={{ fontWeight: "700", mb: 2, color: "primary.main" }}
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
			<Grid size={{ xs: 12, md: 6 }}>
				<Box
					sx={{
						width: "100%",
						maxWidth: "400px",
						mx: "auto",
						maskImage: `url(${maskUrl})`,
						WebkitMaskImage: `url(${maskUrl})`,
						maskRepeat: "no-repeat",
						WebkitMaskRepeat: "no-repeat",
						maskPosition: "center",
						WebkitMaskPosition: "center",
						maskSize: "cover",
						WebkitMaskSize: "cover",
						backgroundColor: "transparent",
					}}
				>
					<Box
						component="img"
						src={homeData.image}
						alt="Portfolio Profile"
						sx={{
							width: "100%",
							display: "block",
						}}
					/>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Home;
