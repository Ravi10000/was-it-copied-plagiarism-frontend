import styles from "./details.module.scss";

import Record from "../../components/record/record";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailsPage() {
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
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
        </tbody>
      </table>
    </section>
  );
}

export default DetailsPage;
