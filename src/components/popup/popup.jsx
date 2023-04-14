import styles from "./popup.module.scss";
import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";

import { useRef, useEffect } from "react";

function Popup({ title, save, cancel, children, closePopup }) {
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClosePopup(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    }
    addEventListener("mousedown", handleClosePopup);
    return () => {
      removeEventListener("mousedown", handleClosePopup);
    };
  }, [popupRef]);
  return (
    <Backdrop>
      <div className={styles.popup} ref={popupRef}>
        <div className={styles.popupHead}>
          <h4>{title}</h4>
          <img
            src="/close-2-dark.png"
            alt="close"
            onClick={() => closePopup()}
          />
        </div>
        <div className={styles.inputsContainer}>{children}</div>
        <div className={styles.btnContainer}>
          <Button primary>{save || "save"}</Button>
          <Button secondary onClick={() => closePopup()}>
            {cancel || "cancel"}
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}

export default Popup;
