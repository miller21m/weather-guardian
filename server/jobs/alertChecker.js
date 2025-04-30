const Alert = require('../models/alert');
const weatherService = require('../services/weather');
const emailService = require('../services/email'); 

exports.evaluateAlerts = async () => {
    try {
      const activeAlerts = await Alert.find({ active: true }).populate('user', 'email username');
  
      for (const alert of activeAlerts) {
        // שלוף את מזג האוויר לפי קואורדינטות או שם
        const weatherData = await weatherService.fetchWeather({
          lat: alert.coordinates?.lat,
          lon: alert.coordinates?.lon,
          city: alert.locationName
        });
  
        const parameterValue = getParameterValue(weatherData, alert.parameter);
  
        if (parameterValue === null) {
          console.warn(`Parameter ${alert.parameter} not found for alert ${alert._id}`);
          continue;
        }

        const isConditionMet = parameterValue > alert.threshold;

        if (isConditionMet) {
          alert.lastTriggeredAt = new Date(); // עדכן זמן עכשיו
          await alert.save();
          console.log(`Alert ${alert._id} was triggered at ${alert.lastTriggeredAt}`);

          const userEmail = alert.user?.email;

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
  
            console.log(`Email sent to ${userEmail}`);
          }
        }
      }
    } catch (error) {
      console.error('Error evaluating alerts:', error.message);
    }
  };
  
  // פונקציה לשליפת ערך מתאים ממזג האוויר
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