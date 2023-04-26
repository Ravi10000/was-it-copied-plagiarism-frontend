import styles from "./edit-faq.module.scss";
import Button from "../../components/button/button";
import FaqList from "./faq-list/faq-list";
import Popup from "../../components/popup/popup";
import { useEffect, useState, useRef } from "react";
import TextInput from "../../components/text-input/text-input";
import CustomTextarea from "../../components/custom-textarea/custom-textarea";
import { createNewFaq } from "../../api/faq";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function EditFAQ({ setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  async function handleAddFaq(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    try {
      const response = await createNewFaq(formData);
      console.log({ response });
      if (response.data.status === "success") {
        ref.current.fetchFaqs(); // calling fetch faqs method from <FaqList/>
        setFlash({
          type: "success",
          message: "FAQ added successfully",
        });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
      setShowPopup(false);
    }
  }

  return (
    <section className={styles.editFaq}>
      {showPopup && (
        <form onSubmit={handleAddFaq}>
          <Popup title="Add New FAQ" closePopup={() => setShowPopup(false)}>
            <TextInput
              name="question"
              label="Question"
              placeholder="Enter question here"
            />
            <CustomTextarea name="answer" label="Answer" />
          </Popup>
        </form>
      )}
      <div className={styles.head}>
        <h2 className="__sectionTitle">Add & Edit FAQs</h2>
        <Button primary onClick={() => setShowPopup(true)}>
          <img src="/add.png" alt="" />
          <p>Add New FAQ</p>
        </Button>
      </div>
      <FaqList enableEdit ref={ref} />
    </section>
  );
}

export default connect(null, { setFlash })(EditFAQ);
