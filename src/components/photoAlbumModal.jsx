import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const PhotoAlbumModal = ({ open, onClose, images, modalTitle }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);

	// Reset index and full screen state when modal opens.
	useEffect(() => {
		if (open) {
			setCurrentIndex(0);
			setIsFullScreen(false);
		}
	}, [open]);

	// Return nothing if there are no images.
	if (!images || images.length === 0) return null;

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	// Toggle full screen mode.
	const toggleFullScreen = () => {
		setIsFullScreen((prev) => !prev);
	};

	// Container styles updated: when not in full screen, the modal is bigger.
	const containerStyles = isFullScreen
		? {
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				bgcolor: "black",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				p: 0,
		  }
		: {
				position: "relative",
				width: "80%",
				maxWidth: "1000px", // Increased max-width for a larger modal
				bgcolor: "background.paper",
				boxShadow: 24,
				p: 4,
				borderRadius: 4,
				textAlign: "left", // Ensure title is left-aligned
		  };

	// Image styles updated for non-full-screen: image appears larger.
	const imageStyles = isFullScreen
		? {
				width: "100%",
				height: "auto",
				maxHeight: "100vh",
				objectFit: "contain",
		  }
		: {
				width: "100%",
				maxWidth: "800px", // Increased maxWidth for bigger image
				borderRadius: 12,
				boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
		  };

	return (
		<Modal
			open={open}
			onClose={() => {
				setIsFullScreen(false);
				onClose();
			}}
			aria-labelledby="photo-album-modal-title"
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box sx={containerStyles}>
				{/* Header Area */}
				<Box
					sx={{
						position: isFullScreen ? "absolute" : "relative",
						top: isFullScreen ? 8 : "unset",
						left: isFullScreen ? 8 : "unset",
						right: isFullScreen ? 8 : "unset",
						display: "flex",
						flexDirection: "column",
						gap: 1,
						mb: isFullScreen ? 0 : 2,
						px: isFullScreen ? 2 : 0,
						color: isFullScreen ? "#fff" : "#1976d2",
						zIndex: 1,
					}}
				>
					{/* Modal Title (image title) with left alignment and extra bottom margin */}
					{!isFullScreen && (
						<Typography
							id="photo-album-modal-title"
							variant="h5"
							sx={{
								fontWeight: "bold",
								color: "#1976d2",
								textAlign: "left",
								width: "100%",
								maxWidth: "800px",
								margin: "0 auto",
								mb: 2,
							}}
						>
							{modalTitle}
						</Typography>
					)}
					<Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
						<IconButton
							onClick={toggleFullScreen}
							aria-label="Toggle Full Screen"
							sx={{ color: isFullScreen ? "#fff" : "#1976d2" }}
						>
							{isFullScreen ? (
								<FullscreenExitIcon />
							) : (
								<FullscreenIcon />
							)}
						</IconButton>
						<IconButton
							onClick={() => {
								setIsFullScreen(false);
								onClose();
							}}
							aria-label="Close Photo Album"
							sx={{
								color: isFullScreen ? "#fff" : "#1976d2",
								"&:focus": { outline: "2px solid #1976d2" },
							}}
						>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>

				{/* Image Display Area */}
				<Box
					sx={{
						width: "100%",
						maxWidth: isFullScreen ? "100vw" : "800px",
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
						onClick={toggleFullScreen}
						style={{
							...imageStyles,
							cursor: isFullScreen ? "zoom-out" : "zoom-in",
						}}
					/>
				</Box>

				{/* Caption Area (Left-Aligned) */}
				{!isFullScreen && (
					<Typography
						variant="body2"
						sx={{
							fontStyle: "italic",
							color: "#455a64",
							mt: 2,
							textAlign: "left",
							width: "100%",
							maxWidth: "800px",
							margin: "0 auto",
						}}
					>
						{images[currentIndex].caption}
					</Typography>
				)}

				{/* Navigation Buttons (Only shown if more than one image) */}
				{images.length > 1 && (
					<Box
						sx={{
							position: isFullScreen ? "absolute" : "relative",
							bottom: isFullScreen ? 16 : "unset",
							left: isFullScreen ? 0 : "unset",
							right: isFullScreen ? 0 : "unset",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: 2,
							mt: isFullScreen ? 0 : 2,
						}}
					>
						<IconButton
							onClick={handlePrevious}
							aria-label="Previous Image"
							sx={{ color: isFullScreen ? "#fff" : "inherit" }}
						>
							<NavigateBeforeIcon fontSize="large" />
						</IconButton>
						<IconButton
							onClick={handleNext}
							aria-label="Next Image"
							sx={{ color: isFullScreen ? "#fff" : "inherit" }}
						>
							<NavigateNextIcon fontSize="large" />
						</IconButton>
					</Box>
				)}
			</Box>
		</Modal>
	);
};

export default PhotoAlbumModal;
