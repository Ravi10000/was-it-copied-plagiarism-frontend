import styles from "./confirm.popup.module.scss";
import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";
import { useRef, useEffect } from "react";
function ConfirmPopup({ msg, handleConfirm, handleCancel }) {
  const popupRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef?.current && !popupRef?.current.contains(e.target)) {
        handleCancel();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  return (
    <Backdrop>
      <div className={styles.confirmPopup} ref={popupRef}>
        <h2 className={styles.title}>{msg || "Are you sure?"}</h2>
        <div className={styles.btnContainer}>
          <Button outlined onClick={handleCancel}>
            Cancel
          </Button>
          <Button danger onClick={handleConfirm}>
            Confirm Delete
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}

export default ConfirmPopup;
