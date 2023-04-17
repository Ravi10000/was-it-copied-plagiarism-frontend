import styles from "./pricing.module.scss";

function PricingPage() {
  return (
    <div className={styles.pricingPage}>
      <h1>Quetext Plans to Fit Your Needs</h1>
      <section className={styles.plans}>
        <div className={styles.plan}>
          <div className={styles.planHead}>
            <h3>Free</h3>
            <p>Key plan features</p>
          </div>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Deep Search Plagiarism Checker</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Website Citation Generator</p>
            </div>
          </div>
          <button className={styles.btnOutlined}>Try For Free</button>
          <p>Free</p>
        </div>
        <div className={styles.plan}>
          <div className={styles.planHead}>
            <h3>Preminum Plan</h3>
            <p>Key plan features</p>
          </div>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Everything In Free</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>New Expanded Citation Generator</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Bulk File Uploads</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Individual Or Small Team Plans</p>
            </div>

            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Grammar Check </p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Spell Check</p>
            </div>
          </div>
          <button className={styles.btnFilled}>Get Started</button>
          <p>Starting at $8.25/month per user</p>
        </div>
        <div className={styles.plan}>
          <div className={styles.planHead}>
            <h3>Enterprise Plan</h3>
            <p>Key plan features</p>
          </div>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Everything In Premium</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Teams Of 6 Or More</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Includes 600,000 Words</p>
            </div>
            <div className={styles.feature}>
              <img src="/check.png" alt="" />
              <p>Additional Users & Word Count Available</p>
            </div>
          </div>
          <button className={styles.btnFilled}>Get Started</button>
          <p>Starting at $7.50/month per user</p>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
