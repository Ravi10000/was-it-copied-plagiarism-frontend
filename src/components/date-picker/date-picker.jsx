import { useId } from "react";
import styles from "./date-picker.module.scss";

function DatePicker({ label, error, register, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.datePicker}>
        <label htmlFor={id}>{label}:</label>
        <div className={styles.customDatePicker}>
          <input
            type="date"
            className={styles.date}
            {...register}
            {...otherProps}
            id={id}
          />
          <img src="/custom-icons/calender.png" alt="" />
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default DatePicker;
