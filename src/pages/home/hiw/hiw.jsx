import styles from "./hiw.module.scss";
import { useState, useEffect } from "react";
import { getHowItWorks } from "../../../api/howItWorks";
import ProcessEditable from "../../how-it-works/process-editable/process-editable";

function HIW() {
  const [howItWorks, setHowItWorks] = useState([]);
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
  useEffect(() => {
    fetchHowItWorks();
  }, []);
  return (
    <section className={styles.howItWorks}>
      <h2 className="__sectionTitle">
        Free Plagiarism Checker: <span>How It Works</span>
      </h2>
      <div className={styles.processContainer}>
        {howItWorks?.map((item) => (
          <ProcessEditable noEdit item={item} key={item?._id} />
        ))}
      </div>
    </section>
  );
}

export default HIW;
