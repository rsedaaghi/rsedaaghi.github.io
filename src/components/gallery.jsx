import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Card,
	CardMedia,
	CardActionArea,
	Modal,
	IconButton,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import CloseIcon from "@mui/icons-material/Close";

const GalleryTab = ({ onTabChange }) => {
	const [worksData, setWorksData] = useState([]);
	const [magnifyModalOpen, setMagnifyModalOpen] = useState(false);
	const [selectedWork, setSelectedWork] = useState(null);

	useEffect(() => {
		fetch("/assets/data/works.json") // Fetch instead of importing
			.then((response) => response.json())
			.then((data) => setWorksData(data))
			.catch((error) =>
				console.error("Error loading works data:", error)
			);
	}, []);

	// Filter for works that have at least one image.
	const worksWithImages = worksData.filter(
		(item) => item.images && item.images.length > 0
	);

	// Sort the filtered works by date (newest first).
	const sortedWorks = worksWithImages.sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	const handleCardClick = (item) => {
		setSelectedWork(item);
		setMagnifyModalOpen(true);
	};

	const handleCloseModal = () => {
		setMagnifyModalOpen(false);
		setSelectedWork(null);
	};

	return (
		<Box sx={{ width: "100%", px: 2, py: 4 }}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: "bold",
					textAlign: "center",
					mb: 4,
					color: "#1976d2",
				}}
			>
				Gallery
			</Typography>

			<Typography
				variant="subtitle1"
				sx={{
					mb: 3,
					textAlign: "center",
					color: "#757575",
				}}
			>
				This is a showcase of some of my works. By going to the Works
				tab, you can find more details about each project and see
				additional images.
			</Typography>

			<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
				{sortedWorks.map((item, index) => (
					<Card
						key={index}
						sx={{
							borderRadius: 2,
							boxShadow: 3,
							backgroundColor: "#fafafa",
						}}
					>
						<CardActionArea onClick={() => handleCardClick(item)}>
							<CardMedia
								component="img"
								image={item.images[0].src}
								alt={item.title}
								loading="lazy"
								sx={{
									borderRadius: 2,
									height: 200,
									objectFit: "cover",
								}}
							/>
							<Typography
								variant="caption"
								sx={{
									p: 1,
									display: "block",
									textAlign: "center",
									color: "#333",
								}}
							>
								{item.title}
							</Typography>
						</CardActionArea>
					</Card>
				))}
			</Masonry>
			{/* Magnified Image Modal */}
			<Modal open={magnifyModalOpen} onClose={handleCloseModal}>
				<Box
					sx={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						bgcolor: "rgba(0,0,0,0.7)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						p: 2,
					}}
				>
					<IconButton
						onClick={handleCloseModal}
						sx={{
							position: "absolute",
							top: 16,
							right: 16,
							color: "#fff",
						}}
					>
						<CloseIcon />
					</IconButton>
					{selectedWork && (
						<>
							<img
								src={selectedWork.images[0].src}
								alt={selectedWork.title}
								style={{
									maxWidth: "90vw",
									maxHeight: "80vh",
									objectFit: "contain",
									borderRadius: 8,
								}}
							/>
							<Typography
								variant="h6"
								sx={{
									mt: 2,
									color: "#fff",
									textAlign: "center",
								}}
							>
								{selectedWork.title}
							</Typography>
						</>
					)}
				</Box>
			</Modal>
		</Box>
	);
};

export default GalleryTab;
