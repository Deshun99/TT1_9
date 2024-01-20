import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { ItineraryApi } from "@/lib/api/ItineraryApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}
const EditPopUp = ({ itineraryId, destinationList }) => {
	const [open, setOpen] = React.useState(false);

	const theme = useTheme();
	const [destination, setDestination] = React.useState([]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason !== "backdropClick") {
			setOpen(false);
		}
	};
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setDestination(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};
	const submitHandler = async () => {
		const response = await ItineraryApi.update(itineraryId, {
			destination: destination,
		});
	};
	return (
		<div>
			<Button onClick={handleClickOpen}>Edit</Button>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Edit Destination</DialogTitle>
				<DialogContent>
					<Box
						component="form"
						sx={{ display: "flex", flexWrap: "wrap" }}
					>
						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-chip-label">
								Select
							</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={destination}
								onChange={handleChange}
								input={
									<OutlinedInput
										id="select-multiple-chip"
										label="Chip"
									/>
								}
								renderValue={(selected) => (
									<Box
										sx={{
											display: "flex",
											flexWrap: "wrap",
											gap: 0.5,
										}}
									>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}
							>
								{destinationList
									.filter(
										(item) => !destination.includes(item)
									)
									.map((name) => (
										<MenuItem
											key={name}
											value={name}
											style={getStyles(
												name,
												destination,
												theme
											)}
										>
											{name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={submitHandler}>Change</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditPopUp;
