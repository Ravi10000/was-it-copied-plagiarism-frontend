import styles from "./manage-subscriptions.module.scss";

// packages
import { useState, useEffect } from "react";

// components
import SubscriptionCard from "../../components/subscription-card/subscription-card";
import { fetchAllSubscriptions } from "../../api/subscriptions";

function ManageSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  async function getSubscriptions() {
    try {
      const res = await fetchAllSubscriptions();
      console.log({ res });
      if (res.data.status === "success") {
        setSubscriptions(res.data.subscriptions);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className={styles.manageSubscriptionsPage}>
      <div className={styles.head}>
        <h2 className={styles.heading}>Manage Subscriptions</h2>
      </div>
      <div className={styles.subscriptionsContainer}>
        {subscriptions?.map((subscription) => (
          <SubscriptionCard
            setSubscriptions={setSubscriptions}
            subscription={subscription}
            key={subscription?._id}
          />
        ))}
      </div>
    </section>
  );
}

export default ManageSubscriptionsPage;
