import styles from "./details.module.scss";

function DetailsPage() {
  return (
    <section className={styles.detailsPage}>
      <h2 className="__heading">Reports</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Title</th>
            <th>Similarity Score</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody></tbody>
      </table>
    </section>
  );
}

export default DetailsPage;
