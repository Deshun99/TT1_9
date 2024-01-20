import React, { useState } from 'react';
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

const CreateItinerary = () => {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [budget, setBudget] = useState('');
  const [destinations, setDestinations] = useState([{ destination: '', cost: '', notes: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data, e.g., send it to the server

    // Reset the form fields after submission
    setTitle('');
    setCountry('');
    setBudget('');
    setDestinations([{ destination: '', cost: '', notes: '' }]);
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
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Budget"
                variant="outlined"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </Grid>
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
                    <MenuItem value="Destination1">Destination 1</MenuItem>
                    <MenuItem value="Destination2">Destination 2</MenuItem>
                    <MenuItem value="Destination3">Destination 3</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label={`Cost for Destination ${index + 1}`}
                  variant="outlined"
                  value={destination.cost}
                  onChange={(e) => handleDestinationChange(index, 'cost', e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label={`Notes for Destination ${index + 1}`}
                  variant="outlined"
                  value={destination.notes}
                  onChange={(e) => handleDestinationChange(index, 'notes', e.target.value)}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleAddDestination}>
                Add Destination
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Create
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" onClick={handleCancel}>
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
