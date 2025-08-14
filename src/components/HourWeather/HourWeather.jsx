import Section from '../Section/Section';
import TodayCard from '../TodayInfo/TodayCard';
import styles from './HourWeather.module.css'
import HourItem from './HourItem';

export default function HourWeather({ weatherData = {} }) {
  const hourDatas = weatherData.forecast.list;
  const filteringHourData = hourDatas.filter((data) => data.dt > Date.now() / 1000).slice(0, 8);

  return (
    <Section>
      <h3>시간별 예보</h3>
      <ul className={styles.container}>
        {filteringHourData.map((item, index) => {
          const hour = item.dt_txt.split(' ')[1].split(':')[0];
          return <HourItem key={index} hour={hour} icon={item.weather[0].icon} temp={Math.floor(item.main.temp)}/>
        })}
      </ul>
    </Section>
  )
}
