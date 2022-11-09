import React, { useEffect, useState } from "react";
import styles from './index.less';

const APP = () => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setNum(n => n + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={styles.wrapper}>
      <span className={styles.content}>I'm APP change {num}</span>
    </div>
  )
}
export default APP;