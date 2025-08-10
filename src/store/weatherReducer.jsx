export const initWeatherState = {
  location: null,
  weather: null,
  loading: null,
  error: null,
}

export const weatherReducer = (state, action) => {
  switch(action.type) {
    case 'GET_CURRENT_LOCATION': return { ...state, location: action.payload }
    case 'FETCH_WEATHER_START': return { ...state, loading: 'start' }
    case 'FETCH_WEATHER_SUCCESS': return { ...state, weather: action.payload, loading: 'complete' }
    case 'FETCH_WEATHER_ERROR': return { ...state, error: action.payload, loading: 'complete' }
    default: return state
  }
}