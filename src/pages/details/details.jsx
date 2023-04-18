import Record from "../../components/record/record";
import styles from "./details.module.scss";
import { useEffect, useState } from "react";

function DetailsPage() {
  const [selectAll, setSelectAll] = useState(false);
  return (
    <section className={styles.detailsPage}>
      <h2 className="__heading">Reports</h2>
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
          <Record />
          <Record />
        </tbody>
      </table>
    </section>
  );
}

export default DetailsPage;
