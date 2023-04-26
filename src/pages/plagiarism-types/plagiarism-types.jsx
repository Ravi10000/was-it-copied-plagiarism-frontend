import styles from "./plagiarism-types.module.scss";

import PlagiarismItem from "./plagiarism-item/plagiarism-item";
import { useState, useEffect } from "react";

import { fetchAllPlagiarismTypes } from "../../api/plagiarism-types";

function PlagiarismTypes({ enableEdit }) {
  const [plagiarismTypes, setPlagiarismTypes] = useState([]);

  async function fetchPlagiarismTypes() {
    try {
      const response = await fetchAllPlagiarismTypes();
      // console.log({ response });
      if (response.data.status === "success")
        setPlagiarismTypes(response.data.plagiarismTypes);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    fetchPlagiarismTypes();
  }, []);

  return (
    <section
      className={`${styles.typesOfPlagiarism} ${
        enableEdit ? styles.editMode : ""
      }`}
    >
      <div className={styles.typesHead}>
        {!enableEdit && (
          <h3 className="__sectionTitle">
            Types of <span>Plagiarism</span>
          </h3>
        )}
        {/* <p className="__text">
          It's important to understand that plagiarism expands far beyond just
          copying someone else's work word-for-word. There are several different
          types of plagiarism that should be avoided.
        </p> */}
      </div>
      <div className={styles.plagiarismItemContainer}>
        {plagiarismTypes?.map((item) => (
          <PlagiarismItem
            fetchPlagiarismTypes={fetchPlagiarismTypes}
            key={item?._id}
            item={item}
            enableEdit={enableEdit || false}
          />
        ))}
      </div>
    </section>
  );
}

export default PlagiarismTypes;
