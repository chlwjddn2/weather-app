import {fetchWeatherData, fetchWeatherByCityData} from './api/api';
import { useReducer, useEffect, useState } from 'react';
import { weatherReducer, initWeatherState } from './store/weatherReducer';
import styles from './App.module.css';
import Header from './components/Header/Header';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastWeather from './components/ForecastWeather/ForecastWeather';
import TodayInfo from './components/TodayInfo/TodayInfo';
import HourWeather from './components/HourWeather/HourWeather';
import { ClipLoader } from "react-spinners";

export default function App() {
  const [state, dispatch] = useReducer(weatherReducer, initWeatherState);

  const getCurrentLocation = () => {
    navigator.geolocation?.getCurrentPosition((postion) => {
      const {latitude, longitude} = postion.coords;
      dispatch({ type: 'GET_CURRENT_LOCATION', payload: { latitude, longitude } });
    }, (error) => {
      dispatch({ type: 'FETCH_WEATHER_ERROR', payload: error.message });
    })
  }

  const fetchCurrentWeather = async (latitude, longitude) => {
    dispatch({ type: 'FETCH_WEATHER_START' });
    try {
      const data = await fetchWeatherData(latitude, longitude);
      dispatch({ type: 'FETCH_WEATHER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_WEATHER_ERROR', payload: error.message });
    } finally {
    }
  }

  const fetchWeatherByCity = async (city) => { // 도시 검색
    try {
      const data = await fetchWeatherByCityData(city); // axios API 사용
      const {lat, lon} = data[0];
      fetchCurrentWeather(lat, lon);
    } catch (error) {
      dispatch({ type: 'FETCH_WEATHER_ERROR', payload: {message: error.message, code: error.code} });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [])
  
  useEffect(() => {
    state.location && fetchCurrentWeather(state.location.latitude, state.location.longitude);
  }, [state.location]);

  console.log(state);
  

  return (
    <div className={styles.weahterContainer}>
      
      <Header onSearch={fetchWeatherByCity}/>

      <main className={styles.main}>
        {state.loading === 'start' && <ClipLoader color="#3b82f6" size={100} />}
        {state.errorCode === 'NOT_FOUND' && <div className={styles.errorBox}>{state.error}</div>}
        {state.loading !== 'start' && !state.error && state?.weather && (
          <>
            <div className={styles.container}>
              <CurrentWeather weatherData={state.weather} />
              <ForecastWeather weatherData={state.weather} />
            </div>

            <div className={styles.container}>
              <TodayInfo weatherData={state.weather} />
              <HourWeather weatherData={state.weather} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
