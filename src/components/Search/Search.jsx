import styles from './Search.module.css';

export default function Search() {
  return (
    <section className={styles.search}>
      <form className={styles.form} action="">
        <label htmlFor="location-input" className="sr-only">지역명 입력</label>
        <input id="location-input" type="text" placeholder='영문으로 지역명을 입력하세요' />
        <button></button>
      </form>
    </section>
  )
}
