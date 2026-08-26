import React, { useState } from "react";
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
import useJsonData from "../utils/useJsonData";

const GalleryTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/works.json");
	const [magnifyModalOpen, setMagnifyModalOpen] = useState(false);
	const [selectedWork, setSelectedWork] = useState(null);

	const works = Array.isArray(data) ? data : [];
	const worksWithImages = works.filter(
		(item) => item.images && item.images.length > 0
	);
	const sortedWorks = [...worksWithImages].sort(
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

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error) {
		return (
			<Typography align="center" color="error">
				Failed to load content.
			</Typography>
		);
	}

	return (
		<Box sx={{ width: "100%", py: 2 }}>
			<Typography
				variant="subtitle1"
				sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
			>
				This is a showcase of some of my works. By going to the Works
				tab, you can find more details about each project and see
				additional images.
			</Typography>

			<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
				{sortedWorks.map((item) => (
					<Card
						key={item.title}
						sx={{
							borderRadius: 2,
							boxShadow: 3,
							bgcolor: (theme) =>
								theme.palette.mode === "dark" ? "grey.900" : "grey.50",
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
									color: "text.primary",
								}}
							>
								{item.title}
							</Typography>
						</CardActionArea>
					</Card>
				))}
			</Masonry>

			<Modal
				open={magnifyModalOpen}
				onClose={handleCloseModal}
				aria-labelledby="gallery-modal-title"
			>
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
						aria-label="Close gallery"
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
								id="gallery-modal-title"
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
