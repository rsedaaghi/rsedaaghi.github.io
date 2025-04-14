import React, { useEffect, useState } from "react";
import PhotoAlbumModal from "./photoAlbumModal";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const TabContent = ({ tab }) => {
	const [content, setContent] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState([]);

	useEffect(() => {
		if (tab && tab.jsonFile) {
			// Prevent fetch if tab is undefined
			fetch(`/assets/data/${tab.jsonFile}`)
				.then((response) => response.json())
				.then((data) => setContent(data))
				.catch((error) =>
					console.error(`Error loading ${tab.jsonFile}:`, error)
				);
		}
	}, [tab]);

	if (!tab) {
		return <p>No tab selected</p>; // Fallback for undefined tab
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
		<div>
			<Typography variant="h4" gutterBottom>
				{tab.label}
			</Typography>
			{Array.isArray(content) ? (
				<Grid container spacing={2}>
					{content.map((item, index) => (
						<Grid item xs={12} md={6} key={index}>
							<Card>
								<CardContent>
									<Typography variant="h6">
										{item.title}
									</Typography>
									<Typography variant="body2">
										{item.description}
									</Typography>
									{item.url && (
										<Button
											href={item.url}
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
										>
											View Photo Album
										</Button>
									)}
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="body1">{content.description}</Typography>
			)}
			<PhotoAlbumModal
				open={modalOpen}
				onClose={handleCloseModal}
				images={currentImages}
			/>
		</div>
	);
};

export default TabContent;
