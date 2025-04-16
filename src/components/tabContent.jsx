import React, { useEffect, useState } from "react";
import PhotoAlbumModal from "./photoAlbumModal";
import {
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
} from "@mui/material";

const TabContent = ({ tab }) => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState([]);
	const [modalTitle, setModalTitle] = useState("Photo Album");

	// Normalize raw JSON data for each tab into a common shape
	const normalizeData = (tabName, data) => {
		if (!data) return [];
		if (tabName === "about") {
			return Array.isArray(data) ? data : [];
		}
		if (tabName === "contact") {
			return Array.isArray(data)
				? data.map((item) => ({
						title: item.title || item.name || "",
						label: item.label || "",
						url: item.url || "",
						iconUrl: item.iconUrl || "",
				  }))
				: [];
		}
		if (tabName === "skills") {
			return Array.isArray(data)
				? data.map((skill) =>
						typeof skill === "string" ? { title: skill } : skill
				  )
				: [];
		}
		if (tabName === "works") {
			return Array.isArray(data) ? data : [];
		}
		if (Array.isArray(data)) return data;
		if (data && typeof data === "object") return [data];
		return [];
	};

	// Fetch the JSON file when the tab changes.
	useEffect(() => {
		if (tab && tab.jsonFile) {
			setLoading(true);
			fetch(`/assets/data/${tab.jsonFile}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok.");
					}
					return response.json();
				})
				.then((rawData) => {
					const normalized = normalizeData(tab.name, rawData);
					setContent(normalized);
					setError(null);
				})
				.catch((error) => {
					console.error(`Error loading ${tab.jsonFile}:`, error);
					setError(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [tab]);

	// Handler to open modal and pass along images and the work title.
	const handleOpenModal = (images, title) => {
		setModalTitle(title || "Photo Album");
		setCurrentImages(images);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setCurrentImages([]);
	};

	if (loading) {
		return <Typography align="center">Loading...</Typography>;
	}
	if (error) {
		return (
			<Typography align="center" color="error">
				Failed to load content.
			</Typography>
		);
	}
	if (!tab) {
		return (
			<Typography variant="body1" color="textSecondary" align="center">
				No tab selected
			</Typography>
		);
	}

	// For About and Works, each card should cover a full row.
	const isFullRowTab = tab.name === "about" || tab.name === "works";
	// For full-row tabs, make the grid item occupy the full width.
	// For other tabs, use a multi-column layout by specifying multiple breakpoints.
	const gridItemProps = isFullRowTab
		? { size: 12 }
		: { size: { xs: 12, sm: 6, md: 4 } };

	// Set a modest fixed height for multi-column (skills & contact)
	const cardMinHeight = isFullRowTab ? "auto" : 150;

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{
					fontWeight: "bold",
					textAlign: "center",
					mb: 4,
					color: "#1976d2",
				}}
			>
				{tab.label}
			</Typography>
			{content && content.length > 0 ? (
				<Grid
					container
					spacing={4}
					justifyContent="center"
					alignItems="stretch"
					sx={{ width: "100%" }}
				>
					{content.map((item, index) => (
						<Grid
							key={index}
							{...gridItemProps}
							sx={{ display: "flex" }}
						>
							<Card
								sx={{
									width: "100%",
									minHeight: cardMinHeight,
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<CardContent
									sx={{ width: "100%", textAlign: "center" }}
								>
									<Typography
										variant="h6"
										sx={{ fontWeight: "bold", mb: 2 }}
									>
										{item.title}
									</Typography>
									{item.description && (
										<Typography
											variant="body2"
											sx={{ mb: 3, color: "#757575" }}
										>
											{item.description}
										</Typography>
									)}
									{item.label && !item.description && (
										<Typography
											variant="body2"
											sx={{ mb: 3, color: "#757575" }}
										>
											{item.label}
										</Typography>
									)}
									{/* Grouping buttons in a horizontal container */}
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											gap: 2,
											mt: 2,
											flexWrap: "wrap",
										}}
									>
										{item.url && (
											<Button
												variant="outlined"
												href={item.url}
												target="_blank"
												rel="noopener noreferrer"
												sx={{
													textTransform: "capitalize",
													borderRadius: 1,
													borderColor: "#1976d2",
													color: "#1976d2",
													"&:hover": {
														backgroundColor:
															"#e3f2fd",
													},
												}}
											>
												{tab.name === "contact"
													? "Visit Link"
													: "Visit Project"}
											</Button>
										)}
										{item.images &&
											Array.isArray(item.images) &&
											item.images.length > 0 && (
												<Button
													variant="contained"
													onClick={() =>
														handleOpenModal(
															item.images,
															item.title
														)
													}
													sx={{
														textTransform:
															"capitalize",
														backgroundColor:
															"#1976d2",
														color: "#fff",
														borderRadius: 1,
														"&:hover": {
															backgroundColor:
																"#1565c0",
														},
													}}
												>
													View Photo Album
												</Button>
											)}
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography
					variant="body1"
					sx={{ textAlign: "center", color: "#455a64", mt: 2 }}
				>
					No content available.
				</Typography>
			)}
			<PhotoAlbumModal
				open={modalOpen}
				onClose={handleCloseModal}
				images={currentImages}
				modalTitle={modalTitle}
			/>
		</Box>
	);
};

export default TabContent;
