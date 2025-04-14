import React, { useEffect, useState } from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from "@mui/material";

const Footer = () => {
	const [socialLinks, setSocialLinks] = useState([]);

	useEffect(() => {
		fetch("/assets/contact.json")
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
					<ListItem button component="a" href={link.url} key={index}>
						<ListItemAvatar>
							<Avatar src={link.iconUrl} alt={link.name} />
						</ListItemAvatar>
						<ListItemText primary={link.label} />
					</ListItem>
				))}
			</List>
		</footer>
	);
};

export default Footer;
