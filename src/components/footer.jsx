import React, { useEffect, useState } from "react";

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
			<ul>
				{socialLinks.map((link, index) => (
					<li key={index}>
						<a href={link.url}>
							<img src={link.iconUrl} alt={link.name} />
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;
