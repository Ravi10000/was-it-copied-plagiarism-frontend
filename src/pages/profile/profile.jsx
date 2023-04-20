import styles from "./profile.module.scss";

// packages
import { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useForm } from "react-hook-form";

// components
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";

// redux selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";

// redux actions
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

// api calls
import { updateUserDetails } from "../../api/users";

function ProfilPage({ currentUser, setCurrentUser, setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [popupType, setPopupType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function closePopup() {
    setPopupType(null);
  }

  async function handleUpdateUser(data) {
    setIsLoading(true);
    try {
      const response = await updateUserDetails(data);
      console.log({ response });
      if (response.data.status === "success") {
        setCurrentUser(response.data.user);
        setFlash({
          type: "success",
          message: "User details updated successfully",
        });
        closePopup();
      }
    } catch (err) {
      setFlash({
        type: "error",
        message: err.response?.data?.message || "Something went wrong",
      });
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className={styles.profilePage}>
      <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
        {popupType === "editEmail" && (
          <Popup
            isLoading={isLoading}
            title="Edit Email"
            closePopup={closePopup}
            save="verify"
          >
            <TextInput
              // name="email"
              type="email"
              label="Email Id"
              defaultValue={currentUser?.email}
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
            <p className={styles.msg}>
              Changing your email will change your login.
            </p>
          </Popup>
        )}
        {popupType === "editName" && (
          <Popup
            isLoading={isLoading}
            title="Edit Name"
            closePopup={closePopup}
          >
            <TextInput
              defaultValue={currentUser?.fname}
              label="First Name"
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
              defaultValue={currentUser?.lname}
              label="Last Name"
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
          </Popup>
        )}
        {popupType === "editPassword" && (
          <Popup
            isLoading={isLoading}
            title="Edit Password"
            save="Change Password"
            closePopup={closePopup}
          >
            <TextInput
              type="password"
              label="Password"
              error={errors?.password?.message}
              register={{
                ...register("password", {
                  required: "Enter password",
                }),
              }}
            />
            <TextInput
              type="password"
              label="Confirm Password"
              error={errors?.confirmPassword?.message}
              register={{
                ...register("confirmPassword", {
                  required: "Confirm your password ",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }),
              }}
            />
          </Popup>
        )}
      </form>
      <div className={styles.profileDetails}>
        <h2 className={styles.heading}>My Account</h2>
        <div className={styles.entry}>
          <p>Email: </p>
          <p>{currentUser?.email}</p>
          <img
            className={styles.editIcon}
            src="/edit-gradient.png"
            alt="edit"
            onClick={() => {
              setPopupType("editEmail");
            }}
          />
        </div>
        <div className={styles.entry}>
          <p>First Name: </p>
          <p>{currentUser?.fname}</p>
          <img
            className={styles.editIcon}
            src="/edit-gradient.png"
            alt="edit"
            onClick={() => {
              setPopupType("editName");
            }}
          />
        </div>
        <div className={styles.entry}>
          <p>Last Name: </p>
          <p>{currentUser?.lname}</p>
          <img
            className={styles.editIcon}
            src="/edit-gradient.png"
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
            src="/edit-gradient.png"
            alt="edit"
            onClick={() => {
              setPopupType("editPassword");
            }}
          />
        </div>
        <button className="__imgBtn">
          <img src="/company-details.png" alt="details" />
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, { setCurrentUser, setFlash })(
  ProfilPage
);
