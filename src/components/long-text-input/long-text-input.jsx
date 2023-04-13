import styles from "./long-text-input.module.scss";
import React, { useEffect, useId, useState, useRef } from "react";

export default function LongTextInput({
  label,
  value,
  setValue,
  placeholder,
  lg,
  bg,
  ...otherProps
}) {
  const id = useId();

  const placeholderRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    if (value) {
      placeholderRef.current.style.display = "none";
    } else {
      placeholderRef.current.style.display = "block";
    }
  }, [value]);

  return (
    <div className={styles["long-text-input"]}>
      <label htmlFor={id}>{label}</label>
      <textarea
        ref={inputRef}
        required
        id={id}
        className={`${styles["text-input"]} ${lg && styles.lg}`}
        style={{ background: bg || "" }}
        {...otherProps}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div className={styles.placeholderText} ref={placeholderRef}>
        <p>Enter Your Text Here</p>
        <p>and click the button below to check for plagiarism</p>
      </div>
    </div>
  );
}
