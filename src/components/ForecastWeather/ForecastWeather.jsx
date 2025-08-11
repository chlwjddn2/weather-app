import styles from './ForecastWeather.module.css';
import Section from '../Section/Section';

export default function ForecastWeather({weatherData = {}}) {
  const {current, forecast, locationInfo} = weatherData;
  const dailyForecastData = {};
  const today = new Date().toISOString().split('T')[0]; // "2025-08-11" 형태
  
  forecast.list.forEach((list) => {
    
    const date = list.dt_txt.split(' ')[0]; // '2025-08-11 15:00:00' → '2025-08-11'
    const temp = list.main.temp;
    const icon = list.weather[0].icon;

    if (today === date) return;

    if (!dailyForecastData[date]) {
      dailyForecastData[date] = {
        max: temp,
        min: temp,
        icon: icon
      };
    } else {
      dailyForecastData[date].max = Math.max(dailyForecastData[date].max, temp);
      dailyForecastData[date].min = Math.min(dailyForecastData[date].min, temp);
    }
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // 0부터 시작하므로 +1
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()]; // 요일 인덱스

    return `${month}월 ${day}일 ${weekday}요일`;
  }

  const dailyForecastArray = Object.entries(dailyForecastData).map(([date, temps]) => ({
    formattedDate: formatDate(date),
    max: Math.floor(temps.max),
    min: Math.floor(temps.min),
    icon: temps.icon
  }));

  return (
    <Section>
      <h2 className={styles.title}>날씨 예보</h2>
      <ul className={styles.forecastList}>
        {dailyForecastArray.map((list, index) => 
          <li key={index}>
            <div className={styles.tempBox}>
              <img src={`https://openweathermap.org/img/wn/${list.icon}@2x.png`} alt="" />
              <p>
                <span>{list.max}</span>
                /
                <span>{list.min}</span>
              </p>
            </div>

            <div>
              <p>{list.formattedDate}</p>
            </div>
          </li>
        )}
      </ul>
    </Section>
  )
}
