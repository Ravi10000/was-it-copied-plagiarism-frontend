import PlagiarismTypes from "../plagiarism-types/plagiarism-types";
import styles from "./edit-plagiarism-types.module.scss";

function EditPlagiarismTypes() {
  return (
    <section className={styles.editPlagiarismTypes}>
      <h2 className="__sectionTitle">Edit Plagiarism Types</h2>
      <PlagiarismTypes enableEdit />
    </section>
  );
}

export default EditPlagiarismTypes;
