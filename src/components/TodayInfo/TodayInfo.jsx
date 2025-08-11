import styles from './TodayInfo.module.css';
import Section from '../Section/Section';
import TodayCard from './TodayCard';
import DonutChart from './DonutChart';

export default function ForecastWeather({weatherData = {}}) {
  const perceivedTemp = Math.floor(weatherData.current.main.feels_like);
  const airPollution = weatherData.airPollutionResponse.list[0].components;
  const {o3, pm2_5, pm10, co} = airPollution
  
  return (
    <Section>
      <h2 className={styles.title}>오늘의 주요 정보</h2>
      <div className={styles.container}>
        <TodayCard>
          <h3>미세먼지 지수</h3>
          <ul className={styles.infoList}>
            <li>
              <p>미세먼지</p>
              <DonutChart max={100} value={Math.floor(pm10)}/>
            </li>
            <li>
              <p>초미세먼지</p>
              <DonutChart max={100} value={Math.floor(pm2_5)}/>
            </li>
          </ul>
        </TodayCard>
      </div>
    </Section>
  )
}
