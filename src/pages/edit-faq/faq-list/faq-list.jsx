import styles from "./faq-list.module.scss";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { fetchAllFaqs } from "../../../api/faq";
import FaqItem from "../faq-item/faq-item";

const FaqList = forwardRef(({ enableEdit }, ref) => {
  const [faqs, setFaqs] = useState([]);

  async function handleFetchFaqs() {
    try {
      const res = await fetchAllFaqs();
      // console.log({ res });
      if (res.data.status === "success") {
        setFaqs(res.data.faqs);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useImperativeHandle(ref, () => ({
    fetchFaqs: handleFetchFaqs,
  }));

  useEffect(() => {
    handleFetchFaqs();
  }, []);
  return (
    <section
      className={`${styles.faqsSection} ${enableEdit ? styles.editMode : ""}`}
    >
      {!enableEdit && (
        <h3 className="__sectionTitle">
          Plagiarism <span>FAQs</span>
        </h3>
      )}
      {faqs?.map((faq) => (
        <FaqItem
          faq={faq}
          key={faq?._id}
          enableEdit={enableEdit}
          fetchFaqs={handleFetchFaqs}
        />
      ))}
    </section>
  );
});

export default FaqList;
