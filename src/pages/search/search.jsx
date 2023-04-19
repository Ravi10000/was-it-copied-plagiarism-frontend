import styles from "./search.module.scss";

// packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import LongTextInput from "../../components/long-text-input/long-text-input";
import Button from "../../components/button/button";

function SearchPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  return (
    <div className={styles.searchPage}>
      <input type="text" placeholder="Report Title (optional)" />
      <LongTextInput value={value} setValue={setValue} lg bg="#fff" />
      {value?.length > 0 ? (
        <Button primary onClick={() => navigate("/details/id")}>
          Check Plagiarism
        </Button>
      ) : (
        <button className={styles.uploadeBtn}>
          <img src="/upload-light.png" alt="upload" />
          <p>Search by Files</p>
          <input className={styles.fileUpload} type="file" />
        </button>
      )}
    </div>
  );
}

export default SearchPage;
