import styles from './TodayCard.module.css';

export default function TodayCard({children}) {
  return (
    <div className={styles.todayCard}>
      {children}
    </div>
  )
}
