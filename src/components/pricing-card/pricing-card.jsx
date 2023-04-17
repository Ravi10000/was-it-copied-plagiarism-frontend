import styles from "./pricing-card.module.scss";
// packages
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components

// redux actions
import { selectCurrentUser } from "../../redux/user/user.selectors";
import SubscriptionInfo from "../subscription-info/subscription-info";

function PricingCard({ subscription, currentUser }) {
  return (
    <div className={styles.subscriptionCard}>
      {/* <div className={styles.planHead}>
        <h3>{subscription?.name}</h3>
        <p>Key plan features</p>
      </div>
      <div className={styles.featuresList}>
        <div className={styles.feature}>
          <img src="/check.png" alt="" />
          <p>No. of seats {subscription?.seats}</p>
        </div>
        <div className={styles.feature}>
          <img src="/check.png" alt="" />
          <p>Validity {subscription?.validity} Days</p>
        </div>
        <div className={styles.feature}>
          <img src="/check.png" alt="" />
          <p>Validity {subscription?.description} Days</p>
        </div>
      </div>
      <button className={styles.btnOutlined}>
        {subscription?.price
          ? `Starting at ₹${subscription?.price}/month`
          : "Try For Free"}
      </button> */}
      <SubscriptionInfo subscription={subscription} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PricingCard);
