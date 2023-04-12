import styles from "./signup.module.scss";
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.signupPage}>
      <section className={styles.loginSection}>
        <h2 className={styles.formTitle}>Create Account</h2>
        <form className={styles.loginForm}>
          {/* <div className={styles.name}> */}
          <TextInput
            label="First Name"
            name="fname"
            placeholder="Enter First Name"
          />
          <TextInput
            label="Last Name"
            name="lname"
            placeholder="Enter Last Name"
          />
          {/* </div> */}

          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter Email Id"
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <TextInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <Button primary>Signup</Button>
        </form>
        <p className={styles.loginLink} onClick={() => navigate("/login")}>
          Already have an account? <span>Login</span>
        </p>
      </section>
    </div>
  );
}

export default SignupPage;
