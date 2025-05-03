import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NoAlertsImage from '../assets/no-alerts.svg';

function CurrentStateList() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch alerts and filter for those triggered in the last 24 hours
    const fetchTriggeredAlerts = async () => {
      try {
        const data = await api.get('/alert');
        const last24Hours = Date.now() - 24 * 60 * 60 * 1000;
        const triggered = data.filter(
          (alert) => alert.lastTriggeredAt && new Date(alert.lastTriggeredAt).getTime() >= last24Hours
        );
        setAlerts(triggered);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTriggeredAlerts();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>Loading triggered alerts...</Typography>
      </Box>
    );
  }

  // Render triggered alerts from the last 24h
  const showListOfAlerts = () =>{
    return(
        alerts.map((alert) => (
            <Grid item xs={12} md={6} key={alert._id} sx={{ mb: 2 }}>
              <Paper elevation={4} sx={{ p: 2, borderLeft: '6px solid #f44336', borderRadius: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="h6" color="error" display="flex" alignItems="center" gap={1}>
                    <WarningAmberIcon /> Triggered Alert
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                        ⏱️ Last Triggered: {new Date(alert.lastTriggeredAt).toLocaleString()}
                    </Typography>
                  <Divider />
                  <Typography variant="body1">
                    <strong>📍 Location:</strong> {alert.locationName || `${alert.coordinates?.lat}, ${alert.coordinates?.lon}`}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Parameter:</strong> {alert.parameter}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Threshold:</strong> {alert.threshold}
                  </Typography>
                  {alert.description && (
                    <Typography variant="body2">
                      <strong>Description:</strong> {alert.description}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))
    )
  }

  return (
    <Box mt={4}>


      {alerts.length === 0 ? 
      
      (
        <Box textAlign="center" mt={4} sx={{maxWidth: '100%', height: '50%', mb: 2 }}>
            <Typography variant="body2">No Alerts For the Last 24h</Typography>
                <img src={NoAlertsImage} alt="No alerts" />
        </Box>
      ) 
      
      : 
      
      (
        <Grid>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Last 24h Alerts
            </Typography>
            {showListOfAlerts()}
        </Grid>
      )}
    </Box>
  );
}

export default CurrentStateList;
