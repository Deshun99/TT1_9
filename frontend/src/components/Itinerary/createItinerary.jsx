import React, { useState, useEffect } from 'react';
import axios from "axios";
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
import { ItineraryApi } from "../../lib/api/itineraryApi";

const CreateItinerary = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [destinations, setDestinations] = useState([
    { destination: "", cost: "", notes: "" },
  ]);
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  useEffect(() => {
    // Fetch the list of destinations from your backend using the ItineraryApi
    ItineraryApi.get("http://localhost:5000/destination/getAllDestinations")
      .then((response) => {
        setAvailableDestinations(response.data); // Update based on the actual data structure returned by your API
        console.log("Available", availableDestinations);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
    ItineraryApi.get("http://localhost:5000/country/getAllCountries")
      .then((response) => {
        setAvailableCountries(response.data); // Update based on the actual data structure returned by your API
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, [availableDestinations, availableCountries]);

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

  const handleDestinationChange = (index, property, value) => {
    const newDestinations = [...destinations];
    newDestinations[index][property] = value;
    setDestinations(newDestinations);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant='h5' align='center'>
          Create Itinerary
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Title'
                variant='outlined'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  label='Country'
                  required
                >
                  {availableCountries &&
                    availableCountries.map((countryOption) => (
                      <MenuItem
                        key={countryOption.id}
                        value={countryOption.name}
                      >
                        {countryOption.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Budget'
                variant='outlined'
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </Grid>
            {destinations.map((destination, index) => (
              <Grid item xs={12} key={index}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Destination {index + 1}</InputLabel>
                  <Select
                    value={destination.destination}
                    onChange={(e) =>
                      handleDestinationChange(
                        index,
                        "destination",
                        e.target.value
                      )
                    }
                    label={`Destination ${index + 1}`}
                    required
                  >
                    {availableDestinations &&
                      availableDestinations.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {/* ... other destination fields ... */}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                onClick={handleAddDestination}
              >
                Add Destination
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                Create
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant='contained' onClick={handleCancel}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
  
  export default CreateItinerary;
  