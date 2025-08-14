import styles from './HourItem.module.css'

export default function HourItem({hour, icon, temp }) {
  return (
    <li className={styles.item}>
      <p className={styles.hour}>{hour}시</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>{temp}°</p>
    </li>
  )
}
