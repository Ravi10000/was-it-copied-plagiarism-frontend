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
    </section>
  );
}

export default AnalysisPage;
