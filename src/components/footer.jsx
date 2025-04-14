import React, { useEffect, useState } from "react";
import { Box, IconButton, Avatar, Typography } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Email } from "@mui/icons-material";

const Footer = ({ lastUpdated, darkMode }) => {
	const [socialLinks, setSocialLinks] = useState([]);

	useEffect(() => {
		fetch("assets/data/contact.json")
			.then((response) => response.json())
			.then((data) => setSocialLinks(data))
			.catch((error) =>
				console.error("Error loading social links:", error)
			);
	}, []);

	// Get the corresponding icon based on `name` property
	const getIcon = (name) => {
		if (!name) return null;
		switch (name.toLowerCase()) {
			case "email":
				return <Email />;
			case "linkedin":
				return <LinkedIn />;
			case "x (twitter)":
				return <Twitter />;
			case "newmedia":
				return <GitHub />;
			default:
				return null;
		}
	};

	return (
		<Box
			component="footer"
			sx={{
				mt: 4,
				py: 2,
				backgroundColor: darkMode ? "#212121" : "#f9f9f9",
				color: darkMode ? "#ffffff" : "#000000",
				boxShadow: "0px -2px 6px rgba(0,0,0,0.1)",
				textAlign: "center",
			}}
		>
			{/* Social Links */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					mb: 1,
				}}
			>
				{socialLinks.map((link, index) => (
					<IconButton
						key={index}
						href={link.url || "#"}
						target={link.url ? "_blank" : "_self"}
						sx={{
							color: link.url ? "#1976d2" : "#bdbdbd",
							"&:hover": {
								color: link.url ? "#1565c0" : "#9e9e9e",
								transform: link.url ? "scale(1.2)" : "none",
							},
							transition: "0.3s",
						}}
					>
						{link.iconUrl ? (
							<Avatar
								src={link.iconUrl}
								alt={link.name}
								sx={{
									width: 32,
									height: 32,
								}}
							/>
						) : (
							getIcon(link.name) || (
								<Avatar
									sx={{
										width: 32,
										height: 32,
										backgroundColor: "#e0e0e0",
									}}
								>
									{link.name[0].toUpperCase()}
								</Avatar>
							)
						)}
					</IconButton>
				))}
			</Box>
			{/* Last Updated Text */}
			<Typography
				variant="body2"
				sx={{
					fontStyle: "italic",
					color: darkMode ? "#b0bec5" : "#455a64",
				}}
			>
				Last Updated: {lastUpdated || "N/A"}
			</Typography>
		</Box>
	);
};

export default Footer;
