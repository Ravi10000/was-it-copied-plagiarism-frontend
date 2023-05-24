import styles from "./report.module.scss";
import { useState, useRef, useEffect } from "react";

import Button from "../../components/button/button";
import { getScanById } from "../../api/scan";
import { useNavigate, useParams } from "react-router-dom";

function ReportPage() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const [scan, setScan] = useState(null);
  const [title, setTitle] = useState("");
  const [currentSourceIdx, setCurrentSourceIdx] = useState(0);
  let currentSource = scan?.sources?.[currentSourceIdx];

  const { id } = useParams();
  async function handleFetchReport() {
    try {
      const res = await getScanById(id);
      console.log({ res });
      let scanData = {
        ...res.data.scan,
        text: res.data.text,
      };
      if (res.data.scan.status !== "COMPLETED") return setScan(scanData);
      if (res?.data?.scan?.result) {
        scanData.result = JSON.parse(res?.data?.scan?.result);
      }
      let { internet, repositories, database, batch } =
        scanData?.result?.results;
      scanData.sources = internet
        .concat(repositories)
        .concat(database)
        .concat(batch);

      if (scanData?.result?.notifications?.alerts?.length > 0) {
        scanData.alert = scanData?.result?.notifications?.alerts?.[0];
        // .map(
        //   (alert, i) => {
        const additionalData = JSON.parse(scanData?.alert?.additionalData);
        let aiTextProbability = 0;
        additionalData?.results?.forEach((result) => {
          if (result.probability > aiTextProbability)
            aiTextProbability = result.probability;
        });
        scanData.aiTextProbability = aiTextProbability;
        // return { ...alert, additionalData };
        // }
        // );
        // scanData.alerts = scanData.result.notifications.alerts;
      }
      setScan(scanData);
    } catch (err) {
      console.log(err);
    }
  }

  function showNextSource() {
    if (currentSourceIdx >= scan.sources.length - 1)
      return setCurrentSourceIdx(0);
    setCurrentSourceIdx((prevState) => prevState + 1);
  }
  function showPrevSource() {
    if (currentSourceIdx <= 0)
      return setCurrentSourceIdx(scan.sources.length - 1);
    setCurrentSourceIdx((prevState) => prevState - 1);
  }

  useEffect(() => {
    setTitle(scan?.title);
  }, [scan]);

  useEffect(() => {
    //   let tryFetchingScan = setInterval(async () => {
    //     const scanResponse = await getScanById();
    //     console.log({ scanResponse });
    //     if (scanResponse?.data?.scan?.status !== "CREATED")
    //       clearInterval(tryFetchingScan);
    //   }, [10000]);
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
    <>
      {scan?.status !== "COMPLETED" ? (
        <div className={styles.checking}>
          <h2>checking for plagiarism...</h2>
        </div>
      ) : (
        <section className={styles.reportPage}>
          <div className={styles.data}>
            <table className={styles.summary}>
              <tr>
                <th>Identical Words: </th>
                <td>{scan?.result?.results?.score?.identicalWords}</td>
              </tr>
              <tr>
                <th>Minor Changed Words: </th>
                <td>{scan?.result?.results?.score?.minorChangedWords}</td>
              </tr>
              <tr>
                <th>Related Meaning Words: </th>
                <td>{scan?.result?.results?.score?.relatedMeaningWords}</td>
              </tr>
            </table>
            <input
              className={styles.textInput}
              type="text"
              value={scan?.title?.slice(0, 20) + "..."}
            />
            <div className={styles.text}>
              <p>{scan?.text}</p>
            </div>
            <Button primary onClick={() => navigate("/search")}>
              New Search
            </Button>
          </div>

          <div className={styles.analysis}>
            <div className={styles.percentage}>
              <p>{scan?.result?.results?.score?.aggregatedScore}%</p>
            </div>
            <p>
              result: {currentSourceIdx + 1} / {scan?.sources?.length}
            </p>
            <div className={styles.head}>
              <div className={styles.left}>
                <img
                  src="/arrow.png"
                  alt=""
                  className={styles.btn + " " + styles.back}
                  onClick={showPrevSource}
                />
                <img
                  src="/arrow.png"
                  alt=""
                  className={styles.btn + " " + styles.forward}
                  onClick={showNextSource}
                />
                <p>
                  {Math.floor(
                    (currentSource?.matchedWords * 100) /
                      scan?.result?.scannedDocument?.totalWords
                  )}
                  % matched
                </p>
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
                    <div
                      className={styles.option}
                      onClick={() => window.open(currentSource?.url)}
                    >
                      <img src="/info.png" alt="" />
                      <p>visit source</p>
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
            <table className={styles.report}>
              {/* <div className={styles.reportText}> */}
              <tr>
                <th>Source : </th>
                <td>{currentSource?.url.slice(0, 25)}...</td>
              </tr>
              <tr>
                <th>Title : </th>
                <td>{currentSource?.title}</td>
              </tr>
              <tr>
                <th>Matched Words : </th>
                <td>{currentSource?.matchedWords}</td>
                {/* </div> */}
              </tr>
            </table>
            {scan?.alert && (
              <div className={styles.aiInfo}>
                <h2>{Math.floor(scan?.aiTextProbability * 100)}%</h2>
                <h3>{scan?.alert?.title}</h3>
                <p>{scan?.alert?.message}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default ReportPage;
