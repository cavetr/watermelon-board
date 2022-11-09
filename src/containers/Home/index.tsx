import React, { memo, useCallback, useEffect, useState } from "react";
import styles from './index.less';

const Home = memo(() => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setNum(n => n + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  const createBoard = useCallback(() => {
    window.open('/page2/');
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        西瓜白板
      </div>
      <div className={styles.button} onClick={createBoard}>
        <div className={styles.text}>
          新建白板
        </div>
      </div>
      <div className={styles.button}>
        <div className={styles.text}>
          加入白板
        </div>
      </div>
    </div>
  )
})
export default Home;