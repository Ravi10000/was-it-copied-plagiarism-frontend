import styles from "./home.module.scss";

// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import Button from "../../components/button/button";
import LongTextInput from "../../components/long-text-input/long-text-input";

// sections
import HIW from "./hiw/hiw";

// redux selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { getHowItWorks } from "../../api/howItWorks";
import PlagiarismTypes from "../plagiarism-types/plagiarism-types";
import FaqList from "../edit-faq/faq-list/faq-list";
import BenefitList from "../edit-benefits/benefit-list/benefit-list";

function HomePage({ currentUser }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <section className={styles.homeTopSection}>
        <div className={styles.content}>
          {/* <img className={styles.hover} src="/patchwork.png" alt="" /> */}
          <h1 className={styles.title}>
            Plagiarism <span>Checker</span>
          </h1>
          <p className={styles.subtitle}>
            Plagiarism checker detects plagiarism in your text, checks for other
            writing issues, and helps you build citations
          </p>
          <LongTextInput value={value} setValue={setValue} />
          <Button primary lg onClick={() => navigate("/search")}>
            Check For Plagiarism
          </Button>
        </div>
      </section>
      <HIW />
      <section className={styles.getStarted}>
        {/* <p className={styles.title}>GET STARTED</p> */}
        <h4 className={`__sectionTitle ${styles.title}`}>
          Try <span>Plagiarism checker</span> today!
        </h4>
        <p>
          Ready to stop wasting time with that old-school "plagiarism tool" from
          the 90's? Start using Quetext today for free!
        </p>
        {currentUser ? (
          <h2 className={styles.welcome}>
            Welcome <br />
            <span>
              {currentUser?.fname} {currentUser?.lname}
            </span>
          </h2>
        ) : (
          <Button gradient onClick={() => navigate("/signup")}>
            Signup Free!
          </Button>
        )}
      </section>
      <PlagiarismTypes />
      <BenefitList />
      <FaqList />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
