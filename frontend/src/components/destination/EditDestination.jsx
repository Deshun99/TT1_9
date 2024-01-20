import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	DialogActions,
} from "@mui/material";
import { ItineraryApi } from "@/lib/api/ItineraryApi";
import { DestinationApi } from "@/lib/api/destinationApi";

const EditDestination = () => {
	const [title, setTitle] = useState("");
	const [country, setCountry] = useState("");
	const [cost, setCost] = useState("");
	const [notes, setNotes] = useState('');
	const [availableCountries, setAvailableCountries] = useState([]);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason !== "backdropClick") {
			setOpen(false);
		}
        setTitle("");
		setCountry("");
		setCost("");
		setNotes('');
	};
	useEffect(() => {
		ItineraryApi.get("http://localhost:5000/country/getAllCountries")
			.then((data) => {
				setAvailableCountries(data); // Update based on the actual data structure returned by your API
			})
			.catch((error) => {
				console.error("Error fetching countries:", error);
			});
        console.log(availableCountries)
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prepare the data to be sent to the server
		const destData = {
			title,
			country,
			cost,
			notes,
		};

		try {
			// Call the create method from the ItineraryApi
			await DestinationApi.update(destData);

			// Optionally, you can handle success here (e.g., show a success message, redirect, etc.)

			// Reset the form fields after successful submission
			setTitle("");
			setCountry("");
			setCost("");
			setNotes('');
		} catch (error) {
			// Handle errors (e.g., show an error message, log the error, etc.)
			console.error("Error creating itinerary:", error);
		}
	};


	return (
		<>
			<Button onClick={handleClickOpen}>Edit</Button>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Edit Destination</DialogTitle>
				<DialogContent>
					<Box
						component="form"
						sx={{ display: "flex", flexWrap: "wrap" }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Title"
									variant="outlined"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth variant="outlined">
									<InputLabel>Country</InputLabel>
									<Select
										value={country}
										onChange={(e) =>
											setCountry(e.target.value)
										}
										label="Country"
										required
									>
										{availableCountries &&
											availableCountries.map(
												(countryOption) => (
													<MenuItem
														key={countryOption.id}
														value={
															countryOption.name
														}
													>
														{countryOption.name}
													</MenuItem>
												)
											)}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Cost"
									variant="outlined"
									value={cost}
									onChange={(e) => setCost(e.target.value)}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Notes"
									variant="outlined"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									required
								/>
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Change</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditDestination;
