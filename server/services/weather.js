const axios = require('axios');

const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime';
const API_KEY = process.env.TOMORROW_API_KEY;

// Fetch current weather based on latitude/longitude or city name
exports.fetchWeather = async ({lat, lon, city})=>{
    try{
        let location;
        
        // Determine the location format for the API: either city or lat,lon
        if(city){
            location = city;
        } else if (lat && lon) {
            location = `${lat},${lon}`;
        }

        const response = await axios.get(`${BASE_URL}?location=${location}&apikey=${API_KEY}`);
        const data = response.data;


        // Return a simplified weather object with selected parameters
        return {
            temperature: data.data.values.temperature,
            windSpeed: data.data.values.windSpeed,
            precipitationProbability: data.data.values.precipitationProbability,
            time: data.data.time,
            name: data.location.name,
            lat: data.location.lat,
            lon: data.location.lon
        };
        
    }catch(error){
        // Provide clear error message from the API response or a default fallback
        throw new Error(error.response?.data || 'Failed to fetch weather data');
    }
};