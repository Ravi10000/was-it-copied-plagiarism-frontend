import styles from "./admin-record.module.scss";
import Popup from "../../../components/popup/popup";
import { useState } from "react";
import TextInput from "../../../components/text-input/text-input";
import { updateAdminDetails, deleteUser } from "../../../api/users";
import { useForm } from "react-hook-form";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AdminRecord({ user, handleFetchUsers, setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const joinedOn = new Date(user?.createdAt).toDateString();
  console.log({ user });

  async function handleUpdateAdmin(data) {
    setIsLoading(true);
    // e.preventDefault();
    // const formData = new FormData(e.target);
    try {
      const response = await updateAdminDetails(user?._id, data);
      console.log({ response });
      if (response.data.status === "success") {
        handleFetchUsers();
        setFlash({
          type: "success",
          message: "Admin details updated successfully",
        });
        setShowPopup(false);
      }
    } catch (err) {
      console.log({ err });
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function handleDeleteUser() {
    try {
      const response = await deleteUser(user?._id);
      console.log({ response });
      if (response.data.status === "success") {
        handleFetchUsers();
        setFlash({
          type: "success",
          message: "Admin deleted successfully",
        });
      }
    } catch (err) {
      console.log({ err });
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
    }
  }
  return (
    <>
      {showPopup && (
        <form onSubmit={handleSubmit(handleUpdateAdmin)}>
          <Popup
            isLoading={isLoading}
            title="Edit Admin"
            closePopup={() => setShowPopup(false)}
            // handleSave={handleUpdateAdmin}
          >
            <TextInput
              name="fname"
              label="First Name"
              placeholder="Enter First Name"
              defaultValue={user?.fname}
              error={errors?.fname?.message}
              register={{
                ...register("fname", {
                  required: "Enter First Name",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "only alphabets are allowed",
                  },
                }),
              }}
            />
            <TextInput
              name="lname"
              label="Last Name"
              placeholder="Enter Last Name"
              defaultValue={user?.lname}
              error={errors?.lname?.message}
              register={{
                ...register("lname", {
                  required: "Enter Last Name",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "only alphabets are allowed",
                  },
                }),
              }}
            />
            <TextInput
              type="email"
              name="email"
              label="Email Id"
              placeholder="Enter Email Id"
              defaultValue={user?.email}
              error={errors?.email?.message}
              register={{
                ...register("email", {
                  required: "Enter Email ",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Not a valid Email Id",
                  },
                }),
              }}
            />
            <TextInput
              // type="password"
              required={false}
              name="password"
              label="Password"
              placeholder="Change Password"
              defaultValue={user?.password}
              error={errors?.password?.message}
              register={{
                ...register("password"),
              }}
            />
            <TextInput
              // type="password"
              required={false}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              defaultValue={user?.password}
              error={errors?.confirmPassword?.message}
              register={{
                ...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }),
              }}
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

export default connect(null, { setFlash })(AdminRecord);
