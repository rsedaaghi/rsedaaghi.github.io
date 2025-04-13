import React, { useEffect, useState } from "react";
import PhotoAlbumModal from "./photoAlbumModal";
import { Button } from "@mui/material";

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
			<h2>{tab.label}</h2>
			{Array.isArray(content) ? (
				<ul>
					{content.map((item, index) => (
						<li key={index}>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
							{item.url && (
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									Visit Project
								</a>
							)}
							{item.images && (
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleOpenModal(item.images)}
									sx={{
										marginTop: "8px", // Adds spacing above the button
									}}
								>
									View Photo Album
								</Button>
							)}
						</li>
					))}
				</ul>
			) : (
				<p>{content.description}</p>
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
