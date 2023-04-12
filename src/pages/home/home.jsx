import Button from "../../components/button/button";
import styles from "./home.module.scss";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.homeTopSection}>
        <h1 className={styles.title}>
          Original Writing, Made Easy With Quetext
        </h1>
        <p className={styles.subtitle}>
          Quetext's plagiarism checker analyzes your text to identify
          plagiarism, resolve other writing issues, and build citations with
          ease. You wouldn't want to write without it.
        </p>
        <Button lg color="#fe5b60">
          Check For Plagiarism
        </Button>
      </section>
    </div>
  );
}

export default HomePage;
