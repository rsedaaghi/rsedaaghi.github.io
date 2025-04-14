import React, { useEffect, useState } from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemButton,
} from "@mui/material";

const Footer = () => {
	const [socialLinks, setSocialLinks] = useState([]);

	useEffect(() => {
		fetch("assets/data/contact.json")
			.then((response) => response.json())
			.then((data) => setSocialLinks(data))
			.catch((error) =>
				console.error("Error loading social links:", error)
			);
	}, []);

	return (
		<footer>
			<List>
				{socialLinks.map((link, index) => (
					<ListItem key={index} component="div">
						<ListItemButton component="a" href={link.url}>
							<ListItemAvatar>
								<Avatar src={link.iconUrl} alt={link.name} />
							</ListItemAvatar>
							<ListItemText primary={link.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</footer>
	);
};

export default Footer;
