import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SearchIcon from '@mui/icons-material/Search';

const DEFAULT_LOCATION = 'Tel Aviv';

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION);
  const [customLocation, setCustomLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch weather using a city name
  const fetchWeatherByName = async (name) => {
    try {
      setLoading(true);
      const data = await api.get(`/weather?city=${name}`);
      setWeather(data);
      setLocationName(name);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather for this location');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather using coordinates (from geolocation)
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const data = await api.get(`/weather?lat=${lat}&lon=${lon}`);
      setWeather(data);
      setLocationName('my loction');
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather for coordinates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attempt to get user's location on mount; fallback to default city
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        fetchWeatherByName(DEFAULT_LOCATION);
      }
    );
  }, []);

  // Handle manual city search
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (customLocation) {
      fetchWeatherByName(customLocation);
      setLocationName('');
    }
  };

  // Loading state UI
  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography variant="body2" mt={2} sx={{ animation: 'fadein 1s ease-in-out infinite alternate' }}>
          Getting weather near you...
        </Typography>
      </Box>
    );
  }

  // Error state UI
  if (error) {
    return (
      <Paper sx={{ padding: 2, mt: 2, backgroundColor: '#fff3f3' }}>
        <Typography color="error" fontWeight="bold">{error}</Typography>
      </Paper>
    );
  }

  // Main content UI
  return (
    <Paper sx={{ padding: 3, mt: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }} elevation={4}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <LocationOnIcon color="primary" />
        <Typography variant="h5" fontWeight="bold">
          Weather in {locationName}
        </Typography>
      </Box>

      {/* Weather details */}
      <Stack spacing={1} mt={2}>
        <Typography variant="body1">
          <ThermostatIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> 
          <strong>Temperature:</strong> {weather.temperature}°C
        </Typography>
        <Typography variant="body1">
          <AirIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          <strong>Wind Speed:</strong> {weather.windSpeed} km/h
        </Typography>
        <Typography variant="body1">
          <WaterDropIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          <strong>Precipitation:</strong> {weather.precipitationProbability}%
        </Typography>
      </Stack>

      {/* Manual city search form */}
      <Box component="form" onSubmit={handleLocationSubmit} mt={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Search City"
            variant="outlined"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default CurrentWeather;
