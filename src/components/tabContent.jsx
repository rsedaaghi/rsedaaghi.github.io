import React, { useEffect, useState } from "react";
import PhotoAlbumModal from "./photoAlbumModal";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip
} from "@mui/material";
import { getDynamicIcon } from "../utils/helpers"; // Import the helper function

// Import MUI icons for buttons
import LaunchIcon from "@mui/icons-material/Launch";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";

const TabContent = ({ tab }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [modalTitle, setModalTitle] = useState("Photo Album");

  // Normalize raw JSON data for each tab into a common shape
  const normalizeData = (tabName, data) => {
    if (!data) return [];
    if (tabName === "about") {
      return Array.isArray(data) ? data : [];
    }
    if (tabName === "contact") {
      return Array.isArray(data)
        ? data.map((item) => ({
            title: item.title || item.name || "",
            label: item.label || "",
            url: item.url || "",
            iconUrl: item.iconUrl || "",
            muiIcon: item.muiIcon || ""
          }))
        : [];
    }
    if (tabName === "skills") {
      // For skills, we expect an array of strings; convert them into objects with a title property.
      return Array.isArray(data)
        ? data.map((skill) =>
            typeof skill === "string" ? { title: skill } : skill
          )
        : [];
    }
    if (tabName === "works") {
      return Array.isArray(data) ? data : [];
    }
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") return [data];
    return [];
  };

  // Fetch the JSON file when the tab changes.
  useEffect(() => {
    if (tab && tab.jsonFile) {
      setLoading(true);
      fetch(`/assets/data/${tab.jsonFile}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((rawData) => {
          const normalized = normalizeData(tab.name, rawData);
          setContent(normalized);
          setError(null);
        })
        .catch((error) => {
          console.error(`Error loading ${tab.jsonFile}:`, error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tab]);

  // Handler to open modal and pass along images and the work title.
  const handleOpenModal = (images, title) => {
    setModalTitle(title || "Photo Album");
    setCurrentImages(images);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentImages([]);
  };

  if (loading) {
    return <Typography align="center">Loading...</Typography>;
  }
  if (error) {
    return (
      <Typography align="center" color="error">
        Failed to load content.
      </Typography>
    );
  }
  if (!tab) {
    return (
      <Typography variant="body1" color="textSecondary" align="center">
        No tab selected
      </Typography>
    );
  }

  // Use a full-width grid item for About & Works tabs.
  const gridItemProps = { xs: 12 };

  // Special layout for the Skills tab: use Chips to showcase each skill.
  if (tab.name === "skills") {
    return (
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "#1976d2"
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
              px: 2
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
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4, color: "#1976d2" }}
      >
        {tab.label}
      </Typography>
      {content && content.length > 0 ? (
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ width: "100%" }}>
          {content.map((item, index) => (
            <Grid key={index} item {...gridItemProps} sx={{ display: "flex" }}>
              {tab.name === "contact" ? (
                // Contact Tab Layout: Button with dynamic icon.
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
                    "&:hover": { backgroundColor: "#e3f2fd" }
                  }}
                >
                  {getDynamicIcon(item)}
                  {item.label || item.name}
                </Button>
              ) : tab.name === "works" ? (
                // Works Tab Layout: Card with project details, buttons, and technologies as Chips.
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2
                  }}
                >
                  <CardContent sx={{ width: "100%", textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      {item.title}
                    </Typography>
                    {item.date && (
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, color: "#757575" }}
                      >
                        📅 {new Date(item.date).toLocaleDateString()}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography variant="body2" sx={{ mb: 3, color: "#757575" }}>
                        {item.description}
                      </Typography>
                    )}
                    {/* Buttons: Visit Project & View Album with icons */}
                    <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
                      {item.url && (
                        <Button
                          variant="contained"
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<LaunchIcon />}
                          sx={{
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#1565c0" }
                          }}
                        >
                          Visit Project
                        </Button>
                      )}
                      {item.images && item.images.length > 0 && (
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenModal(item.images, item.title)}
                          startIcon={<PhotoAlbumIcon />}
                          sx={{
                            borderColor: "#1976d2",
                            color: "#1976d2",
                            "&:hover": { backgroundColor: "#e3f2fd" }
                          }}
                        >
                          View Album
                        </Button>
                      )}
                    </Box>
                    {/* Technologies Used: Display as Chips */}
                    {item.technologies && item.technologies.length > 0 && (
                      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                        {item.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
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
              ) : tab.name === "about" ? (
                // About Tab Layout: Each item is shown in a full-width card (100% width).
                <Card
                  sx={{
                    width: "100%",
                    p: 2,
                    mb: 3,
                    boxShadow: 3
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      {item.title}
                    </Typography>
                    {item.date && (
                      <Typography variant="body2" sx={{ mb: 1, color: "#757575" }}>
                        📅 {new Date(item.date).toLocaleDateString()}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography variant="body2" sx={{ mb: 3, color: "#757575" }}>
                        {item.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ) : (
                // Default Layout for any other tab.
                <Card sx={{ width: "100%", p: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      {item.title}
                    </Typography>
                    {item.date && (
                      <Typography variant="body2" sx={{ mb: 1, color: "#757575" }}>
                        📅 {new Date(item.date).toLocaleDateString()}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography variant="body2" sx={{ mb: 3, color: "#757575" }}>
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
        <Typography variant="body1" sx={{ textAlign: "center", color: "#455a64", mt: 2 }}>
          No content available.
        </Typography>
      )}
      <PhotoAlbumModal open={modalOpen} onClose={handleCloseModal} images={currentImages} modalTitle={modalTitle} />
    </Box>
  );
};

export default TabContent;
