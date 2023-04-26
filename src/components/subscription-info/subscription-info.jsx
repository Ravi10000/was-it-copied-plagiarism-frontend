import Button from "../button/button";
import styles from "./subscription-info.module.scss";

function SubscriptionInfo({ subscription }) {
  return (
    <>
      <div className={styles.planHead}>
        <h3>{subscription?.name}</h3>
        <p>Key plan features</p>
      </div>
      <div className={styles.featuresList}>
        <div className={styles.feature}>
          <img src="/check-gradient.png" alt="" />
          <p>No. of seats {subscription?.seats}</p>
        </div>
        <div className={styles.feature}>
          <img src="/check-gradient.png" alt="" />
          <p>Validity {subscription?.validity} Days</p>
        </div>
        <div className={styles.feature}>
          <img src="/check-gradient.png" alt="" />
          <p>Validity {subscription?.description}</p>
        </div>
      </div>
      <Button primary noFit>
        {subscription?.price
          ? `Starting at ₹${subscription?.price}/month`
          : "Try For Free"}
      </Button>
    </>
  );
}

export default SubscriptionInfo;
