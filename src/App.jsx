import fetchWeather from './api/api'
import { useReducer, useEffect, useState } from 'react'
import { weatherReducer, initWeatherState } from './store/weatherReducer'
import styles from './App.module.css'
import Search from './components/Search/Search'

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
      const data = await fetchWeather(latitude, longitude);
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

  console.log(state);
  

  return (
    <div className={styles.weahterContainer}>
      <Search />
      <h1>{state.weather?.name}</h1>
      <h2>{state.weather?.name}</h2>
    </div>
  )
}
