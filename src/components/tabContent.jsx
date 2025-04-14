import React, { useEffect, useState } from "react";
import PhotoAlbumModal from "./photoAlbumModal";
import {
	Card,
	CardContent,
	Typography,
	Button,
	Grid,
	Box,
} from "@mui/material";

const TabContent = ({ tab }) => {
	const [content, setContent] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState([]);

	useEffect(() => {
		if (tab && tab.jsonFile) {
			fetch(`/assets/data/${tab.jsonFile}`)
				.then((response) => response.json())
				.then((data) => setContent(data))
				.catch((error) =>
					console.error(`Error loading ${tab.jsonFile}:`, error)
				);
		}
	}, [tab]);

	if (!tab) {
		return (
			<Typography variant="body1" color="textSecondary" align="center">
				No tab selected
			</Typography>
		);
	}

	const handleOpenModal = (images) => {
		setCurrentImages(images);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setCurrentImages([]);
	};

	return (
		<Box sx={{ p: 2 }}>
			<Typography
				variant="h4"
				gutterBottom
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					color: "#1976d2",
					mb: 3,
				}}
			>
				{tab.label}
			</Typography>
			{Array.isArray(content) ? (
				<Grid container spacing={3}>
					{content.map((item, index) => (
						<Grid item xs={12} md={6} key={index}>
							<Card
								sx={{
									boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
									borderRadius: 2,
								}}
							>
								<CardContent>
									<Typography
										variant="h6"
										sx={{
											fontWeight: "bold",
											color: "#455a64",
											mb: 1,
										}}
									>
										{item.title}
									</Typography>
									<Typography
										variant="body2"
										sx={{
											mb: 2,
											color: "#757575",
											lineHeight: 1.6,
										}}
									>
										{item.description}
									</Typography>
									<Box
										sx={{
											display: "flex",
											gap: 1,
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
													color: "#1976d2",
													borderColor: "#1976d2",
													"&:hover": {
														backgroundColor:
															"#e3f2fd",
													},
												}}
											>
												Visit Project
											</Button>
										)}
										{item.images && (
											<Button
												variant="contained"
												onClick={() =>
													handleOpenModal(item.images)
												}
												sx={{
													textTransform: "capitalize",
													borderRadius: 1,
													backgroundColor: "#1976d2",
													color: "#fff",
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
					sx={{
						textAlign: "center",
						color: "#455a64",
						mt: 2,
					}}
				>
					{content.description}
				</Typography>
			)}
			<PhotoAlbumModal
				open={modalOpen}
				onClose={handleCloseModal}
				images={currentImages}
			/>
		</Box>
	);
};

export default TabContent;
