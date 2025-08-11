import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import styles from './Section.module.css';

export default function Section({ children, className }) {
  return (
    <section className={`${styles.section} ${className || ''}`}>
      {children}
    </section>
  )
}
