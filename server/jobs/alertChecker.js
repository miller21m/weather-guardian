const Alert = require('../models/alert');
const weatherService = require('../services/weather');
const emailService = require('../services/email'); 

// Periodically called to check if any active alerts should be triggered
exports.evaluateAlerts = async () => {
    try {

      // Fetch all active alerts and populate user's email and username
      const activeAlerts = await Alert.find({ active: true }).populate('user', 'email username');
  
      for (const alert of activeAlerts) {
        // Fetch current weather data for the alert's location
        const weatherData = await weatherService.fetchWeather({
          lat: alert.coordinates?.lat,
          lon: alert.coordinates?.lon,
          city: alert.locationName
        });
        
        // Extract the relevant weather parameter value (e.g., temperature, wind speed)
        const parameterValue = getParameterValue(weatherData, alert.parameter);
  
        if (parameterValue === null) {
          console.warn(`Parameter ${alert.parameter} not found for alert ${alert._id}`);
          continue;
        }

        // Check if the weather condition meets the user's threshold
        const isConditionMet = parameterValue > alert.threshold;

        if (isConditionMet) {
          // Update lastTriggeredAt timestamp
          alert.lastTriggeredAt = new Date();
          await alert.save();

          const userEmail = alert.user?.email;

          // Send email notification to the user if email exists
          if (userEmail) {
            await emailService.sendEmail({
              to: userEmail,
              subject: `⚠️ Weather Alert Triggered`,
              html: `
                <p>Hello ${alert.user.username || 'User'},</p>
                <p>Your weather alert has been triggered based on the latest data:</p>
                <ul>
                  <li><strong>Location:</strong> ${alert.locationName || `${alert.coordinates?.lat}, ${alert.coordinates?.lon}`}</li>
                  <li><strong>Parameter:</strong> ${alert.parameter}</li>
                  <li><strong>Current Value:</strong> ${parameterValue}</li>
                </ul>
                <p>Stay safe!<br />– Your Weather Alert System</p>
              `
            });
          }
        }
      }
    } catch (error) {
      console.error('Error evaluating alerts:', error.message);
    }
  };
  
  // Helper to extract the specific parameter value from the weather data
  function getParameterValue(weatherData, parameter) {
    switch (parameter) {
      case 'temperature':
        return weatherData.temperature;
      case 'windSpeed':
        return weatherData.windSpeed;
      case 'precipitationProbability':
        return weatherData.precipitationProbability;
      default:
        return null;
    }
  }