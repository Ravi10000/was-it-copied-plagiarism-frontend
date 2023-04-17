import styles from "./signup.module.scss";

// packages
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

// components
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";

// api calls
import { signup } from "../../api/users";
import { setFlash } from "../../redux/flash/flash.actions";
import { setCurrentUser } from "../../redux/user/user.actions";

function SignupPage({ setFlash, setCurrentUser }) {
  // const {
  //   state: { formData },
  // } = useLocation();

  // console.log({ formData });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // {
  //   defaultValues: {
  //     fname: formData?.fname || "",
  //     lname: formData?.lname || "",
  //     email: formData?.email || "",
  //   },
  // }
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(formData) {
    try {
      setDisableButton(true);
      const response = await signup(formData);
      console.log({ response });
      if (response.data.status === "user exist") {
        return setFlash({
          type: "warning",
          message: "User already exists, try logging in",
        });
      }
      if (response.data.status === "success") {
        navigate("/verify-email", {
          state: { email: formData?.email },
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className={styles.signupPage}>
      <section className={styles.loginSection}>
        <h2 className={styles.formTitle}>Create Account</h2>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(handleSignup)}
          noValidate
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
          <Button primary disabled={disableButton}>
            Signup
          </Button>
        </form>
        <p className={styles.loginLink} onClick={() => navigate("/login")}>
          Already have an account? <span>Login</span>
        </p>
      </section>
    </div>
  );
}

export default connect(null, { setFlash, setCurrentUser })(SignupPage);
