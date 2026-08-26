import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getDynamicIcon } from "../../utils/helpers";
import useJsonData from "../../utils/useJsonData";

const ContactTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/contact.json");

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error) {
		return (
			<Typography align="center" color="error">
				Failed to load content.
			</Typography>
		);
	}

	const contacts = Array.isArray(data) ? data : [];

	return (
		<Box>
			{contacts.length > 0 ? (
				<Grid
					container
					spacing={2}
					justifyContent="center"
					sx={{ width: "100%" }}
				>
					{contacts.map((item) => (
						<Grid key={item.name} size={{ xs: 12 }} sx={{ display: "flex" }}>
							{item.url ? (
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
										borderColor: "primary.main",
										color: "primary.main",
										"&:hover": {
											backgroundColor: "primary.light",
										},
									}}
								>
									{getDynamicIcon(item)}
									{item.label || item.name}
								</Button>
							) : null}
						</Grid>
					))}
				</Grid>
			) : (
				<Typography
					variant="body1"
					sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
				>
					No contact information available.
				</Typography>
			)}
		</Box>
	);
};

export default ContactTab;
