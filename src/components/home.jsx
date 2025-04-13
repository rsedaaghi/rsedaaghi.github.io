import React, { useEffect, useState } from "react";

const Home = () => {
	const [homeData, setHomeData] = useState({});

	useEffect(() => {
		fetch("/assets/data/home.json")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setHomeData(data))
			.catch((error) => console.error("Error loading home data:", error));
	}, []);

	return (
		<div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
			<div style={{ flex: 1 }}>
				<p>{homeData.description}</p>
				{homeData.contactButton?.isOn && (
					<a href={homeData.contactButton.url}>Contact Me</a>
				)}
			</div>
			<div
				style={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src={homeData.image}
					alt="Profile"
					style={{
						width: "85%", // Makes image responsive
						objectFit: "cover", // Ensures aspect ratio is preserved
						borderRadius: "10px", // Optional: Adds rounded corners for styling
					}}
				/>
			</div>
		</div>
	);
};

export default Home;
