const weatherService = require('../services/weather');
exports.getWeather = async (req,res,next) =>{
    try{
        const {lat, lon, city} = req.query;

        // Require either coordinates or a city name to fetch weather
        if (!lat || !lon) {
            if (!city) {
              return res.status(400).json({ error: 'Please provide latitude/longitude or city name' });
            }
        }

        // Fetch weather data using the provided location info
        const weatherData = await weatherService.fetchWeather({ lat, lon, city });
        
        res.status(200).json(weatherData);
        
    }catch(error){
        console.error('Error fetching weather:', error.message);
        res.status(500).json({error:'Failed to fetch weather data'});
    }
}