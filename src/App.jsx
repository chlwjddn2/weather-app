import fetchWeatherData from './api/api';
import { useReducer, useEffect, useState } from 'react';
import { weatherReducer, initWeatherState } from './store/weatherReducer';
import styles from './App.module.css';
import Header from './components/Header/Header';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastWeather from './components/ForecastWeather/ForecastWeather';

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

  useEffect(() => {
    getCurrentLocation();
  }, [])
  
  useEffect(() => {
     state.location && fetchCurrentWeather(state.location.latitude, state.location.longitude);
  }, [state.location]);

  return (
    <div className={styles.weahterContainer}>
      <Header />
      <main className={styles.main}>
        {state?.weather && <CurrentWeather weatherData={state.weather} />}
        {state?.weather && <CurrentWeather weatherData={state.weather} />}
        {state?.weather && <ForecastWeather weatherData={state.weather} />}
        {/* {state?.weather && <ForecastWeather weatherData={state.weather} />} */}
        {/* <CurrentWeather /> */}
      </main>
    </div>
  )
}
