import { createTheme } from "@mui/material/styles";

// Single source of truth for all design decisions.
// Custom tokens are exposed via `theme.custom` and reused across components
// so colors/gradients never leak into component files (DRY).
const custom = {
	surfaceGradient: {
		light:
			"linear-gradient(135deg, #eef2ff 0%, #ffffff 45%, #ecfeff 100%)",
		dark: "linear-gradient(135deg, #0d1426 0%, #111a2e 55%, #0d1f23 100%)",
	},
	heroGlow: {
		light: "radial-gradient(circle at 35% 30%, rgba(79,70,229,0.18), transparent 58%)",
		dark: "radial-gradient(circle at 35% 30%, rgba(99,102,241,0.30), transparent 60%)",
	},
	coverGradient:
		"linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
	shadowSoft: {
		// Airy resting elevation; avoids the muddy default grey shadow in light mode.
		light: "0 2px 10px rgba(15,23,42,0.05)",
		dark: "0 2px 12px rgba(0,0,0,0.35)",
	},
	shadowCardHover: {
		light: "0 14px 34px rgba(15,23,42,0.12)",
		dark: "0 16px 36px rgba(0,0,0,0.50)",
	},
	shadowBand: {
		// Elevated surface behind the home stats — soft indigo-wash on light.
		light: "0 10px 30px rgba(79,70,229,0.08)",
		dark: "0 10px 30px rgba(0,0,0,0.30)",
	},
};

// Cool-neutral (slate) family that harmonizes with the indigo/cyan brand
// instead of defaulting to MUI's grey, keeping surfaces calm and crisp.
const lightNeutrals = {
	text: {
		primary: "#0f172a",
		secondary: "#475569",
		disabled: "rgba(15,23,42,0.38)",
		hint: "rgba(15,23,42,0.38)",
	},
	divider: "rgba(15,23,42,0.12)",
	action: {
		hover: "rgba(79,70,229,0.08)",
		selected: "rgba(79,70,229,0.12)",
		focus: "rgba(79,70,229,0.16)",
	},
};

const brandGradient = (theme) =>
	`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

export const createAppTheme = (darkMode) =>
	createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: darkMode
				? {
					// Lighter accent on dark surfaces: #818cf8 (~6:1 vs bg) keeps
					// chips, headings, links and icons legible; dark contrastText
					// lets contained buttons keep AA text on the bright tint.
					main: "#818cf8",
					light: "#eef2ff",
					dark: "#6366f1",
					contrastText: "#0a1120",
				}
				: {
					main: "#4f46e5",
					light: "#eef2ff",
					dark: "#3730a3",
					contrastText: "#ffffff",
				},
			secondary: darkMode
				? {
					// Bright cyan accent for dark mode (airbnb-style secondary).
					main: "#22d3ee",
					light: "#a5f3fc",
					dark: "#155e75",
					contrastText: "#0a1120",
				}
				: {
					// Cyan-800 tint + cyan-900 text: ~7:1 on the badge in home.jsx,
					// comfortably above AA for the small uppercase role pill.
					main: "#0891b2",
					light: "#cffafe",
					dark: "#155e75",
					contrastText: "#ffffff",
				},
			background: {
				default: darkMode ? "#0a1120" : "#f6f8fd",
				paper: darkMode ? "#111a2e" : "#ffffff",
			},
			// Cohesive status ramp matching the indigo/cyan/amber brand.
			success: {
				main: "#059669",
				light: "#d1fae5",
				dark: "#047857",
				contrastText: "#ffffff",
			},
			info: {
				main: "#0891b2",
				light: "#cffafe",
				dark: "#155e75",
				contrastText: "#ffffff",
			},
			warning: {
				// Deeper amber than MUI's default so white label keeps ~3.4:1.
				main: "#d97706",
				light: "#fef3c7",
				dark: "#b45309",
				contrastText: "#ffffff",
			},
			error: {
				main: "#dc2626",
				light: "#fee2e2",
				dark: "#b91c1c",
				contrastText: "#ffffff",
			},
			...(!darkMode ? lightNeutrals : {}),
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
					containedPrimary: ({ theme }) => ({
						backgroundImage: brandGradient(theme),
						backgroundSize: "150% 150%",
						backgroundPosition: "0% 0%",
						transition:
							"background-position 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
						"&:hover": {
							backgroundPosition: "100% 50%",
							boxShadow: "0 8px 18px rgba(79,70,229,0.25)",
						},
					}),
					outlinedPrimary: ({ theme }) => ({
						// Seamless hover: indigo-washed surface instead of the
						// default greyscale overlay.
						"&:hover": {
							backgroundColor:
								theme.palette.mode === "light"
									? "rgba(79,70,229,0.06)"
									: "rgba(129,140,248,0.10)",
						},
					}),
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: { transition: "all 0.3s ease-in-out" },
				},
			},
			MuiCard: {
				styleOverrides: {
					root: ({ theme }) => ({
						borderRadius: 14,
						boxShadow: theme.custom.shadowSoft[theme.palette.mode],
						transition: "all 0.25s ease-in-out",
						"&:hover": {
							boxShadow: theme.custom.shadowCardHover[theme.palette.mode],
						},
					}),
				},
			},
			MuiChip: {
				styleOverrides: {
					root: ({ ownerState, theme }) => ({
						fontWeight: 600,
						// Outlined primary chips get a faint indigo wash + deep
						// ink label instead of a raw outline — softer, crisper.
						...(ownerState.variant === "outlined" &&
							ownerState.color === "primary" && {
								color: theme.palette.primary.dark,
								backgroundColor:
									theme.palette.mode === "light"
										? "rgba(79,70,229,0.06)"
										: "rgba(129,140,248,0.10)",
								borderColor:
									theme.palette.mode === "light"
										? "rgba(79,70,229,0.22)"
										: "rgba(129,140,248,0.30)",
							}),
					}),
				},
			},
		},
		custom,
	});