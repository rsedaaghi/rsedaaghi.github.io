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
			{Array.isArray(content) ? (
				<Grid container spacing={4}>
					{content.map((item, index) => (
						<Grid item xs={12} md={6} key={index}>
							<Card
								sx={{
									boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
									transition: "transform 0.3s",
									borderRadius: 4,
									"&:hover": {
										transform: "scale(1.05)",
										boxShadow:
											"0px 6px 16px rgba(0,0,0,0.15)",
									},
								}}
							>
								<CardContent>
									<Typography
										variant="h6"
										sx={{ fontWeight: "bold", mb: 2 }}
									>
										{item.title}
									</Typography>
									<Typography
										variant="body2"
										sx={{ mb: 3, color: "#757575" }}
									>
										{item.description}
									</Typography>
									<Box sx={{ display: "flex", gap: 2 }}>
										{item.url && (
											<Button
												variant="outlined"
												href={item.url}
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
												target="_blank"
												rel="noopener noreferrer"
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
													backgroundColor: "#1976d2",
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
