import styles from "./details.module.scss";

import Record from "../../components/record/record";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyScans } from "../../api/scan";

function DetailsPage({ isAdmin }) {
  const [scans, setScans] = useState([]);
  async function handleFetchScans() {
    try {
      const res = await getMyScans(isAdmin);
      console.log({ res });
      if (res.data.status === "success") setScans(res.data.scans);
    } catch (err) {
      console.log({ err });
    }
  }
  useEffect(() => {
    handleFetchScans();
  }, []);
  console.log({ scans });
  return (
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
    </section>
  );
}

export default DetailsPage;
