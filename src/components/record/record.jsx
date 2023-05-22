import styles from "./record.module.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Record({ scan }) {
  const createdAtDate = new Date(scan?.createdAt).toDateString();
  const createdAtTime = new Date(scan?.createdAt).toLocaleTimeString();
  console.log({ scan });
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleCloseOptions(e) {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }
    addEventListener("mousedown", handleCloseOptions);
    return () => {
      removeEventListener("mousedown", handleCloseOptions);
    };
  });

  return (
    <tr className={styles.record}>
      <td>
        <input type="checkbox" />
      </td>
      <td className={styles.title} onClick={() => navigate("/details/id")}>
        {/* Lorem Ipsum is simply... */}
        {scan?.text?.slice(0, 20)}...
      </td>
      <td>100%</td>
      <td>
        {createdAtDate}, {createdAtTime}
      </td>
      <td
        className={styles.menu}
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        <img src="/more.png" alt="" />
        {showOptions && (
          <div className={styles.options} ref={optionsRef}>
            <div className={styles.option}>
              <img src="/open.png" alt="" />
              <p>open</p>
            </div>
            <div className={styles.option}>
              <img src="/rename.png" alt="" />
              <p>rename</p>
            </div>
            <div className={styles.option}>
              <img src="/download (1).png" alt="" />
              <p>download pdf</p>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

export default Record;
