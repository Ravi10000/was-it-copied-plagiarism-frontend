import BenefitList from "./benefit-list/benefit-list";
import styles from "./edit-benefits.module.scss";

function EditBenefits() {
  return (
    <div className={styles.editBenefits}>
      <h2 className="__sectionTitle">Edit Plagiarism Benefits</h2>
      <BenefitList enableEdit/>
    </div>
  );
}

export default EditBenefits;
