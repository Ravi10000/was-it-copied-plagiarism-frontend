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
      <SubscriptionInfo subscription={subscription} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PricingCard);
