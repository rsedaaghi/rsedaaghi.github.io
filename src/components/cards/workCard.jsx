import React from "react";
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

const WorkCard = ({ item, onOpenAlbum }) => (
	<Card
		sx={{
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "flex-start",
			p: 3,
			boxShadow: 3,
			borderRadius: 2,
			bgcolor: (theme) =>
				theme.palette.mode === "dark" ? "grey.900" : "grey.50",
		}}
	>
		<CardContent sx={{ width: "100%", p: 0, "&:last-child": { pb: 0 } }}>
			<Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
				{item.title}
			</Typography>

			{(item.startDate || item.date) && (
				<Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
					📅 {formatDateRange(item)}
				</Typography>
			)}

			{item.description && (
				<Typography
					variant="body2"
					sx={{ mb: 2, color: "text.primary", textAlign: "justify" }}
				>
					{item.description}
				</Typography>
			)}

			{item.company && (
				<Typography
					variant="body2"
					sx={{ mb: 2, color: "primary.main", fontStyle: "italic" }}
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

			{(item.images?.length > 0 || item.url) && (
				<Box sx={{ mt: 2, display: "flex", gap: 1 }}>
					{item.images?.length > 0 && (
						<Button
							variant="contained"
							onClick={() => onOpenAlbum(item.images, item.title)}
							startIcon={<PhotoAlbumIcon />}
							size="small"
							sx={{
								backgroundColor: "#ff9800",
								color: "#fff",
								textTransform: "none",
								"&:hover": { backgroundColor: "#fb8c00" },
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

			{item.technologies?.length > 0 && (
				<Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
					{item.technologies.map((tech) => (
						<Chip
							key={tech}
							label={tech}
							color="primary"
							variant="outlined"
							sx={{ fontSize: "0.9rem", padding: "0.3rem" }}
						/>
					))}
				</Box>
			)}
		</CardContent>
	</Card>
);

export default WorkCard;
