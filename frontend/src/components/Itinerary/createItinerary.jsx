import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { ItineraryApi } from './path-to-your-api/ItineraryApi'; // Update the path accordingly

const CreateItinerary = () => {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [budget, setBudget] = useState('');
  const [destinations, setDestinations] = useState([{ destination: '', cost: '', notes: '' }]);
  const [availableDestinations, setAvailableDestinations] = useState([]);

  useEffect(() => {
    // Fetch the list of destinations from your backend using the ItineraryApi
    ItineraryApi.get().then((data) => {
      setAvailableDestinations(data); // Update based on the actual data structure returned by your API
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
      setTitle('');
      setCountry('');
      setBudget('');
      setDestinations([{ destination: '', cost: '', notes: '' }]);
    } catch (error) {
      // Handle errors (e.g., show an error message, log the error, etc.)
      console.error('Error creating itinerary:', error);
    }
  };

  const handleCancel = () => {
    // Add logic to handle cancel, e.g., redirect to another page or clear the form
    setTitle('');
    setCountry('');
    setBudget('');
    setDestinations([{ destination: '', cost: '', notes: '' }]);
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, { destination: '', cost: '', notes: '' }]);
  };

  const handleDestinationChange = (index, property, value) => {
    const newDestinations = [...destinations];
    newDestinations[index][property] = value;
    setDestinations(newDestinations);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" align="center">
          Create Itinerary
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* ... other form fields ... */}
            {destinations.map((destination, index) => (
              <Grid item xs={12} key={index}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Destination {index + 1}</InputLabel>
                  <Select
                    value={destination.destination}
                    onChange={(e) => handleDestinationChange(index, 'destination', e.target.value)}
                    label={`Destination ${index + 1}`}
                    required
                  >
                    {availableDestinations.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* ... other destination fields ... */}
              </Grid>
            ))}
            {/* ... other buttons ... */}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateItinerary;
