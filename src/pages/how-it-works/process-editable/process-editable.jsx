import styles from "./process-editable.module.scss";
import Button from "../../../components/button/button";
import { useState } from "react";
import Popup from "../../../components/popup/popup";
import TextInput from "../../../components/text-input/text-input";
import ImageInput from "../../../components/image-input/image-input";
import { updateHowItWorks } from "../../../api/howItWorks";
import CustomTextarea from "../../../components/custom-textarea/custom-textarea";

function ProcessEditable({ item, noEdit }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateHowItWorks(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const response = await updateHowItWorks(item._id, formData);
      console.log({ response });
      if (response.data.status === "success") {
        setShowPopup(false);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={`${styles.process} ${!noEdit ? styles.darkTheme : ""}`}>
      {!noEdit && showPopup && (
        <form onSubmit={handleUpdateHowItWorks}>
          <Popup title="Edit Process" closePopup={() => setShowPopup(false)} isLoading={isLoading}>
            <ImageInput name="image" defaultValue={item?.image} />
            <TextInput
              name="title"
              label="Title"
              placeholder="Enter Title Here"
              defaultValue={item?.title}
            />
            {/* <TextInput
              name="description"
              label="Description"
              placeholder="Enter Description here"
              defaultValue={item?.description}
            /> */}
            <CustomTextarea
              name="description"
              label="Description"
              // placeholder="Enter Description here"
              defaultValue={item?.description}
            />
          </Popup>
        </form>
      )}
      <div className={styles.details}>
        <h3 className={"__sectionSubHeading " + styles.heading}>
          {item?.title}
        </h3>
        <p className={"__text " + styles.text}>{item?.description}</p>
        {!noEdit && (
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
      <img
        className={styles.image}
        src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/${item?.image}`}
        alt=""
      />
    </div>
  );
}

export default ProcessEditable;
