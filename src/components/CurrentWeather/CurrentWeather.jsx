// import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import styles from './CurrentWeather.module.css';
import Section from '../Section/Section';
import getFormattedDate from '../../utils/getData';

export default function CurrentWeather({weatherData = {}}) {
  const {current, forecast, locationInfo} = weatherData;
  
  const currentTemperature = Math.floor(current?.main.temp);
  const description = current.weather[0].description;
  const icon = current.weather[0].icon;
  const location = locationInfo.local_names.ko;

  console.log(current);
  
  
  return (
    <Section>
      <h2 className={styles.title}>현재</h2>
      <div className={styles.tempBox}>
        <p>{currentTemperature}°</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.locationBox}>
        <p>{getFormattedDate()}</p>
        <p>{location}</p>
      </div>
    </Section>
    // <section className={styles.section}>
        
    //     <div className={styles.wrapper}>
    //       <p className={styles.heading}>
    //         {/* {`${Math.round(temp)}°`}<sup>c</sup> */}
    //       </p>
    //       <img
    //         src={iconUrl}
    //         width="80"
    //         height="80"
    //         alt="clouds"
    //         className={styles.img}
    //       />
    //     </div>
    //   </section>
    
  )
}
