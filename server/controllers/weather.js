const weatherService = require('../services/weather');
exports.getWeather = async (req,res,next) =>{
    try{
        const {lat, lon, city} = req.query;
        console.log('Im in weather route');

        if (!lat || !lon) {
            if (!city) {
              return res.status(400).json({ error: 'Please provide latitude/longitude or city name' });
            }
        }

        const weatherData = await weatherService.fetchWeather({ lat, lon, city });
        console.log('weatherData', weatherData);
        
        res.status(200).json(weatherData);
        
    }catch(error){
        console.error('Error fetching weather:', error.message);
        res.status(500).json({error:'Failed to fetch weather data'});
    }
}