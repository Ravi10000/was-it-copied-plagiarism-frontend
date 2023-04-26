import Button from "../../../components/button/button";
import styles from "./benefit-item.module.scss";
import { useState } from "react";
import Popup from "../../../components/popup/popup";
import TextInput from "../../../components/text-input/text-input";
import ImageInput from "../../../components/image-input/image-input";
import { editBenefit } from "../../../api/benefits";
import CustomTextarea from "../../../components/custom-textarea/custom-textarea";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function BenefitItem({ benefit, enableEdit, fetchBenefits, setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleEditBenefit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const response = await editBenefit(benefit?._id, formData);
      console.log({ response });
      if (response.data.status === "success") {
        fetchBenefits();
        setFlash({
          type: "success",
          message: "Plagiarism Type Edited Successfully",
        });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setShowPopup(false);
      setIsLoading(false);
    }
  }
  return (
    <div className={`${styles.benefit} ${enableEdit && styles.editMode}`}>
      {enableEdit && showPopup && (
        <form onSubmit={handleEditBenefit}>
          <Popup
            title="Edit Benefit"
            closePopup={() => setShowPopup(false)}
            isLoading={isLoading}
          >
            <ImageInput isIcon name="icon" defaultValue={benefit?.icon} />
            <TextInput
              name="title"
              label="Title"
              placeholder="Enter Title Here"
              defaultValue={benefit?.title}
            />
            <CustomTextarea
              name="description"
              label="Description"
              defaultValue={benefit?.description}
            />
          </Popup>
        </form>
      )}
      <img
        className={styles.icon}
        src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/${benefit?.icon}`}
        alt={benefit?.title}
      />
      <h2>{benefit?.title}</h2>
      <p>{benefit?.description}</p>
      {enableEdit && (
        <Button primary onClick={() => setShowPopup(true)}>
          <img src="/edit-2.png" alt="" />
          <p>Edit</p>
        </Button>
      )}
    </div>
  );
}

export default connect(null, { setFlash })(BenefitItem);
