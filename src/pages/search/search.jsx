import styles from "./search.module.scss";

// packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import LongTextInput from "../../components/long-text-input/long-text-input";
import Button from "../../components/button/button";
import { scanText } from "../../api/scan";

function SearchPage() {
  const [text, setText] = useState("");

  async function handleCheckPlagiarism() {
    try {
      console.log({ text });
      const res = await scanText(text);
      console.log({ res });
    } catch (err) {
      console.log(err);
    }
  }

  console.log({ text });
  const navigate = useNavigate();
  return (
    <div className={styles.searchPage}>
      <input type="text" placeholder="Report Title (optional)" />
      <LongTextInput
        // setValue={s}
        lg
        bg="#fff"
        text={text}
        value={text}
        onChange={(e) => {
          console.log(e.target.value);
          setText(e.target.value);
        }}
      />
      {/* {text?.length > 0 ? ( */}
      <Button
        primary
        onClick={() => {
          handleCheckPlagiarism();
          // navigate("/details/id");
        }}
      >
        Check Plagiarism
      </Button>
      {/* ) : ( */}
      <button className={styles.uploadeBtn}>
        <img src="/upload-light.png" alt="upload" />
        <p>Search by Files</p>
        <input className={styles.fileUpload} type="file" />
      </button>
      {/* )} */}
    </div>
  );
}

export default SearchPage;
