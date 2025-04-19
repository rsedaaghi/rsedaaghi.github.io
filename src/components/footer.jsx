import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { getDynamicIcon } from "../utils/helpers"; // Import the helper function

const Footer = ({ lastUpdated }) => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        fetch("assets/data/contact.json")
            .then((response) => response.json())
            .then((data) => setSocialLinks(data))
            .catch((error) =>
                console.error("Error loading social links:", error)
            );
    }, []);

    return (
        <Box component="footer" sx={{ mt: 4, py: 2, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
                {socialLinks.map((link, index) => (
                    <IconButton
                        key={index}
                        href={link.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: "#1976d2",
                            "&:hover": { color: "#1565c0", transform: "scale(1.2)" },
                            transition: "0.3s",
                        }}
                    >
                        {getDynamicIcon(link)}
                    </IconButton>
                ))}
            </Box>

            <Typography variant="body2" sx={{ fontStyle: "italic", color: "#757575" }}>
                Last Updated: {lastUpdated || "N/A"}
            </Typography>
        </Box>
    );
};

export default Footer;
