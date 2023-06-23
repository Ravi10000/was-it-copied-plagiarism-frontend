import styles from "./analysis.module.scss";
import { useNavigate } from "react-router-dom";

function AnalysisPage() {
  const navigate = useNavigate();
  return (
    <section className={styles.detailsPage}>
      <h2 className="__sectionTitle">Checker Analysis</h2>
      <input
        type="search"
        className={styles.search}
        placeholder="Search For Analysis"
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Text Content</th>
            <th>No. of Words</th>
            <th>Plagiarism %</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {Array(10)
            .fill()
            .map((_, index) => (
              <tr key={index}>
                <td>Ravi Sharma</td>
                <td>lorem ipsum</td>
                <td>480</td>
                <td>90</td>
                <td>April 20 2023</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="__bottom-bar">
        <div className="__rowsCount">
          <p>rows per page</p>
          <p>10</p>
        </div>
        <div className="__pagination">
          <p>{/* {skip + 1}-{skip + users.length} of {usersCount} */}</p>
          <div className="__controls">
            <img
              className="__prev"
              src="/left.png"
              alt=""
              // onClick={handleFetchPrevUsers}
            />
            <img
              className="__next"
              src="/left.png"
              alt=""
              // onClick={handleFetchMoreUsers}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalysisPage;
