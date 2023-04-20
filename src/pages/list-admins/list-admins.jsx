import styles from "./list-admins.module.scss";
import { useEffect, useState } from "react";
import { fetchAllAdmins, createAdmin } from "../../api/users";
import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import { useForm } from "react-hook-form";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function ListAdminsPage({ setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [addPopup, setAddPopup] = useState(false);

  async function handleFetchUsers() {
    try {
      const response = await fetchAllAdmins();
      console.log({ response });
      if (response.data.status === "success") {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleAdminCreation(data) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response = await createAdmin(formData);
      console.log({ response });
      if (response.data.status === "error") {
        setFlash({
          type: "error",
          message: response.data.message,
        });
      }
      if (response.data.status === "success") {
        setUsers(response.data.users);
        setAddPopup(false);
        setFlash({
          type: "success",
          message: "New admin created successfully",
        });
        reset();
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchUsers();
  }, []);
  return (
    <section className={styles.allAdminsPage}>
      {addPopup && (
        <form onSubmit={handleSubmit(handleAdminCreation)} noValidate>
          <Popup
            isLoading={isLoading}
            title="Create New Admin"
            closePopup={() => {
              setAddPopup(false);
            }}
          >
            <TextInput
              label="First Name"
              placeholder="Enter First Name"
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
              label="Last Name"
              placeholder="Enter Last Name"
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
              label="Email"
              type="email"
              placeholder="Enter Email Id"
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
              label="Password"
              type="password"
              placeholder="Enter Password"
              error={errors?.password?.message}
              register={{
                ...register("password", {
                  required: "Enter password",
                }),
              }}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
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
        </form>
      )}
      <div className={styles.head}>
        <h2 className="__sectionTitle">All Admins</h2>
        <Button secondary onClick={() => setAddPopup(true)}>
          <img src="/add-user-blue.png" alt="" />
          Create New Admin
        </Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            {/* <th>Verification State</th> */}
            {/* <th>School Name</th> */}
            {/* <th>Subscription</th> */}
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => {
            const joinedOn = new Date(user?.createdAt).toDateString();
            return (
              <tr key={user?._id}>
                <td>{user?.fname + " " + user?.lname}</td>
                <td>{user?.email}</td>
                <td>{joinedOn}</td>
                {/* <td>{user?.isVerified ? "verified" : "not verified"}</td>
                <td>{user?.schoolName ? user?.schoolName : "unavailable"}</td>
                <td>
                  {user?.currentSubscriptionPlan
                    ? user?.currentSubscriptionPlan?.name
                    : "no plan selected"}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default connect(null, { setFlash })(ListAdminsPage);
