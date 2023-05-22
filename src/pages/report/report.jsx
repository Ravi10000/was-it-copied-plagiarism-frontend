import styles from "./report.module.scss";
import { useState, useRef, useEffect } from "react";

import Button from "../../components/button/button";
import { getScanById } from "../../api/scan";
import { useParams } from "react-router-dom";

function ReportPage() {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const [scan, setScan] = useState(null);
  const { id } = useParams();
  console.log({ scan });
  async function handleFetchReport() {
    try {
      const res = await getScanById(id);
      console.log({ res });
      setScan({ ...res.data.scan, text: res.data.text });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchReport();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <section className={styles.reportPage}>
      <div className={styles.data}>
        <input
          className={styles.textInput}
          type="text"
          defaultValue="Lorem Ipsum is simply..."
        />
        <div className={styles.text}>
          <p>
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. */}
            {scan?.text}
          </p>
        </div>
        <Button primary>New Search</Button>
      </div>
      <div className={styles.analysis}>
        <div className={styles.percentage}>
          <p>100%</p>
        </div>
        <div className={styles.head}>
          <div className={styles.left}>
            <img
              src="/arrow.png"
              alt=""
              className={styles.btn + " " + styles.back}
            />
            <img
              src="/arrow.png"
              alt=""
              className={styles.btn + " " + styles.forward}
            />
            <p>4 matches from 1 source</p>
          </div>
          <div
            className={styles.menu}
            onClick={() => setShowOptions((prevState) => !prevState)}
          >
            <div className={styles.menuIconContainer}>
              <img
                className={styles.menuIcon}
                src="/more-dots-filled.png"
                alt=""
              />
            </div>
            {showOptions && (
              <div className={styles.options} ref={optionsRef}>
                <div className={styles.option}>
                  <img src="/info.png" alt="" />
                  <p>Summary</p>
                </div>
                <div className={styles.option}>
                  <img src="/share.png" alt="" />
                  <p>share</p>
                </div>
                <div className={styles.option}>
                  <img src="/download (1).png" alt="" />
                  <p>download pdf</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.report}>
          <div className={styles.reportText}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            perspiciatis magni delectus rerum asperiores eum! Minima esse
            pariatur consequuntur magnam eius ipsa libero laboriosam nihil
            aliquam, nostrum qui officia dolores!
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportPage;
