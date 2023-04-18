import styles from "./signout.module.scss";

// packages
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// components
import Button from "../../components/button/button";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";
import { setCurrentUser } from "../../redux/user/user.actions";

function SignoutPage({ setCurrentUser, setFlash }) {
  const navigate = useNavigate();
  function handleSignout() {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    setFlash({
      type: "success",
      message: "Signout Successful",
    });
    navigate("/");
  }
  return (
    <section className={styles.signoutPage}>
      <div className={styles.signoutCard}>
        <h2>Are you sure, you want to sign out?</h2>
        <div className={styles.buttonsContainer}>
          <Button color="#F72525" onClick={handleSignout}>
            Sign out
          </Button>
          <button
            className={styles.outlined}
            onClick={() => navigate("/search")}
          >
            cancel
          </button>
        </div>
      </div>
    </section>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignoutPage);
