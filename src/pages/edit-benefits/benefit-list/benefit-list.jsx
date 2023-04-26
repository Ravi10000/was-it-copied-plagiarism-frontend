import styles from "./benefit-list.module.scss";

import BenefitItem from "../benefit-item/benefit-item";
import { fetchAllBenefits } from "../../../api/benefits";
import { useEffect, useState } from "react";

function BenefitList({ enableEdit }) {
  const [benefits, setBenefits] = useState([]);

  async function handleFetchBenefits() {
    try {
      const res = await fetchAllBenefits();
      if (res?.data?.status === "success") {
        setBenefits(res?.data?.benefits);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchBenefits();
  }, []);
  return (
    <section
      className={`${styles.benefitsContainer} ${enableEdit && styles.editMode}`}
    >
      {!enableEdit && (
        <div className={styles.benefit}>
          <h2 className="__sectionTitle">
            Plagiarism Checker <span>Benefits</span>
          </h2>
          <p>
            Whether producing original content or verifying that of others,
            there's a lot to gain from using a plagiarism checker. Accurate,
            automatic detection of duplicate content facilitates the
            copy-checking process for teachers, students, content writers, and
            more. Results showing the exact percentage of plagiarized content
            allows users to see exactly how much text has been copied and where
            they need to re-word.
          </p>
        </div>
      )}
      <div className={styles.benfitForUsers}>
        {benefits?.map((benefit) => (
          <BenefitItem
            key={benefit?._id}
            benefit={benefit}
            enableEdit={enableEdit}
            fetchBenefits={handleFetchBenefits}
          />
        ))}
      </div>
    </section>
  );
}

export default BenefitList;
