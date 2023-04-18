import styles from "./record.module.scss";
import { useState } from "react";

function Record() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <tr className={styles.record}>
      <td>
        <input type="checkbox" />
      </td>
      <td className={styles.title}>Lorem Ipsum is simply...</td>
      <td>100%</td>
      <td>Apr 13, 2023 11:49 AM</td>
      <td
        className={styles.menu}
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        <img src="/3dots.png" alt="" />
        {showOptions && (
          <div className={styles.options}>
            <p className={styles.option}>open</p>
            <p className={styles.option}>rename</p>
            <p className={styles.option}>download pdf</p>
          </div>
        )}
      </td>
    </tr>
  );
}

export default Record;
