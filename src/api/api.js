import axios from "axios";

const API_KEY = 'fe7a63959f4875251b8082ecf6229447';

// 날씨 api 연동
export async function fetchWeatherData(latitude, longitude) {
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

    const airParams = {
      lat: latitude,
      lon: longitude,
      appid: API_KEY,
    }

    const airHistoryParams = {
      lat: latitude,
      lon: longitude,
      start: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000),
      end :  Math.floor(new Date().setHours(23, 59, 59, 999) / 1000),
      appid: API_KEY,
    }

    const forecastRequest = axios.get('https://api.openweathermap.org/data/2.5/forecast', { params: baseParams }); // 5일 데이터
    const currentWeatherRequest = axios.get('https://api.openweathermap.org/data/2.5/weather', { params: baseParams }); // 현재 날씨
    const geoRequest = axios.get('https://api.openweathermap.org/geo/1.0/reverse', { params:geoParams }); // 역추적 현재 위치
    const airPollutionRequest = axios.get('https://api.openweathermap.org/data/2.5/air_pollution', { params: airParams } // 대기 정보
    );
    const airPollutionHistoryRequest = axios.get('https://api.openweathermap.org/data/2.5/air_pollution/history', {params: airHistoryParams });

    const [forecastResponse, currentWeatherResponse, geoResponse, airPollutionResponse, airPollutionHistoryResponse] = await Promise.all([
      forecastRequest,
      currentWeatherRequest,
      geoRequest,
      airPollutionRequest,
      airPollutionHistoryRequest
    ]);

    return {
      forecast: forecastResponse.data,
      current: currentWeatherResponse.data,
      locationInfo: geoResponse.data[0],
      airPollutionResponse: airPollutionResponse.data,
      airPollutionHistoryResponse: airPollutionHistoryResponse.data
    }
  } catch(error) {
    throw new Error('전체 날씨 데이터 가져오기 실패: ' + error.message);
  }
}
// 도시 이름으로 날씨 가져오기
export async function fetchWeatherByCityData(city) {
  try {
    const params = {
      q: city,
      limit: 1,
      appid: API_KEY,
    };
    const response = await axios.get("https://api.openweathermap.org/geo/1.0/direct", { params });

    // 없는 도시일 경우
    if (!response.data || response.data.length === 0) {
      const error = new Error("검색 결과가 없습니다.");
      error.code = "NOT_FOUND";
      throw error;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const err = new Error("도시를 찾을 수 없습니다.");
      err.code = "NOT_FOUND";
      throw err;
    }
    throw error; // 일반 에러는 그대로 던짐
  }
}

