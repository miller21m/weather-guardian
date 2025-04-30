const axios = require('axios');

const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime';
const API_KEY = process.env.TOMORROW_API_KEY;

// Return the weather in loaction based on lat lon or city
exports.fetchWeather = async ({lat, lon, city})=>{
    try{
        let location;
        console.log('City', city);
        
        if(city){
            location = city;
        } else if (lat && lon) {
            location = `${lat},${lon}`;
        }

        const response = await axios.get(`${BASE_URL}?location=${location}&apikey=${API_KEY}`);
        console.log('Response', response.data);
        const data = response.data;


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
        console.log(error);
        
        throw new Error(error.response?.data || 'Failed to fetch weather data');
    }
};