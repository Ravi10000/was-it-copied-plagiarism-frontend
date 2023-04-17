import { resendVerificationEmail } from "../../api/users";
import styles from "./verification.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function VerificationPage({ setFlash }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  async function requestVerificationEmail() {
    try {
      const res = await resendVerificationEmail(state?.email);
      console.log({ res });
      if (res.data.status === "success") {
        setFlash({
          type: "success",
          message: "Verification email sent successfully",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <section className={styles.verificationPage}>
      <div className={styles.content}>
        <img src="/verified.png" alt="" />
        <h2>Verify Your Email</h2>
        <p>
          We've sent an email to
          <span className={styles.highlightText}>
            {state?.email ? " " + state?.email + " " : " "}
          </span>
          verify your email address and verify your account. The link in the
          email will expire in 24hrs
        </p>
        <p className={styles.highlightText} onClick={requestVerificationEmail}>
          resend verification email
        </p>
        <p>
          if verified{" "}
          <span
            style={{ cursor: "pointer" }}
            className={styles.highlightText}
            onClick={() => navigate("/login")}
          >
            go to login
          </span>
        </p>
        {/* <p
          className={styles.highlightText}
          onClick={() =>
            navigate("/signup", {
              state: { formData: location?.state?.formData },
            })
          }
        >
          change your email address
        </p> */}
      </div>
    </section>
  );
}

export default connect(null, { setFlash })(VerificationPage);
