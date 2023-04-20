import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../button/button";
import { createUser } from "../../api/users";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import Popup from "../popup/popup";
import TextInput from "../text-input/text-input";

function CreateUserComponent({ title, usertype, handleFetch, setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  async function handleUserCreation(data) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response = await createUser(usertype, formData);
      console.log({ response });
      if (response.data.status === "error") {
        setFlash({
          type: "error",
          message: response.data.message,
        });
      }
      if (response.data.status === "success") {
        await handleFetch();
        setPopup(false);
        setFlash({
          type: "success",
          message: `New  ${usertype} created successfully`,
        });
        reset();
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {popup && (
        <form onSubmit={handleSubmit(handleUserCreation)} noValidate>
          <Popup
            isLoading={isLoading}
            title="Create New Admin"
            closePopup={() => {
              setPopup(false);
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
      <Button secondary onClick={() => setPopup(true)}>
        <img src="/add-user-blue.png" alt="" />
        {title}
      </Button>
    </>
  );
}

export default connect(null, { setFlash })(CreateUserComponent);
