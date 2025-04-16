import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PhotoAlbumModal = ({ open, onClose, images, modalTitle }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// When the modal opens, reset the current index.
	useEffect(() => {
		if (open) {
			setCurrentIndex(0);
		}
	}, [open]);

	// If there are no images, display nothing.
	if (!images || images.length === 0) {
		return null;
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="photo-album-modal-title"
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					position: "relative",
					width: "80%",
					maxWidth: "800px",
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
					borderRadius: 4,
					textAlign: "center",
				}}
			>
				{/* Modal Header */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 2,
					}}
				>
					<Typography
						id="photo-album-modal-title"
						variant="h5"
						sx={{ fontWeight: "bold", color: "#1976d2" }}
					>
						{modalTitle}
					</Typography>
					<IconButton
						onClick={onClose}
						aria-label="Close Photo Album"
						sx={{ "&:focus": { outline: "2px solid #1976d2" } }}
					>
						<CloseIcon />
					</IconButton>
				</Box>

				{/* Image Display */}
				<Box
					sx={{
						width: "100%",
						maxWidth: "600px",
						margin: "0 auto",
					}}
				>
					<img
						src={images[currentIndex].src}
						alt={
							images[currentIndex].caption ||
							`Image ${currentIndex + 1}`
						}
						loading="lazy"
						style={{
							width: "100%",
							maxWidth: "600px",
							borderRadius: 12,
							boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
						}}
					/>
				</Box>

				<Typography
					variant="body2"
					sx={{ fontStyle: "italic", color: "#455a64", mt: 2 }}
				>
					{images[currentIndex].caption}
				</Typography>

				{/* Navigation Buttons */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mt: 2,
					}}
				>
					<IconButton
						onClick={handlePrevious}
						aria-label="Previous Image"
					>
						<NavigateBeforeIcon />
					</IconButton>
					<IconButton onClick={handleNext} aria-label="Next Image">
						<NavigateNextIcon />
					</IconButton>
				</Box>
			</Box>
		</Modal>
	);
};

export default PhotoAlbumModal;
