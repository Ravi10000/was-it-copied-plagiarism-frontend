import styles from "./signout.module.scss";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function SignoutPage() {
  const navigate = useNavigate();
  return (
    <section className={styles.signoutPage}>
      <div className={styles.signoutCard}>
        <h2>Are you sure, you want to sign out?</h2>
        <div className={styles.buttonsContainer}>
          <Button color="tomato">Sign out</Button>
          <Button secondary onClick={() => navigate("/")}>
            cancel
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SignoutPage;
