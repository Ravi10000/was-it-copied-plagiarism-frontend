import styles from "./image-input.module.scss";
import React, { useState, useEffect } from "react";

export default function ImageInput({ label, defaultValue, ...otherProps }) {
  const [image, setImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);

  console.log({ image });
  console.log({ defaultImage });
  useEffect(() => {
    if (defaultValue) {
      setDefaultImage(defaultValue);
    }
  }, []);
  return (
    <div className={styles["upload-img"]}>
      <label>{label}</label>
      <div className={styles["upload-input"]}>
        {defaultImage ? (
          <img
            src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/${defaultImage}`}
            alt="image"
            onError={(e) => {
              e && (e.target.alt = "error loading " + label);
            }}
          />
        ) : (
          <img
            className={!image ? styles.imgIcon : ""}
            src={image || "/upload-image.png"}
            alt=""
          />
        )}
        {!image && !defaultImage && <p>Upload Image</p>}
        <input
          onChange={(e) => {
            setDefaultImage(null);
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
          className={styles["file-input"]}
          type="file"
          accept="image/*"
          {...otherProps}
        />
      </div>
    </div>
  );
}
