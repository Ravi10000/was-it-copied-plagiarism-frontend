import styles from "./details.module.scss";

import Record from "../../components/record/record";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCredits, getMyScans } from "../../api/scan";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import LoadinPage from "../loading/loading";

function DetailsPage({ isAdmin, setFlash }) {
  const [scans, setScans] = useState([]);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [scanCount, setScanCount] = useState(0);
  const [credits, setCredits] = useState(0);

  async function handleFetchScans() {
    setIsFetchingDetails(true);
    try {
      const res = await getMyScans(isAdmin, skip, limit);
      if (res.data.status === "success") {
        setScans(res.data.scans);
        setScanCount(res.data.scanCount);
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setIsFetchingDetails(false);
    }
  }

  async function handleFetchNextScans() {
    if (skip + limit >= scanCount) {
      return setFlash({
        type: "info",
        message: "No more scans available",
      });
    }
    try {
      console.log({ isAdmin });
      const res = await getMyScans(isAdmin, skip + limit, limit);
      setSkip(skip + limit);
      console.log({ res });
      if (res.data.status === "success") setScans(res.data.scans);
    } catch (err) {
      console.log({ err });
    }
  }
  async function handleFetchPrevScans() {
    if (skip == 0) {
      return;
    }
    try {
      const res = await getMyScans(isAdmin, skip - limit, limit);
      setSkip(skip - limit);
      console.log({ res });
      if (res.data.status === "success") setScans(res.data.scans);
    } catch (err) {
      console.log({ err });
    }
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
                <th onClick={() => setSelectAll(true)}>
                  <input type="checkbox" />
                </th>
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
                {skip + 1}-{skip + scans.length} of {scanCount}
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
