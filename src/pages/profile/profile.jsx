import styles from "./profile.module.scss";

// packages
import { useState } from "react";

// components
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";

const user = {
  fname: "Ravi",
  lname: "Sharma",
  email: "ravisince2k@gmail.com",
};

function ProfilPage() {
  const [popupType, setPopupType] = useState(null);

  function closePopup() {
    setPopupType(null);
  }
  return (
    <section className={styles.profilePage}>
      {popupType === "editEmail" && (
        <Popup title="Edit Email" closePopup={closePopup} save="verify">
          <TextInput type="email" defaultValue={user?.email} label="Email Id" />
          <p className={styles.msg}>
            Changing your email will change your login.
          </p>
        </Popup>
      )}
      {popupType === "editName" && (
        <Popup title="Edit Name" closePopup={closePopup}>
          <TextInput defaultValue={user?.fname} label="First Name" />
          <TextInput defaultValue={user?.lname} label="Last Name" />
        </Popup>
      )}
      {popupType === "editPassword" && (
        <Popup
          title="Edit Password"
          save="Change Password"
          closePopup={closePopup}
        >
          <TextInput type="password" label="Password" />
          <TextInput type="password" label="Confirm Password" />
        </Popup>
      )}
      <div className={styles.profileDetails}>
        <h2 className={styles.heading}>My Account</h2>
        <div className={styles.entry}>
          <p>Email: </p>
          <p>{user?.email}</p>
          <img
            className={styles.editIcon}
            src="/edit.png"
            alt="edit"
            onClick={() => {
              setPopupType("editEmail");
            }}
          />
        </div>
        <div className={styles.entry}>
          <p>First Name: </p>
          <p>{user?.fname}</p>
          <img
            className={styles.editIcon}
            src="/edit.png"
            alt="edit"
            onClick={() => {
              setPopupType("editName");
            }}
          />
        </div>
        <div className={styles.entry}>
          <p>Last Name: </p>
          <p>{user?.lname}</p>
          <img
            className={styles.editIcon}
            src="/edit.png"
            alt="edit"
            onClick={() => {
              setPopupType("editName");
            }}
          />
        </div>
        <div className={styles.entry}>
          <p>Password: </p>
          <p>..........</p>
          <img
            className={styles.editIcon}
            src="/edit.png"
            alt="edit"
            onClick={() => {
              setPopupType("editPassword");
            }}
          />
        </div>
        <button className="__btn">
          <img src="/details.png" alt="details" />
          <p>Invoce/Company Details</p>
        </button>
      </div>
      <div className={styles.archiveAccount}>
        <h2 className={styles.heading}>Archive Account</h2>
        <Button color="#f0ad4e">Archive Account</Button>
      </div>
    </section>
  );
}

export default ProfilPage;
