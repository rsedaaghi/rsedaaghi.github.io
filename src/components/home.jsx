import { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";

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
		<Grid container spacing={2} alignItems="center">
			<Grid item xs={12} md={6}>
				<Typography variant="body1">{homeData.description}</Typography>
				{homeData.contactButton?.isOn && (
					<Button
						variant="contained"
						href={homeData.contactButton.url}
					>
						Contact Me
					</Button>
				)}
			</Grid>
			<Grid item xs={12} md={6} container justifyContent="center">
				<img
					src={homeData.image}
					alt="Profile"
					style={{
						width: "85%",
						objectFit: "cover",
						borderRadius: "10px",
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default Home;
