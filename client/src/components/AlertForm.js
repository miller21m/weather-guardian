import { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

function AlertForm({ addAlert }) {
  const [locationMode, setLocationMode] = useState('name'); // name | coordinates
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [parameter, setParameter] = useState('temperature');
  const [threshold, setThreshold] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const alertData = {
      parameter,
      threshold: Number(threshold),
      description,
    };

    if (locationMode === 'name') {
      alertData.locationName = locationName;
    } else {
      alertData.coordinates = {
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
      };
    }

    try {
      addAlert(alertData);
      // Reset fields
      setLocationName('');
      setLatitude('');
      setLongitude('');
      setParameter('temperature');
      setThreshold('');
      setDescription('');
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New Alert
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <ToggleButtonGroup
            value={locationMode}
            exclusive
            onChange={(e, newMode) => newMode && setLocationMode(newMode)}
            aria-label="Location Mode"
          >
            <ToggleButton value="name">By Location Name</ToggleButton>
            <ToggleButton value="coordinates">By Coordinates</ToggleButton>
          </ToggleButtonGroup>

          {locationMode === 'name' ? (
            <TextField
              label="Location Name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              required
              fullWidth
            />
          ) : (
            <>
              <TextField
                label="Latitude"
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Longitude"
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
                fullWidth
              />
            </>
          )}

          <FormControl fullWidth>
            <InputLabel>Parameter</InputLabel>
            <Select
              value={parameter}
              label="Parameter"
              onChange={(e) => setParameter(e.target.value)}
            >
              <MenuItem value="temperature">Temperature</MenuItem>
              <MenuItem value="windSpeed">Wind Speed</MenuItem>
              <MenuItem value="precipitationProbability">Precipitation Probability</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Threshold"
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Alert'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default AlertForm;
