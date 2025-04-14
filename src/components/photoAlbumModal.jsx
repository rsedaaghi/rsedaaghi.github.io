import React from "react";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PhotoAlbumModal = ({ open, onClose, images }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="photo-album-modal"
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
				}}
			>
				{/* Modal Title with Close Icon */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
					}}
				>
					<Typography
						id="photo-album-modal"
						variant="h5"
						sx={{
							fontWeight: "bold",
							color: "#1976d2",
						}}
					>
						Photo Album
					</Typography>
					<IconButton onClick={onClose} sx={{ color: "#757575" }}>
						<CloseIcon />
					</IconButton>
				</Box>

				{/* Images */}
				{images.map((image, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							mb: 3,
						}}
					>
						<img
							src={image.src}
							alt={image.caption}
							style={{
								width: "100%",
								maxWidth: "600px",
								borderRadius: "12px",
								boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
							}}
						/>
						<Typography
							variant="body1"
							sx={{
								mt: 2,
								color: "#455a64",
								fontStyle: "italic",
							}}
						>
							{image.caption}
						</Typography>
					</Box>
				))}
			</Box>
		</Modal>
	);
};

export default PhotoAlbumModal;
