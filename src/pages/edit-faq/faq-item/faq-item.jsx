import styles from "./faq-item.module.scss";
import Button from "../../../components/button/button";
import { useState } from "react";
import Popup from "../../../components/popup/popup";
import TextInput from "../../../components/text-input/text-input";
import CustomTextarea from "../../../components/custom-textarea/custom-textarea";
import { editFaq, deleteFaq } from "../../../api/faq";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function FaqItem({ faq, enableEdit, fetchFaqs, setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function handleEditFaq(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }
    try {
      const response = await editFaq(faq._id, formData);
      console.log({ response });
      if (response.data.status === "success") {
        fetchFaqs();
        setFlash({
          type: "success",
          message: "FAQ Edited Successfully",
        });
      }
    } catch (err) {
      console.log(err.message);
      setFlash({
        type: "error",
        message: "Something went wrong, please try again later",
      });
    } finally {
      setIsLoading(false);
      setShowPopup(false);
    }
  }
  async function handleDeleteFaq() {
    try {
      const res = await deleteFaq(faq._id);
      console.log({ res });
      if (res.data.status === "success") {
        fetchFaqs();
        setFlash({
          type: "success",
          message: "FAQ Deleted Successfully",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className={`${styles.faq} ${enableEdit && styles.editMode}`}>
      {enableEdit && showPopup && (
        <form onSubmit={handleEditFaq}>
          <Popup
            title="Edit FAQ"
            closePopup={() => setShowPopup(false)}
            isLoading={isLoading}
          >
            <TextInput
              name="question"
              label="Question"
              placeholder="Enter Question Here"
              defaultValue={faq?.question}
            />
            <CustomTextarea
              name="answer"
              label="Answer"
              defaultValue={faq?.answer}
            />
          </Popup>
        </form>
      )}
      <h5 className="__sectionSubHeading">{faq?.question}</h5>
      <p className="__text">{faq?.answer}</p>
      {enableEdit && (
        <div className={styles.btnsContainer}>
          <Button primary onClick={() => setShowPopup(true)}>
            <img src="/edit-2.png" alt="" />
            <p>Edit</p>
          </Button>
          <Button danger onClick={handleDeleteFaq}>
            <img src="/delete.png" alt="" />
            <p>Delete</p>
          </Button>
        </div>
      )}
    </div>
  );
}
export default connect(null, { setFlash })(FaqItem);
