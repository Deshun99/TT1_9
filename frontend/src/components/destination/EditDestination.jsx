import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Grid,
	Paper,
	Typography,
	Container,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import { ItineraryApi } from "@/lib/api/ItineraryApi";

const CreateItinerary = () => {
	const [title, setTitle] = useState("");
	const [country, setCountry] = useState("");
	const [budget, setBudget] = useState("");
	const [destinations, setDestinations] = useState([
		{ destination: "", cost: "", notes: "" },
	]);
	const [availableCountries, setAvailableCountries] = useState([]);

	useEffect(() => {
		ItineraryApi.get("http://localhost:5000/country/getAllCountries")
			.then((data) => {
				setAvailableCountries(data); // Update based on the actual data structure returned by your API
			})
			.catch((error) => {
				console.error("Error fetching countries:", error);
			});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prepare the data to be sent to the server
		const itineraryData = {
			title,
			country,
			budget,
			destinations,
		};

		try {
			// Call the create method from the ItineraryApi
			await ItineraryApi.create(itineraryData);

			// Optionally, you can handle success here (e.g., show a success message, redirect, etc.)

			// Reset the form fields after successful submission
			setTitle("");
			setCountry("");
			setBudget("");
			setDestinations([{ destination: "", cost: "", notes: "" }]);
		} catch (error) {
			// Handle errors (e.g., show an error message, log the error, etc.)
			console.error("Error creating itinerary:", error);
		}
	};

	const handleCancel = () => {
		// Add logic to handle cancel, e.g., redirect to another page or clear the form
		setTitle("");
		setCountry("");
		setBudget("");
		setDestinations([{ destination: "", cost: "", notes: "" }]);
	};

	const handleAddDestination = () => {
		setDestinations([
			...destinations,
			{ destination: "", cost: "", notes: "" },
		]);
	};


	return (
		<Container component="main" maxWidth="xs">
			<Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
				<Typography variant="h5" align="center">
					Edit Destination
				</Typography>
				<form onSubmit={handleSubmit}>
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
									onChange={(e) => setCountry(e.target.value)}
									label="Country"
									required
								>
									{availableCountries &&
										availableCountries.map(
											(countryOption) => (
												<MenuItem
													key={countryOption.id}
													value={countryOption.name}
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
								value={budget}
								onChange={(e) => setBudget(e.target.value)}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								fullWidth
								variant="contained"
								onClick={handleAddDestination}
							>
								Add Destination
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
							>
								Create
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								fullWidth
								variant="contained"
								onClick={handleCancel}
							>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default CreateItinerary;
