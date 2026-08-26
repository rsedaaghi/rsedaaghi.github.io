import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { getDynamicIcon } from "../utils/helpers";
import useJsonData from "../utils/useJsonData";

const Footer = ({ lastUpdated }) => {
	const { data } = useJsonData("/assets/data/contact.json");

	const socialLinks = Array.isArray(data) ? data : [];

	return (
		<Box component="footer" sx={{ py: 2, textAlign: "center" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					mb: 1,
				}}
			>
				{socialLinks.map((link) => (
					<IconButton
						key={link.name}
						href={link.url || "#"}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.name || "Social link"}
						sx={{
							color: "primary.main",
							"&:hover": {
								color: "primary.dark",
								transform: "scale(1.2)",
							},
							transition: "0.3s",
						}}
					>
						{getDynamicIcon(link)}
					</IconButton>
				))}
			</Box>

			<Typography
				variant="body2"
				sx={{ fontStyle: "italic", color: "text.secondary" }}
			>
				Last Updated: {lastUpdated || "N/A"}
			</Typography>
		</Box>
	);
};

export default Footer;
