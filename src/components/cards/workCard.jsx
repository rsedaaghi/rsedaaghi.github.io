import React, { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import { formatDateRange } from "../../utils/helpers";

const MAX_VISIBLE_CHIPS = 3;
const MAX_COLLAPSED_SENTENCES = 4;
const MAX_VISIBLE_LINES = 4;

const splitSentences = (text) => text.match(/[^.!?]+[.!?]*(?:\s+|$)/g) ?? [text];

const WorkCover = ({ item, onOpenAlbum }) => {
	const cover = item.images?.[0];
	const hasImages = Boolean(cover);

	if (hasImages) {
		return (
			<Box
				sx={{
					width: "100%",
					height: 150,
					overflow: "hidden",
					borderRadius: "10px 10px 0 0",
					cursor: "pointer",
					"& img": {
						width: "100%",
						height: "100%",
						objectFit: "cover",
						transition: "transform 0.35s ease-in-out",
					},
					"&:hover img": { transform: "scale(1.05)" },
				}}
				onClick={() => onOpenAlbum?.(item.images, item.title)}
				role="button"
				tabIndex={0}
				aria-label={`Open album for ${item.title}`}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onOpenAlbum?.(item.images, item.title);
					}
				}}
			>
				<img src={cover.src} alt={cover.caption || item.title} loading="lazy" />
			</Box>
		);
	}

	return null;
};

const Description = ({ text }) => {
	const [expanded, setExpanded] = useState(false);
	if (!text) return null;

	const sentences = splitSentences(text);
	const hasMore = sentences.length > MAX_COLLAPSED_SENTENCES || text.length > 240;
	const collapsedText = sentences.slice(0, MAX_COLLAPSED_SENTENCES).join(" ");

	return (
		<Box>
			<Typography
				variant="body2"
				sx={{
					color: "text.primary",
					textAlign: "justify",
					...(expanded
						? {
							maxHeight: 180,
							overflowY: "auto",
							pr: 0.75,
							"&::-webkit-scrollbar": { width: 6 },
							"&::-webkit-scrollbar-thumb": {
								bgcolor: "divider",
								borderRadius: 3,
							},
						}
						: {
							display: "-webkit-box",
							WebkitLineClamp: MAX_VISIBLE_LINES,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}),
				}}
			>
				{expanded ? text : collapsedText}
			</Typography>
			{hasMore && (
				<Button
					size="small"
					onClick={() => setExpanded((prev) => !prev)}
					sx={{ p: 0, mt: 0.5, minWidth: 0 }}
				>
					{expanded ? "Show less" : "Show more"}
				</Button>
			)}
		</Box>
	);
};

const WorkCard = ({ item, onOpenAlbum }) => {
	const hasAlbum = item.images?.length > 0;
	const [showAllTech, setShowAllTech] = useState(false);
	const technologies = item.technologies ?? [];
	const shownChips = technologies.slice(0, MAX_VISIBLE_CHIPS);
	const hiddenChips = technologies.length - shownChips.length;
	const visibleChips = showAllTech ? technologies : shownChips;

	return (
		<Card
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				bgcolor: (theme) =>
					theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: 8,
				},
			}}
		>
			<WorkCover item={item} onOpenAlbum={onOpenAlbum} />

			<CardContent
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					flex: 1,
					p: 2.5,
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "bold",
						mb: 0.5,
						lineHeight: 1.25,
						fontSize: "1.05rem",
					}}
				>
					{item.title}
				</Typography>

				{(item.startDate || item.date) && (
					<Typography variant="caption" sx={{ mb: 1, color: "text.secondary" }}>
						📅 {formatDateRange(item)}
					</Typography>
				)}

				{item.company && (
					<Typography
						variant="caption"
						sx={{ mb: 1, color: "primary.main", fontStyle: "italic" }}
					>
						{item.companyUrl ? (
							<a
								href={item.companyUrl}
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "inherit", textDecoration: "none" }}
							>
								{item.company}
							</a>
						) : (
							item.company
						)}
					</Typography>
				)}

				<Box sx={{ flex: 1 }}>
					<Description text={item.description} />
				</Box>

				<Box sx={{ mt: 1.5 }}>
					{(hasAlbum || item.url) && (
						<Box sx={{ mb: 1.5, display: "flex", gap: 1 }}>
							{hasAlbum && (
								<Button
									variant="contained"
									onClick={() => onOpenAlbum(item.images, item.title)}
									startIcon={<PhotoAlbumIcon />}
									size="small"
									sx={{
										backgroundColor: "warning.main",
										color: "#fff",
										textTransform: "none",
										"&:hover": { backgroundColor: "warning.dark" },
									}}
								>
									Album
								</Button>
							)}
							{item.url && (
								<Button
									variant="contained"
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									startIcon={<LaunchIcon />}
									size="small"
								>
									Visit
								</Button>
							)}
						</Box>
					)}

					{visibleChips.length > 0 && (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
							{visibleChips.map((tech) => (
								<Chip
									key={tech}
									label={tech}
									color="primary"
									variant="outlined"
									size="small"
								/>
							))}
							{hiddenChips > 0 && (
								<Chip
									label={showAllTech ? "Show fewer" : `+${hiddenChips}`}
									size="small"
									color="primary"
									onClick={() => setShowAllTech((prev) => !prev)}
									sx={{ cursor: "pointer" }}
								/>
							)}
						</Box>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default WorkCard;