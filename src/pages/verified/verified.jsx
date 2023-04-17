import styles from "./verified.module.scss";
import { useNavigate } from "react-router-dom";

function VerifiedPage() {
  const navigate = useNavigate();
  return (
    <section className={styles.verifiedPage}>
      <div className={styles.content}>
        <img src="/verified.png" alt="" />
        <h2>Email verification successful.</h2>
        <p className={styles.highlightText} onClick={() => navigate("/login")}>
          go to login page
        </p>
      </div>
    </section>
  );
}

export default VerifiedPage;
