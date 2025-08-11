import axios from "axios";

const API_KEY = 'fe7a63959f4875251b8082ecf6229447';

// 날씨 api 연동
export default async function fetchWeatherData(latitude, longitude) {
  try {
    const baseParams = {
      lat: latitude,
      lon: longitude,
      appid: API_KEY,
      lang: 'kr',
      units: 'metric'
    }

    const geoParams = {
      lat: latitude,
      lon: longitude,
      limit: 1,
      appid: API_KEY,
      lang: "kr",
    }
    
    const forecastRequest = axios.get('https://api.openweathermap.org/data/2.5/forecast', { params: baseParams });
    const currentWeatherRequest = axios.get('https://api.openweathermap.org/data/2.5/weather', { params: baseParams });
    const geoRequest = axios.get('https://api.openweathermap.org/geo/1.0/reverse', { params:geoParams });

    const [forecastResponse, currentWeatherResponse, geoResponse] = await Promise.all([
      forecastRequest,
      currentWeatherRequest,
      geoRequest
    ]);

    return {
      forecast: forecastResponse.data,
      current: currentWeatherResponse.data,
      locationInfo: geoResponse.data[0]
    }
  } catch(error) {
    throw new Error('전체 날씨 데이터 가져오기 실패: ' + error.message);
  }
}


