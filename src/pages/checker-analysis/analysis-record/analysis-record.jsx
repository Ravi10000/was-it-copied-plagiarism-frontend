import styles from "./analysis-record.module.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AnalysisRecord({ scan }) {
  const createdAtDate = new Date(scan?.createdAt).toDateString();
  const createdAtTime = new Date(scan?.createdAt).toLocaleTimeString();
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
    <tr
      className={styles.record}
      onClick={() => navigate(`/details/${scan?._id}`)}
    >
      <td>
        {scan?.user?.fname} {scan?.user?.lname}
      </td>
      <td>{scan?.user?.email} </td>
      <td className={styles.title}>{scan?.title?.slice(0, 20)}...</td>
      <td>
        {scan?.result?.results?.score?.aggregatedScore
          ? scan?.result?.results?.score?.aggregatedScore + "%"
          : "N/A"}
      </td>
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

export default AnalysisRecord;
