import { FaSmog } from 'react-icons/fa';
import { FaTint } from 'react-icons/fa';
import { FaTachometerAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import styles from './TodayInfo.module.css';
import Section from '../Section/Section';
import TodayCard from './TodayCard';
import DonutChart from './DonutChart';

const WHO_CRITERIA = {
  PM10: 50, // µg/m³
  PM2_5: 25, // µg/m³
};

export default function ForecastWeather({weatherData = {}}) {
  const airQuality = weatherData.airPollutionResponse.list[0].main.aqi;
  const airQualityHistory = weatherData.airPollutionHistoryResponse.list;
  const airPollution = weatherData.airPollutionResponse.list[0].components;
  const {o3, pm2_5, pm10, co, so2, no2} = airPollution;

  const {humidity, pressure, feels_like} = weatherData.current.main;

  const getAirQualityCompliance = (value, type) => {
    const threshold = WHO_CRITERIA[type];
    return value <= threshold ? '권고치 이내' : '권고치 초과';
  };

  const getAirQualityLabel = (aqi) => {
    switch (aqi) {
      case 1: return '좋음';
      case 2: return '보통';
      case 3: return '보통';
      case 4: return '나쁨';
      case 5: return '매우 나쁨';
      default: return '정보 없음';
    }
  }

  const calculate24hAverage = (values) => {
    if (!values.length) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }
  
  const pm2_5_Average = calculate24hAverage(airQualityHistory.map(v => v.components.pm2_5));
  const pm10_Average = calculate24hAverage(airQualityHistory.map(v => v.components.pm10));
  
  return (
    <Section>
      <h2 className={styles.title}>오늘의 주요 정보</h2>
      <div className={styles.container}>
        <TodayCard>
          <h3>미세먼지 농도</h3>
          <div className={styles.infoWrap}>
            <ul className={styles.infoList}>
              <li>
                <DonutChart max={100} value={Math.floor(pm10)}/>
                <div className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>현재 미세먼지</p>
                  <p>{getAirQualityLabel(airQuality)}</p>
                  <p>{getAirQualityCompliance(pm10_Average, 'PM10')}</p>
                </div>
              </li>
              <li>
                <DonutChart max={100} value={Math.floor(pm2_5)}/>
                <div className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>현재 미세먼지</p>
                  <p className={styles.infoCardState}>좋음</p>
                  <p>{getAirQualityCompliance(pm2_5_Average, 'PM2_5')}</p>
                </div>
              </li>
            </ul>
          </div>
          
        </TodayCard>
        <TodayCard>
          <h3>대기 오염 지수</h3>
          <div className={styles.infoWrap}>
            <div className={styles.icon}><FaSmog /></div>
            <ul className={styles.infoList}>
              <li>
                <div className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>오존</p>
                  <p>{o3}</p>
                </div>
              </li>
              <li>
                <div className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>일산화탄소</p>
                  <p>{co}</p>
                </div>
              </li>
              <li>
                <div className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>아황산가스</p>
                  <p>{so2}</p>
                </div>
              </li>
              <li>
                <div className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>이산화질소</p>
                  <p>{no2}</p>
                </div>
              </li>
            </ul>
          </div>
          
        </TodayCard>

        <div className={styles.innerBox}>
          <TodayCard>
            <h3>습도</h3>
            <div className={styles.infoWrap}>
              <div className={styles.icon}><FaTint /></div>
              <ul className={styles.infoList}>
                <li>
                  <p>{humidity} <sub>%</sub> </p>
                </li>
              </ul>
            </div>
          </TodayCard>
          <TodayCard>
            <h3>기압</h3>
            <div className={styles.infoWrap}>
              <div className={styles.icon}><FaTachometerAlt /></div>
              <ul className={styles.infoList}>
                <li>
                  <p>{pressure} <sub>hpa</sub></p>
                </li>
              </ul>
            </div>
          </TodayCard>
        </div>
        <div className={styles.innerBox}>
          <TodayCard>
            <h3>체감 온도</h3>
            <div className={styles.infoWrap}>
              <div className={styles.icon}><WiHumidity /></div>
              <ul className={styles.infoList}>
                <li>
                  <p>{feels_like} <sub></sub> </p>
                </li>
              
              </ul>
            </div>
          </TodayCard>
          <TodayCard>
            <h3>가시거리</h3>
            <div className={styles.infoWrap}>
              <div className={styles.icon}><FaEye /></div>
              <ul className={styles.infoList}>
                <li>
                  <p>{weatherData.current.visibility} <sub>km</sub></p>
                </li>
              </ul>
            </div>
          </TodayCard>
        </div>
      </div>
    </Section>
  )
}
