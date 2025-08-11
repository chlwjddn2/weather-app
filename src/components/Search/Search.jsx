import styles from './Search.module.css';
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <section className={styles.search}>
      <form className={styles.form} action="">
        <label htmlFor="location-input" className="sr-only">지역명 입력</label>
        <input id="location-input" type="text" placeholder='영문으로 지역명을 입력하세요' />
        <button><FaSearch /></button>
      </form>
    </section>
  )
}
