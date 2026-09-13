import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import useJsonData from "../utils/useJsonData";
import { getDynamicIcon } from "../utils/helpers";

const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Counts from 0 to `target` with an ease-out curve. Respects
// prefers-reduced-motion by jumping straight to the final value.
const useCountUp = (target, active) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!active || target == null) return;
		if (prefersReducedMotion()) {
			setCount(target);
			return;
		}
		let raf;
		const duration = 1100;
		const startTime = performance.now();
		const tick = (now) => {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setCount(Math.round(target * eased));
			if (progress < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, active]);

	return count;
};

const StatItem = ({ stat }) => {
	const count = useCountUp(stat.value, stat.value != null);

	return (
		<Box sx={{ textAlign: "center" }}>
			<Typography
				variant="h5"
				sx={{
					fontWeight: 900,
					lineHeight: 1.1,
					fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.4rem" },
					background: (theme) =>
						`linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
				}}
			>
				{stat.value != null ? `${count}${stat.suffix ?? ""}` : "—"}
			</Typography>
			<Typography
				variant="caption"
				sx={{ color: "text.secondary", fontSize: { xs: "0.66rem", sm: "0.74rem" } }}
			>
				{stat.label}
			</Typography>
		</Box>
	);
};

const Home = ({ onNavigate }) => {
	const { data: homeData } = useJsonData("/assets/data/home.json");
	const { data: worksData } = useJsonData("/assets/data/works.json");
	const { data: contactsData } = useJsonData("/assets/data/contact.json");

	const works = useMemo(() => (Array.isArray(worksData) ? worksData : []), [worksData]);
	const socials = Array.isArray(contactsData) ? contactsData : [];

	const currentYear = new Date().getFullYear();

	// Stats are computed from real portfolio data so they never go stale.
	// Experience anchors are defined in home.json (programming since 2011,
	// web development since 2021).
	const stats = useMemo(() => {
		const programmingYears =
			homeData?.programmingStartYear != null
				? currentYear - homeData.programmingStartYear
				: null;
		const webYears =
			homeData?.webDevelopmentStartYear != null
				? currentYear - homeData.webDevelopmentStartYear
				: null;
		return [
			{ value: works.length, suffix: "+", label: "Projects Showcased" },
			{
				value: programmingYears,
				suffix: "+",
				label: "Years of Programming",
			},
			{
				value: webYears,
				suffix: "+",
				label: "Years Web Development",
			},
		];
	}, [works, homeData, currentYear]);

	const portrait = (
		<Box
			sx={{
				position: "relative",
				width: { xs: 190, sm: 220, md: 240 },
				mx: "auto",
				aspectRatio: "479 / 467",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					inset: -20,
					borderRadius: "50%",
					background: (theme) => theme.custom.heroGlow[theme.palette.mode],
					filter: "blur(24px)",
					opacity: 0.8,
				}}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 479 467"
				width="100%"
				height="100%"
				role="img"
				aria-label="Portrait of Reza Sedaaghi"
				style={{
					position: "relative",
					display: "block",
					filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.28))",
				}}
			>
				<title>Reza Sedaaghi</title>
				<defs>
					<mask id="svg-mask">
						<path
							fill="white"
							d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"
						/>
					</mask>
				</defs>
				<image
					href={homeData?.image}
					width="100%"
					height="100%"
					mask="url(#svg-mask)"
					preserveAspectRatio="xMidYMid slice"
				/>
			</svg>
		</Box>
	);

	const showContactButton = homeData?.contactButton?.isOn;

	const heroText = (
		<Box sx={{ textAlign: { xs: "center", md: "left" } }}>
			<Typography
				component="span"
				sx={{
					display: "inline-block",
					px: 2,
					py: 0.5,
					mb: 2,
					borderRadius: 999,
					bgcolor: "secondary.light",
					color: "secondary.dark",
					fontWeight: 800,
					fontSize: "0.78rem",
					letterSpacing: "0.06em",
					textTransform: "uppercase",
				}}
			>
				{homeData?.role ?? "Software Developer"}
			</Typography>

			<Typography
				variant="h3"
				sx={{
					fontWeight: 900,
					mb: 1.25,
					fontSize: { xs: "1.6rem", md: "2rem" },
					lineHeight: 1.15,
					background: (theme) =>
						`linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
				}}
			>
				{homeData?.headline}
			</Typography>

			<Typography
				variant="body1"
				sx={{
					mb: 1.5,
					color: "text.secondary",
					textAlign: "justify",
					fontSize: { xs: "0.95rem", md: "1rem" },
				}}
			>
				{homeData?.description}
			</Typography>

			<Stack
				direction="row"
				spacing={1.5}
				sx={{ flexWrap: "wrap", mb: 1.5, justifyContent: { xs: "center", md: "flex-start" } }}
			>
				<Button
					variant="contained"
					onClick={() => onNavigate?.("works")}
					sx={{ px: 3.5, py: 0.75 }}
				>
					View My Work
				</Button>
				{showContactButton && (
					<Button
						variant="outlined"
						href={homeData.contactButton.url}
						sx={{ px: 3.5, py: 0.75 }}
					>
						Contact Me
					</Button>
				)}
			</Stack>

			<Stack
				direction="row"
				spacing={1}
				sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
			>
				{socials.map((link) => (
					<IconButton
						key={link.name}
						href={link.url || "#"}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.label || link.name}
						sx={{
							color: "text.secondary",
							"&:hover": { color: "primary.main", transform: "translateY(-2px)" },
							transition: "0.2s",
						}}
					>
						{getDynamicIcon(link)}
					</IconButton>
				))}
			</Stack>
		</Box>
	);

	const statsBand = (
		<Box
			sx={{
				mt: 2.5,
				width: "100%",
				display: "grid",
				gridTemplateColumns: { xs: "repeat(3, 1fr)", md: "repeat(3, 1fr)" },
				borderRadius: 3,
				border: "1px solid",
				borderColor: "divider",
				bgcolor: (theme) =>
					theme.palette.mode === "dark"
						? "rgba(255,255,255,0.04)"
						: "rgba(255,255,255,0.65)",
				boxShadow: (theme) =>
					theme.palette.mode === "dark"
						? "0 10px 30px rgba(0,0,0,0.25)"
						: "0 10px 30px rgba(79,70,229,0.06)",
				overflow: "hidden",
			}}
		>
			{stats.map((stat, index) => (
				<Box
					key={stat.label}
					sx={{
						p: { xs: 1.25, sm: 1.5 },
						borderLeft: index > 0 ? "1px solid" : "none",
						borderColor: "divider",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<StatItem stat={stat} />
				</Box>
			))}
		</Box>
	);

	return (
		<>
			<Grid
				container
				spacing={{ xs: 2, md: 4 }}
				alignItems="center"
				sx={{ my: 0 }}
			>
<Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
				{portrait}
			</Grid>
				<Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
					{heroText}
				</Grid>
			</Grid>
			{statsBand}
		</>
	);
};

export default Home;