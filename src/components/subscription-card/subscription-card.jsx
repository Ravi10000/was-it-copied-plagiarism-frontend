import styles from "./subscription-card.module.scss";
// packages
import { useState } from "react";
import { connect } from "react-redux";

// components
import Popup from "../popup/popup";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
import CustomTextarea from "../custom-textarea/custom-textarea";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";

// api calls
import { updateSubscription } from "../../api/subscriptions";
import SubscriptionInfo from "../subscription-info/subscription-info";
import PricingCard from "../pricing-card/pricing-card";

function SubscriptionCard({ subscription, setSubscriptions, setFlash }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  async function handleSubscriptionUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await updateSubscription({ id: subscription?._id, formData });
      console.log({ res });

      if (res.data.status === "success") {
        setIsPopupOpen(false);
        setSubscriptions(res.data.subscriptions);
        setFlash({
          type: "success",
          message: "Subscription updated successfully",
        });
      }
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className={styles.subscriptionCard}>
      {isPopupOpen && (
        <form onSubmit={handleSubscriptionUpdate}>
          <Popup
            closePopup={() => setIsPopupOpen(false)}
            title={`Edit ${subscription?.name} Subscription`}
          >
            <TextInput
              name="name"
              label="Name"
              placeholder="Enter plan name"
              defaultValue={subscription?.name || ""}
            />
            <CustomTextarea
              name="description"
              label="Description"
              placeholder="Enter plan description"
              defaultValue={subscription?.description || ""}
            />
            <NumInput
              name="price"
              label="Price"
              placeholder="Enter plan price"
              defaultValue={subscription?.price || "0"}
            />
            <NumInput
              name="discountedPrice"
              label="Discounted Price"
              placeholder="Enter discounted price"
              defaultValue={subscription?.discountedPrice || "0"}
            />
            <NumInput
              name="seats"
              label="Seats"
              placeholder="Enter no. of seats for this plan"
              defaultValue={subscription?.seats || ""}
            />
            <NumInput
              name="validity"
              label="Validity"
              placeholder="Enter validity of this plan in days"
              defaultValue={subscription?.validity || ""}
            />
          </Popup>
        </form>
      )}

      <PricingCard subscription={subscription} />
      <div className={styles.editBtn} onClick={() => setIsPopupOpen(true)}>
        <img src="/edit-gradient.png" alt="" />
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(SubscriptionCard);
