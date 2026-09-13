import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getDynamicIcon } from "../../utils/helpers";
import DataState from "../dataState";
import useJsonData from "../../utils/useJsonData";

const ContactTab = () => {
	const { data, loading, error } = useJsonData("/assets/data/contact.json");
	const contacts = Array.isArray(data) ? data : [];

	return (
		<Box>
			<Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: "center" }}>
				Have a project in mind or want to collaborate? I'd love to hear
				from you — pick the channel that suits you best.
			</Typography>
			<DataState loading={loading} error={error}>
				{contacts.length > 0 ? (
					<Grid
						container
						spacing={2}
						justifyContent="center"
						sx={{ width: "100%" }}
					>
						{contacts.map((item) => (
							<Grid
								key={item.name}
								size={{ xs: 12, sm: 4 }}
								sx={{ display: "flex" }}
							>
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
											px: 2,
											"&:hover": {
												backgroundColor: "primary.main",
												color: "primary.contrastText",
												borderColor: "primary.main",
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
			</DataState>
		</Box>
	);
};

export default ContactTab;