import NoAlertsImage from '../assets/no-alerts.svg';

import {Box, Card,CardActions,CardContent,Typography,Button,Stack,Divider} from '@mui/material';
import './AlertList.css';


function AlertList({alerts, onDeleteAlert}) {

  // Render the list of alerts as MUI Cards
    const alertsList = () =>{
        return(
            alerts.map((alert)=>{
                return(
                    <Card key={alert._id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6" component="div" gutterBottom className='alert-title-container'>
                            <div>
                              {/* Display location name or fallback to coordinates */}
                                {alert.locationName || `${alert.coordinates?.lat}, ${alert.coordinates?.lon}`}
                                
                                {/* Show last triggered time if exists */}
                                {alert.lastTriggeredAt && (
                                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'gray' }}>
                                    Last triggered: {new Date(alert.lastTriggeredAt).toLocaleString()}
                                    </Typography>
                                )}
                            </div>
                            {/* Show alert status suported only in the server no ui */}
                            <div>{alert.active ? 'Active' : 'Paused'}</div>
                        </Typography>
              
                        <Divider sx={{ my: 1 }} />
                        
                        {/* Alert details */}
                        <Stack spacing={1}>
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
                      </CardContent>
              
                    <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                      <Button size="small" variant="outlined" color="error" onClick={()=>deleteAlert(alert._id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
              
                )
            })
        )
    };

    // Wrapper for calling parent delete function
    const deleteAlert = (alertId) =>{
        onDeleteAlert(alertId)
    }

  return (
    <div className='alerts-list-continer'>
        {alerts.length > 0 ? alertsList() :     
        <Box textAlign="center" mt={4}>
            <img src={NoAlertsImage} alt="No alerts" />
            <Typography variant="h6">No Alerts Yet</Typography>
            <Typography variant="body2">Use the form to create your first weather alert.</Typography>
        </Box>}
    </div>
  );
}

export default AlertList;