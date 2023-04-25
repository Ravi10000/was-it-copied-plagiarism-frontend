import styles from "./admin-record.module.scss";
import Popup from "../../../components/popup/popup";
import { useState } from "react";
import TextInput from "../../../components/text-input/text-input";
import { updateAdminDetails, deleteUser } from "../../../api/users";

function AdminRecord({ user, handleFetchUsers }) {
  const [showPopup, setShowPopup] = useState(false);
  const joinedOn = new Date(user?.createdAt).toDateString();
  console.log({ user });

  async function handleUpdateAdmin(e) {
    console.log("update admin");
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await updateAdminDetails(user?._id, formData);
    console.log({ response });
    if (response.data.status === "success") {
      handleFetchUsers();
      setShowPopup(false);
    }
  }
  async function handleDeleteUser() {
    const response = await deleteUser(user?._id);
    console.log({ response });
    if (response.data.status === "success") {
      handleFetchUsers();
    }
  }
  return (
    <>
      {showPopup && (
        <form onSubmit={handleUpdateAdmin}>
          <Popup
            title="Edit Admin"
            closePopup={() => setShowPopup(false)}
            // handleSave={handleUpdateAdmin}
          >
            <TextInput
              name="fname"
              label="First Name"
              placeholder="Enter First Name"
              defaultValue={user?.fname}
            />
            <TextInput
              name="lname"
              label="Last Name"
              placeholder="Enter Last Name"
              defaultValue={user?.lname}
            />
            <TextInput
              type="email"
              name="email"
              label="Email Id"
              placeholder="Enter Email Id"
              defaultValue={user?.email}
            />
            <TextInput
              // type="password"
              required={false}
              name="password"
              label="Password"
              placeholder="Change Password"
              defaultValue={user?.password}
            />
            <TextInput
              // type="password"
              required={false}
              name="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              defaultValue={user?.password}
            />
          </Popup>
        </form>
      )}
      <div key={user?._id} className={styles.record}>
        <div>{user?.fname + " " + user?.lname}</div>
        <div>{user?.email}</div>
        <div>{joinedOn}</div>
        <div className={styles.small}>
          <button
            className={styles.btn + " " + styles.edit}
            onClick={() => setShowPopup(true)}
          >
            <img src="/edit-2.png" alt="" />
          </button>
          <button
            className={styles.btn + " " + styles.delete}
            onClick={handleDeleteUser}
          >
            <img src="/delete.png" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminRecord;
