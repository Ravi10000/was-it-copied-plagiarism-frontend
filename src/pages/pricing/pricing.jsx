import styles from "./pricing.module.scss";
import { useState, useEffect } from "react";

import PricingCard from "../../components//pricing-card/pricing-card";

import { fetchAllSubscriptions } from "../../api/subscriptions";

function PricingPage() {
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
    <div className={styles.pricingPage}>
      <h1>Plans to Fit Your Needs</h1>
      <section className={styles.plans}>
        {subscriptions?.map((subscription) => (
          <PricingCard subscription={subscription} key={subscription?._id} />
        ))}
      </section>
    </div>
  );
}

export default PricingPage;
