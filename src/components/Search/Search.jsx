import React, { useState } from 'react';
import styles from './Search.module.css';
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    console.log(query);
    
    // onSearch(query); // 상위 컴포넌트에 검색어 전달
    setQuery('');    // 입력 초기화
  };

  return (
    <section className={styles.search}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <label htmlFor="location-input" className="sr-only">지역명 입력</label>
        <input id="location-input" type="text" placeholder='영문으로 지역명을 입력하세요' onChange={(e) => setQuery(e.target.value)}/>
        <button><FaSearch /></button>
      </form>
    </section>
  )
}
