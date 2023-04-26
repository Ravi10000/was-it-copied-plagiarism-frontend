import styles from "./how-it-works.module.scss";
import { useState, useEffect } from "react";
import { getHowItWorks } from "../../api/howItWorks";
import ProcessEditable from "./process-editable/process-editable";
// import Popup from "../../components/popup/popup";
// import Button from "../../components/button/button";
// import ImageInput from "../../components/image-input/image-input";
// import TextInput from "../../components/text-input/text-input";
// import { createHowItWorks } from "../../api/howItWorks";

function HowItWorksPage() {
  const [howItWorks, setHowItWorks] = useState([]);
  // const [showPopup, setShowPopup] = useState(false);

  async function fetchHowItWorks() {
    try {
      const response = await getHowItWorks();
      console.log({ response });
      if (response.data.status === "success")
        setHowItWorks(response.data.howItWorks);
    } catch (err) {
      console.log(err.message);
    }
  }

  // async function handleCreateHowItWorks(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   try {
  //     const response = await createHowItWorks(formData);
  //     console.log({ response });
  //     if (response.data.status === "success") {
  //       setShowPopup(false);
  //       fetchHowItWorks();
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  useEffect(() => {
    fetchHowItWorks();
  }, []);

  return (
    <div className={styles.howItWorksPage}>
      {/* {showPopup && (
        <form onSubmit={handleCreateHowItWorks}>
          <Popup
            title="Create How It Works Item"
            closePopup={() => setShowPopup(false)}
          >
            <ImageInput name="image" />
            <TextInput
              name="title"
              label="Title"
              placeholder="Enter Title Here"
            />
            <TextInput
              name="description"
              label="Description"
              placeholder="Enter Description here"
            />
          </Popup>
        </form>
      )} */}
      <div className={styles.head}>
        <h2 className="__sectionTitle">Edit How It Works Section</h2>
        {/* <Button primary onClick={() => setShowPopup(true)}>
          <img src="/plus.png" alt="add" />
          <p>Create New</p>
        </Button> */}
      </div>
      <div className={styles.processContainer}>
        {howItWorks?.map((item) => (
          <ProcessEditable item={item} key={item?._id} />
        ))}
      </div>
    </div>
  );
}

export default HowItWorksPage;
