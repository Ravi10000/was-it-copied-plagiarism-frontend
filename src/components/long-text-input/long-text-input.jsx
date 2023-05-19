import styles from "./long-text-input.module.scss";
import React, { useEffect, useId, useState, useRef } from "react";

export default function LongTextInput({
  label,
  placeholder,
  lg,
  bg,
  text,
  ...otherProps
}) {
  const id = useId();

  const placeholderRef = useRef();
  const inputRef = useRef();

  // console.log({ value });
  useEffect(() => {
    inputRef.current.focus();
    if (text) {
      placeholderRef.current.style.display = "none";
    } else {
      placeholderRef.current.style.display = "block";
    }
  }, [text]);

  return (
    <div className={styles["long-text-input"]}>
      <label htmlFor={id}>{label}</label>
      <textarea
        ref={inputRef}
        required
        id={id}
        className={`${styles["text-input"]} ${lg && styles.lg}`}
        {...otherProps}
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div className={styles.placeholderText} ref={placeholderRef}>
        <p>Enter Your Text Here</p>
        <p>and click the button below to check for plagiarism</p>
      </div>
    </div>
  );
}
