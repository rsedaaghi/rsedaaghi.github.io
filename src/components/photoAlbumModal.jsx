import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const PhotoAlbumModal = ({ open, onClose, images }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="photo-album-modal"
		>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "80%",
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
					borderRadius: 4,
				}}
			>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Photo Album
				</Typography>
				{images.map((image, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							mb: 2,
						}}
					>
						<img
							src={image.src}
							alt={image.caption}
							style={{
								width: "100%",
								maxWidth: "500px",
								borderRadius: "8px",
							}}
						/>
						<Typography variant="body2" sx={{ mt: 1 }}>
							{image.caption}
						</Typography>
					</Box>
				))}
			</Box>
		</Modal>
	);
};

export default PhotoAlbumModal;
