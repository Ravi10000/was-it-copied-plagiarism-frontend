import styles from "./plagiarism-item.module.scss";

import Button from "../../../components/button/button";
import { useState } from "react";
import { editPlagiarismType } from "../../../api/plagiarism-types";
import Popup from "../../../components/popup/popup";
import ImageInput from "../../../components/image-input/image-input";
import TextInput from "../../../components/text-input/text-input";
import CustomTextarea from "../../../components/custom-textarea/custom-textarea";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function PlagiarismItem({ item, enableEdit, fetchPlagiarismTypes, setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleEditType(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const response = await editPlagiarismType(item?._id, formData);
      console.log({ response });
      if (response.data.status === "success") {
        setShowPopup(false);
        fetchPlagiarismTypes();
        setFlash({
          type: "success",
          message: "Plagiarism Type Edited Successfully",
        });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`${styles.plagiarismItem} ${
        enableEdit ? styles.editMode : ""
      }`}
    >
      {enableEdit && showPopup && (
        <form onSubmit={handleEditType}>
          <Popup
            title="Edit Type"
            closePopup={() => setShowPopup(false)}
            isLoading={isLoading}
          >
            <ImageInput isIcon name="icon" defaultValue={item?.icon} />
            <TextInput
              name="title"
              label="Title"
              placeholder="Enter Title Here"
              defaultValue={item?.title}
            />
            <CustomTextarea
              name="description"
              label="Description"
              defaultValue={item?.description}
            />
          </Popup>
        </form>
      )}
      <img
        className={styles.icon}
        src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/${item?.icon}`}
        alt={item?.title}
      />
      <h4 className="__sectionSubHeading">{item?.title}</h4>
      <p>{item?.description}</p>
      {enableEdit && (
        <div className={styles.btnsContainer}>
          <Button primary onClick={() => setShowPopup(true)}>
            <img src="/edit-2.png" alt="" />
            <p>Edit</p>
          </Button>
          <Button danger>
            <img src="/delete.png" alt="" />
            <p>Delete</p>
          </Button>
        </div>
      )}
    </div>
  );
}

export default connect(null, { setFlash })(PlagiarismItem);
