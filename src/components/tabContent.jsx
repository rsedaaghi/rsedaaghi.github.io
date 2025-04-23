import React, { useEffect, useState } from "react";
import PhotoAlbumModal from "./photoAlbumModal";
import {
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
	Chip,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	InputAdornment,
} from "@mui/material";
import { getDynamicIcon } from "../utils/helpers";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchIcon from "@mui/icons-material/Search";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";

const TabContent = ({ tab }) => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState([]);
	const [modalTitle, setModalTitle] = useState("Photo Album");
	// Cache for storing fetched JSON data
	const [cache, setCache] = useState({});

	// New filter states for the "works" tab
	const [selectedTechnology, setSelectedTechnology] = useState("All"); // default is "All"
	const [searchQuery, setSearchQuery] = useState("");

	// Normalize raw JSON data for each tab into a common shape
	const normalizeData = (tabName, data) => {
		if (!data) return [];
		if (tabName === "about") return Array.isArray(data) ? data : [];
		if (tabName === "contact")
			return Array.isArray(data)
				? data.map((item) => ({
						title: item.title || item.name || "",
						label: item.label || "",
						url: item.url || "",
						iconUrl: item.iconUrl || "",
						muiIcon: item.muiIcon || "",
				  }))
				: [];
		if (tabName === "skills")
			return Array.isArray(data)
				? data.map((skill) =>
						typeof skill === "string" ? { title: skill } : skill
				  )
				: [];
		if (tabName === "works") return Array.isArray(data) ? data : [];
		return Array.isArray(data)
			? data
			: data && typeof data === "object"
			? [data]
			: [];
	};

	// Fetch or retrieve from cache the JSON file when the tab changes.
	useEffect(() => {
		if (tab && tab.jsonFile) {
			if (cache[tab.name]) {
				setContent(cache[tab.name]);
				setError(null);
				return;
			}
			setLoading(true);
			fetch(`/assets/data/${tab.jsonFile}`)
				.then((response) => {
					if (!response.ok)
						throw new Error("Network response was not ok.");
					return response.json();
				})
				.then((rawData) => {
					const normalized = normalizeData(tab.name, rawData);
					setCache((prev) => ({ ...prev, [tab.name]: normalized }));
					setContent(normalized);
					setError(null);
				})
				.catch((err) => setError(err))
				.finally(() => setLoading(false));
		}
	}, [tab, cache]);

	const handleOpenModal = (images, title) => {
		setModalTitle(title || "Photo Album");
		setCurrentImages(images);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setCurrentImages([]);
	};

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error)
		return (
			<Typography align="center" color="error">
				Failed to load content.
			</Typography>
		);
	if (!tab)
		return (
			<Typography variant="body1" color="textSecondary" align="center">
				No tab selected
			</Typography>
		);

	let availableTechnologies = [];
	let filteredContent = [];
	if (tab.name === "works") {
		availableTechnologies = Array.from(
			new Set(content.flatMap((item) => item.technologies || []))
		).sort();

		filteredContent = content.filter((item) => {
			let valid = true;
			// Only filter by technology if a specific technology is selected
			if (selectedTechnology && selectedTechnology !== "All") {
				valid =
					item.technologies &&
					item.technologies.some(
						(tech) =>
							tech.toLowerCase() ===
							selectedTechnology.toLowerCase()
					);
			}
			// Then apply search filtering (title and description)
			if (valid && searchQuery) {
				const searchLower = searchQuery.toLowerCase();
				valid =
					(item.title &&
						item.title.toLowerCase().includes(searchLower)) ||
					(item.description &&
						item.description.toLowerCase().includes(searchLower));
			}
			return valid;
		});
	}

	// For tabs other than "works", use all content; otherwise, use the filtered content.
	const displayedContent = tab.name === "works" ? filteredContent : content;

	// Define common Grid item properties.
	const gridItemProps = { size: { xs: 12 } };

	if (tab.name === "skills") {
		return (
			<Box>
				<Typography
					variant="h4"
					sx={{
						fontWeight: "bold",
						textAlign: "center",
						mb: 4,
						color: "#1976d2",
					}}
				>
					{tab.label}
				</Typography>
				{content.length > 0 ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
							gap: 2,
							px: 2,
						}}
					>
						{content.map((skill, index) => (
							<Chip
								key={index}
								label={skill.title}
								color="primary"
								variant="outlined"
								sx={{ fontSize: "1rem", padding: "0.5rem" }}
							/>
						))}
					</Box>
				) : (
					<Typography
						variant="body1"
						sx={{ textAlign: "center", color: "#455a64", mt: 2 }}
					>
						No skills available.
					</Typography>
				)}
			</Box>
		);
	}

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{
					fontWeight: "bold",
					textAlign: "center",
					mb: 4,
					color: "#1976d2",
				}}
			>
				{tab.label}
			</Typography>

			{tab.name === "works" && (
				<>
					<Typography
						variant="body2"
						color="textSecondary"
						sx={{ mb: 2 }}
					>
						<strong>Filter</strong> the projects by selecting a
						technology below, or employ the{" "}
						<strong>search box</strong> to locate projects
						containing a specific keyword or phrase.
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" }, // splits vertically on small screens
							gap: 2,
							mb: 3,
							p: 2,
							borderRadius: 2,
							backgroundColor: (theme) =>
								theme.palette.mode === "dark"
									? "#424242"
									: "#f5f5f5",
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
								onChange={(e) =>
									setSelectedTechnology(e.target.value)
								}
								label="Technology"
							>
								<MenuItem value="All">
									<em>All</em>
								</MenuItem>
								{availableTechnologies.map((tech, index) => (
									<MenuItem key={index} value={tech}>
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
				</>
			)}

			{displayedContent && displayedContent.length > 0 ? (
				<Grid
					container
					spacing={4}
					justifyContent="center"
					alignItems="stretch"
					sx={{ width: "100%" }}
				>
					{displayedContent.map((item, index) => (
						<Grid
							key={index}
							{...gridItemProps}
							sx={{ display: "flex" }}
						>
							{tab.name === "contact" ? (
								item.url ? (
									<Button
										variant="outlined"
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										sx={{
											width: "100%",
											display: "flex",
											alignItems: "center",
											gap: 2,
											borderColor: "#1976d2",
											color: "#1976d2",
											"&:hover": {
												backgroundColor: "#e3f2fd",
											},
										}}
									>
										{getDynamicIcon(item)}
										{item.label || item.name}
									</Button>
								) : null
							) : tab.name === "works" ? (
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
										backgroundColor: "#fafafa",
									}}
								>
									<CardContent sx={{ width: "100%" }}>
										<Typography
											variant="h6"
											sx={{
												fontWeight: "bold",
												mb: 1,
												textAlign: "left",
											}}
										>
											{item.title}
										</Typography>
										{item.startDate ? (
											<Typography
												variant="body2"
												sx={{
													mb: 1,
													color: "#757575",
													textAlign: "left",
												}}
											>
												📅{" "}
												{item.endDate
													? `${new Date(
															item.startDate
													  ).getFullYear()} - ${new Date(
															item.endDate
													  ).getFullYear()}`
													: new Date(
															item.startDate
													  ).getFullYear()}
											</Typography>
										) : item.date ? (
											<Typography
												variant="body2"
												sx={{
													mb: 1,
													color: "#757575",
													textAlign: "left",
												}}
											>
												📅{" "}
												{new Date(
													item.date
												).getFullYear()}
											</Typography>
										) : null}

										{item.description && (
											<Typography
												variant="body2"
												sx={{
													mb: 2,
													color: "#333",
													textAlign: "justify",
												}}
											>
												{item.description}
											</Typography>
										)}
										{item.company && (
											<Typography
												variant="body2"
												sx={{
													mb: 2,
													color: "#1976d2",
													fontStyle: "italic",
													textAlign: "left",
												}}
											>
												{item.companyUrl ? (
													<a
														href={item.companyUrl}
														target="_blank"
														rel="noopener noreferrer"
														style={{
															color: "#1976d2",
															textDecoration:
																"none",
														}}
													>
														{item.company}
													</a>
												) : (
													item.company
												)}
											</Typography>
										)}
										<Box
											sx={{
												mt: 2,
												display: "flex",
												gap: 1,
												justifyContent: "flex-start",
											}}
										>
											{item.images &&
												item.images.length > 0 && (
													<Button
														variant="contained"
														onClick={() =>
															handleOpenModal(
																item.images,
																item.title
															)
														}
														startIcon={
															<PhotoAlbumIcon />
														}
														size="small"
														sx={{
															backgroundColor:
																"#ff9800",
															color: "#fff",
															textTransform:
																"none",
															"&:hover": {
																backgroundColor:
																	"#fb8c00",
															},
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
													sx={{
														backgroundColor:
															"#1976d2",
														color: "#fff",
														"&:hover": {
															backgroundColor:
																"#1565c0",
														},
													}}
												>
													Visit
												</Button>
											)}
										</Box>
										{item.technologies &&
											item.technologies.length > 0 && (
												<Box
													sx={{
														mt: 2,
														display: "flex",
														flexWrap: "wrap",
														gap: 1,
													}}
												>
													{item.technologies.map(
														(tech, techIndex) => (
															<Chip
																key={techIndex}
																label={tech}
																color="primary"
																variant="outlined"
																sx={{
																	fontSize:
																		"0.9rem",
																	padding:
																		"0.3rem",
																}}
															/>
														)
													)}
												</Box>
											)}
									</CardContent>
								</Card>
							) : tab.name === "about" ? (
								<Card
									sx={{
										width: "100%",
										p: 2,
										mb: 3,
										boxShadow: 3,
									}}
								>
									<CardContent sx={{ textAlign: "center" }}>
										<Typography
											variant="h6"
											sx={{ fontWeight: "bold", mb: 2 }}
										>
											{item.title}
										</Typography>
										{item.date && (
											<Typography
												variant="body2"
												sx={{ mb: 1, color: "#757575" }}
											>
												📅{" "}
												{new Date(
													item.date
												).toLocaleDateString()}
											</Typography>
										)}
										{item.description && (
											<Typography
												variant="body2"
												sx={{ mb: 3, color: "#757575" }}
											>
												{item.description}
											</Typography>
										)}
									</CardContent>
								</Card>
							) : (
								<Card sx={{ width: "100%", p: 2 }}>
									<CardContent sx={{ textAlign: "center" }}>
										<Typography
											variant="h6"
											sx={{ fontWeight: "bold", mb: 2 }}
										>
											{item.title}
										</Typography>
										{item.date && (
											<Typography
												variant="body2"
												sx={{ mb: 1, color: "#757575" }}
											>
												📅{" "}
												{new Date(
													item.date
												).toLocaleDateString()}
											</Typography>
										)}
										{item.description && (
											<Typography
												variant="body2"
												sx={{ mb: 3, color: "#757575" }}
											>
												{item.description}
											</Typography>
										)}
									</CardContent>
								</Card>
							)}
						</Grid>
					))}
				</Grid>
			) : (
				<Typography
					variant="body1"
					sx={{ textAlign: "center", color: "#455a64", mt: 2 }}
				>
					No content available.
				</Typography>
			)}
			<PhotoAlbumModal
				open={modalOpen}
				onClose={handleCloseModal}
				images={currentImages}
				modalTitle={modalTitle}
			/>
		</Box>
	);
};

export default TabContent;
