import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

// Shared loading/error wrapper for every data-driven tab (DRY).
// Renders a skeleton while loading, a friendly error on failure,
// and the children otherwise.
const DataState = ({ loading, error, children }) => {
	if (loading) {
		return (
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 3,
					py: 2,
				}}
			>
				<Skeleton variant="text" width="45%" height={44} />
				<Box
					sx={{
						width: "100%",
						display: "grid",
						gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
						gap: 3,
					}}
				>
					{[0, 1, 2].map((i) => (
						<Skeleton key={i} variant="rounded" height={220} />
					))}
				</Box>
			</Box>
		);
	}

	if (error) {
		return (
			<Typography align="center" color="error" sx={{ py: 4 }}>
				Failed to load content. Please try again later.
			</Typography>
		);
	}

	return children;
};

export default DataState;