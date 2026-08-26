import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import { Avatar } from "@mui/material";

// Explicit map keeps the bundle small: only these icons are shipped.
const ICON_MAP = {
	Email: EmailIcon,
	GitHub: GitHubIcon,
	LinkedIn: LinkedInIcon,
};

export const getDynamicIcon = (link) => {
	if (!link) return <LinkIcon />;

	const IconComponent = link.muiIcon ? ICON_MAP[link.muiIcon] : null;

	if (IconComponent) return <IconComponent />;
	if (link.muiIcon) {
		console.warn(`Unknown muiIcon "${link.muiIcon}", using fallback.`);
	}

	if (link.iconUrl) {
		return (
			<Avatar
				src={link.iconUrl}
				alt={link.name}
				sx={{ width: 32, height: 32 }}
			/>
		);
	}

	return <LinkIcon />;
};

const YEAR_DATE = new Intl.DateTimeFormat("en-US");

export const formatYear = (dateString) =>
	new Date(dateString).getFullYear().toString();

export const formatDateRange = ({ startDate, endDate, date }) => {
	if (startDate && endDate) {
		return `${formatYear(startDate)} - ${formatYear(endDate)}`;
	}
	if (startDate) return formatYear(startDate);
	return formatYear(date);
};

export { YEAR_DATE };
