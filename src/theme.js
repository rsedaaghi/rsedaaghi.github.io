import { createTheme } from "@mui/material/styles";

// Single source of truth for all design decisions.
// Custom tokens are exposed via `theme.custom` and reused across components
// so colors/gradients never leak into component files (DRY).
const custom = {
	surfaceGradient: {
		light:
			"linear-gradient(135deg, #eef2ff 0%, #ffffff 55%, #f0fdfa 100%)",
		dark: "linear-gradient(135deg, #0d1426 0%, #111a2e 55%, #0d1f23 100%)",
	},
	heroGlow: {
		light: "radial-gradient(circle at 35% 30%, rgba(79,70,229,0.20), transparent 60%)",
		dark: "radial-gradient(circle at 35% 30%, rgba(99,102,241,0.30), transparent 60%)",
	},
	coverGradient:
		"linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
};

export const createAppTheme = (darkMode) =>
	createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: {
				main: "#4f46e5",
				light: "#eef2ff",
				dark: "#4338ca",
				contrastText: "#ffffff",
			},
			secondary: {
				main: "#0891b2",
				light: "#a5f3fc",
				dark: "#0e7490",
				contrastText: "#ffffff",
			},
			background: {
				default: darkMode ? "#0a1120" : "#f8fafc",
				paper: darkMode ? "#111a2e" : "#ffffff",
			},
		},
		typography: {
			fontFamily: "'Nunito','Roboto', sans-serif",
			h1: { fontWeight: 800 },
			h2: { fontWeight: 800 },
			h3: { fontWeight: 800 },
			h4: { fontWeight: 700 },
			h5: { fontWeight: 700 },
			h6: { fontWeight: 700 },
		},
		shape: { borderRadius: 12 },
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 10,
						textTransform: "none",
						fontWeight: 700,
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: { transition: "all 0.3s ease-in-out" },
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 14,
						transition: "transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out",
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					root: { fontWeight: 600 },
				},
			},
		},
		custom,
	});