import * as MuiIcons from "@mui/icons-material"; // Import all MUI icons dynamically
import { Avatar } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link"; // Fallback generic link icon

export const getDynamicIcon = (link) => {
  if (!link) return <LinkIcon />; // Default fallback icon

  if (link.muiIcon) {
    // Try to find the icon using the provided name exactly…
    let IconComponent = MuiIcons[link.muiIcon];

    // …if not found, try appending "Icon" to the name
    if (!IconComponent) {
      IconComponent = MuiIcons[link.muiIcon + "Icon"];
    }

    if (IconComponent) {
      return <IconComponent />;
    } else {
      console.warn(`Icon not found for muiIcon: ${link.muiIcon}`);
    }
  }

  // If the JSON provides an iconUrl, fallback to an Avatar
  if (link.iconUrl) {
    return (
      <Avatar src={link.iconUrl} alt={link.name} sx={{ width: 32, height: 32 }} />
    );
  }

  return <LinkIcon />; // Final fallback to a generic Link icon
};
