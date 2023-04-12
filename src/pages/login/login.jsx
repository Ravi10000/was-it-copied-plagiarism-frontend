import styles from "./login.module.scss";
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.loginPage}>
      <section className={styles.loginSection}>
        <h2 className={styles.formTitle}>Account Login</h2>
        <form className={styles.loginForm}>
          <TextInput label="Email" type="email" placeholder="Enter Email Id" />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter Password"
          />
          <Button primary>Continue</Button>
        </form>
        <p className={styles.signupLink} onClick={() => navigate("/signup")}>
          Don't have an account? <span>Signup</span>
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
