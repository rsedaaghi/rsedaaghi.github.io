import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";

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
			spacing={2}
			sx={{
				textAlign: { xs: "center", md: "left" },
				alignItems: "center",
				// Small top margin for mobile breathing room
				mt: { xs: 2, md: 0 },
			}}
		>
			{/* Right Section: Image – appears first on mobile */}
			<Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
				<Box
					sx={{
						width: "100%",
						maxWidth: { xs: "200px", md: "400px" }, // Reduced maxWidth on mobile
						mx: "auto",
					}}
				>
					<Box
						sx={{
							width: "100%",
							maxWidth: { xs: "250px", md: "500px" }, // Increased by 1.25x
							mx: "auto",
						}}
					>
						<Box
							sx={{
								width: "100%",
								height: { xs: "187px", md: "auto" }, // Increased by 1.25x
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 479 467"
								width="100%"
								height="100%"
							>
								<defs>
									<mask id="svg-mask">
										<path
											fill="white"
											d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"
										/>
									</mask>
								</defs>
								<image
									href={homeData.image}
									width="100%"
									height="100%"
									mask="url(#svg-mask)"
									preserveAspectRatio="xMidYMid slice"
								/>
							</svg>
						</Box>
					</Box>
				</Box>
			</Grid>

			{/* Left Section: Text Content – appears second on mobile */}
			<Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: "700",
						mb: 2,
						color: "primary.main",
						fontSize: { xs: "2rem", md: "3rem" },
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
		</Grid>
	);
};

export default Home;
