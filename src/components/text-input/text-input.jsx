import styles from "./text-input.module.scss";

import React, { useId } from "react";

export default function TextInput({ label, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles["text-input"]}
        required
        {...otherProps}
      />
    </div>
  );
}
