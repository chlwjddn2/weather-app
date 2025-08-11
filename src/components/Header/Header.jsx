import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import Search from '../Search/Search';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <WiDaySunny className={styles.weatherIcon}/>
        <span>Weather</span>
      </h1>
      <Search />
    </header>
  )
}
