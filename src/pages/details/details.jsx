import styles from "./details.module.scss";

import Record from "../../components/record/record";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCredits, getMyScans } from "../../api/scan";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import LoadinPage from "../loading/loading";

function DetailsPage({ setFlash }) {
  const [scans, setScans] = useState([]);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [scanCount, setScanCount] = useState(0);
  console.log({ scans });
  async function handleFetchScans() {
    setIsFetchingDetails(true);
    try {
      let res = await getMyScans(skip, limit);
      if (res.data.status === "success") {
        res.data.scans = res.data.scans.map((scan) => {
          if (scan?.result) scan.result = JSON.parse(scan.result);
          return scan;
        });
        setScans(res.data.scans);
        setSkip(limit);
        if (skip === 0) setScanCount(res.data.scanCount);
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setIsFetchingDetails(false);
    }
  }

  async function handleFetchNextScans() {
    if (skip >= scanCount) {
      return setFlash({
        type: "info",
        message: "No more scans available",
      });
    }
    await handleFetchScans(skip, limit);
    setSkip(skip + limit);
  }
  async function handleFetchPrevScans() {
    if (skip === 10) {
      return;
    }
    await handleFetchScans(skip, limit);
    setSkip(skip - limit);
  }

  useEffect(() => {
    handleFetchScans();
  }, []);
  return (
    <>
      {isFetchingDetails ? (
        <LoadinPage />
      ) : (
        <section className={styles.detailsPage}>
          <h2 className="__sectionTitle">Reports</h2>
          <input
            type="search"
            className={styles.search}
            placeholder="Search Reports"
          />
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th onClick={() => setSelectAll(true)}>
                  <input type="checkbox" />
                </th> */}
                <th>Title</th>
                <th>Similarity Score</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {scans?.map((scan) => (
                <Record key={scan?._id} scan={scan} />
              ))}
            </tbody>
          </table>
          <div className="__bottom-bar">
            <div className="__rowsCount">
              <p>rows per page</p>
              <p>10</p>
            </div>
            <div className="__pagination">
              <p>
                {skip - limit + 1}-{skip - limit + scans.length} of {scanCount}
              </p>
              <div className="__controls">
                <img
                  className="__prev"
                  src="/left.png"
                  alt=""
                  onClick={handleFetchPrevScans}
                />
                <img
                  className="__next"
                  src="/left.png"
                  alt=""
                  onClick={handleFetchNextScans}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default connect(null, { setFlash })(DetailsPage);
