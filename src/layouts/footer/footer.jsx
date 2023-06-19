import styles from "./footer.module.scss";

import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import TodquestMessage from "../../components/todquest-message/todquest-message";

function Footer() {
  const navigate = useNavigate();
  return (
    <section className={styles.footer}>
      <TodquestMessage/>
      <div className={styles.content}>
        <nav>
          <li>About Us</li>
          <li>Pricing</li>
          <li onClick={() => navigate("/search")}>Plagiarism Checker</li>
        </nav>
        <div className={styles.bottomSection}>
          <div className={styles.linksContainer}>
            <div className={styles.left}>
              <p className={styles.link}>Privacy Policy</p>
              <div className={styles.bar}></div>
              <p className={styles.link}>Terms and Conditions</p>
            </div>
            <div className={styles.copywrite}>
              <p className={styles.link}>copywrite&copy;plagiarism-checker</p>
            </div>
          </div>
          <Button secondary onClick={() => navigate("/signup")}>
            Sign Up Now
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Footer;
