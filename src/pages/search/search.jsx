import styles from "./search.module.scss";

// packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import LongTextInput from "../../components/long-text-input/long-text-input";
import Button from "../../components/button/button";
import { scanFile, scanText } from "../../api/scan";
import api from "../../api/index";

function SearchPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [textLoading, setTextLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleCheckPlagiarism() {
    setTextLoading(true);
    try {
      const res = await scanText(text);
      if (res.data.status === "success") {
        navigate(`/details/${res.data.scan._id}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTextLoading(false);
    }
  }
  async function submitFileForScan(e) {
    setFileLoading(true);
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await scanFile(formData, setProgress);
      // const res = await api.post("/scan/file", formData, {
      //   headers: {

      //   },
      //   onUploadProgress: (file) => {
      //     let percentCompleted = Math.round((file.loaded * 100) / file.total);
      //     console.log({ percentCompleted });
      //     setProgress(percentCompleted);
      //   },
      // });
      console.log({ res });
      if (res.data.status === "success") {
        navigate(`/details/${res.data.scan._id}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      e.target.value = null;
      setFileLoading(false);
    }
  }
  return (
    <div className={styles.searchPage}>
      <input type="text" placeholder="Report Title (optional)" />
      <LongTextInput
        lg
        bg="#fff"
        text={text}
        value={text}
        onChange={(e) => {
          console.log(e.target.value);
          setText(e.target.value);
        }}
      />
      <p>Text should be greater than 255 characters.</p>
      {/* {text?.length > 0 ? ( */}
      <Button
        primary
        disabled={text?.length < 255}
        isLoading={textLoading}
        onClick={() => {
          handleCheckPlagiarism();
        }}
      >
        Check Plagiarism
      </Button>
      {progress ? (
        <div className={styles.progressBarContainer}>
          {/* <div className={styles.progressDetails}> */}
          <p>uploading...</p>
          <div className={styles.progressBar}>
            <div
              className={styles.barInner}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{progress}%</p>
          {/* </div> */}
        </div>
      ) : (
        <button className={styles.uploadeBtn}>
          <img src="/upload-light.png" alt="upload" />
          <p>Search by Files</p>
          {fileLoading && <div className={styles.loader}></div>}
          <input
            className={styles.fileUpload}
            type="file"
            name="file"
            accept=".doc,.docx, .pdf, .txt"
            onChange={submitFileForScan}
          />
        </button>
      )}
    </div>
  );
}

export default SearchPage;
