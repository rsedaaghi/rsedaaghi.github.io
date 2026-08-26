import React, { useMemo, useState } from "react";
import {
	Box,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkCard from "../cards/workCard";
import PhotoAlbumModal from "../photoAlbumModal";
import useJsonData from "../../utils/useJsonData";

const WorksTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/works.json");
	const [selectedTechnology, setSelectedTechnology] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState([]);
	const [modalTitle, setModalTitle] = useState("");

	const works = useMemo(() => (Array.isArray(data) ? data : []), [data]);

	const availableTechnologies = useMemo(
		() =>
			Array.from(
				new Set(works.flatMap((item) => item.technologies ?? []))
			).sort(),
		[works]
	);

	const filteredWorks = useMemo(() => {
		const searchLower = searchQuery.toLowerCase();
		return works.filter((item) => {
			const matchesTechnology =
				selectedTechnology === "All" ||
				item.technologies?.some(
					(tech) =>
						tech.toLowerCase() === selectedTechnology.toLowerCase()
				);
			const matchesSearch =
				!searchQuery ||
				item.title?.toLowerCase().includes(searchLower) ||
				item.description?.toLowerCase().includes(searchLower);
			return matchesTechnology && matchesSearch;
		});
	}, [works, selectedTechnology, searchQuery]);

	const handleOpenAlbum = (images, title) => {
		setModalTitle(title || "");
		setCurrentImages(images);
		setModalOpen(true);
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
		<Box>
			<Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
				<strong>Filter</strong> the projects by selecting a technology
				below, or employ the <strong>search box</strong> to locate
				projects containing a specific keyword or phrase.
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: 2,
					mb: 3,
					p: 2,
					borderRadius: 2,
					bgcolor: (theme) =>
						theme.palette.mode === "dark" ? "grey.800" : "grey.100",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<FormControl variant="outlined" size="small" fullWidth>
					<InputLabel id="tech-filter-label" shrink>
						Technology
					</InputLabel>
					<Select
						labelId="tech-filter-label"
						value={selectedTechnology}
						onChange={(e) => setSelectedTechnology(e.target.value)}
						label="Technology"
					>
						<MenuItem value="All">
							<em>All</em>
						</MenuItem>
						{availableTechnologies.map((tech) => (
							<MenuItem key={tech} value={tech}>
								{tech}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					fullWidth
					variant="outlined"
					size="small"
					label="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Box>

			{filteredWorks.length > 0 ? (
				<Grid
					container
					spacing={4}
					justifyContent="center"
					alignItems="stretch"
					sx={{ width: "100%" }}
				>
					{filteredWorks.map((item) => (
						<Grid
							key={item.title}
							size={{ xs: 12 }}
							sx={{ display: "flex" }}
						>
							<WorkCard item={item} onOpenAlbum={handleOpenAlbum} />
						</Grid>
					))}
				</Grid>
			) : (
				<Typography
					variant="body1"
					sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
				>
					No projects match your filters.
				</Typography>
			)}

			<PhotoAlbumModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				images={currentImages}
				modalTitle={modalTitle}
			/>
		</Box>
	);
};

export default WorksTab;
