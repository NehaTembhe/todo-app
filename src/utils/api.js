import axios from 'axios';

const BASE_URL = 'http://api.weatherstack.com/current'; 
const API_KEY = '85f2654af1715b85780d6e717db919c5'; 

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?access_key=${API_KEY}&query=${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; 
  }
};
