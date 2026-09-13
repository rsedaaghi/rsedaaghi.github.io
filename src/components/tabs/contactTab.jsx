import React from "react";
import { Box, Typography } from "@mui/material";
import { getDynamicIcon } from "../../utils/helpers";
import DataState from "../dataState";
import useJsonData from "../../utils/useJsonData";

const isExternal = (url = "") => url.startsWith("http://") || url.startsWith("https://");

const ContactTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/contact.json");
	const contacts = Array.isArray(data) ? data : [];
	const addressItem = contacts.find((item) => item.name === "Address");
	// Left column order is explicit: Email → Phone → GitHub → LinkedIn.
	const leftItems = ["Email", "Phone", "GitHub", "LinkedIn"]
		.map((name) => contacts.find((item) => item.name === name))
		.filter(Boolean);

	return (
		<Box>
			<Typography
				variant="body2"
				color="textSecondary"
				sx={{ mb: 3, textAlign: "center" }}
			>
				Have a project in mind or want to collaborate? I'd love to hear
				from you — pick the channel that suits you best.
			</Typography>
			<DataState loading={loading} error={error}>
				{contacts.length > 0 ? (
					<>
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", sm: "row" },
								gap: { xs: 1, sm: 5 },
								alignItems: "stretch",
								maxWidth: 700,
								mx: "auto",
								width: "100%",
							}}
						>
							<Box
								sx={{
									flex: "1 1 0%",
									minWidth: 0,
									display: "flex",
									flexDirection: "column",
									rowGap: 1,
								}}
							>
								{leftItems.map((item) => (
									<Box
										key={item.name}
										component="a"
										href={item.url || "#"}
										target={isExternal(item.url) ? "_blank" : undefined}
										rel={isExternal(item.url) ? "noopener noreferrer" : undefined}
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 2,
											py: 1.5,
											color: "text.primary",
											textDecoration: "none",
											transition: "color 0.2s",
											"&:hover": { color: "primary.main" },
										}}
									>
										<Box sx={{ color: "primary.main", display: "flex", flexShrink: 0 }}>
											{getDynamicIcon(item)}
										</Box>
										<Box sx={{ minWidth: 0 }}>
											<Typography
												variant="caption"
												sx={{
													display: "block",
													color: "text.secondary",
													textTransform: "uppercase",
													letterSpacing: "0.07em",
													fontWeight: 800,
												}}
											>
												{item.name}
											</Typography>
											<Typography
												variant="body1"
												sx={{ fontWeight: 700, wordBreak: "break-word" }}
											>
												{item.label || item.name}
											</Typography>
										</Box>
									</Box>
								))}
							</Box>
							<Box
								sx={{
									flex: "1 1 0%",
									minWidth: 0,
									display: "flex",
									flexDirection: "column",
									rowGap: 1,
								}}
							>
								{addressItem && (
									<Box
										component="a"
										href={addressItem.url || "#"}
										target={isExternal(addressItem.url) ? "_blank" : undefined}
										rel={isExternal(addressItem.url) ? "noopener noreferrer" : undefined}
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 2,
											py: 1.5,
											color: "text.primary",
											textDecoration: "none",
											transition: "color 0.2s",
											"&:hover": { color: "primary.main" },
										}}
									>
										<Box sx={{ color: "primary.main", display: "flex", flexShrink: 0 }}>
											{getDynamicIcon(addressItem)}
										</Box>
										<Box sx={{ minWidth: 0 }}>
											<Typography
												variant="caption"
												sx={{
													display: "block",
													color: "text.secondary",
													textTransform: "uppercase",
													letterSpacing: "0.07em",
													fontWeight: 800,
												}}
											>
												{addressItem.name}
											</Typography>
											<Typography
												variant="body1"
												sx={{ fontWeight: 700, wordBreak: "break-word" }}
											>
												{addressItem.label || addressItem.name}
											</Typography>
										</Box>
									</Box>
								)}
								{addressItem?.label && (
									<Box
										sx={{
											height: "100%",
											minHeight: 220,
											overflow: "hidden",
											borderRadius: 2,
											border: "1px solid",
											borderColor: "divider",
										}}
									>
										<iframe
											title="Location — Sharif University of Technology Service Complex"
											src={`https://maps.google.com/maps?q=${encodeURIComponent(addressItem.label)}&z=14&ie=UTF8&output=embed`}
											width="100%"
											height="100%"
											style={{ border: 0, display: "block" }}
											loading="lazy"
											allowFullScreen
											referrerPolicy="no-referrer-when-downgrade"
										/>
									</Box>
								)}
							</Box>
						</Box>
					</>
				) : (
					<Typography
						variant="body1"
						sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
					>
						No contact information available.
					</Typography>
				)}
			</DataState>
		</Box>
	);
};

export default ContactTab;