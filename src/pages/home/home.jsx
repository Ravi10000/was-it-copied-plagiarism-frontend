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
      <section className={styles.benefitsContainer}>
        <div className={styles.benefit}>
          <h2 className="__sectionTitle">
            Plagiarism Checker <span>Benefits</span>
          </h2>
          <p>
            Whether producing original content or verifying that of others,
            there's a lot to gain from using a plagiarism checker. Accurate,
            automatic detection of duplicate content facilitates the
            copy-checking process for teachers, students, content writers, and
            more. Results showing the exact percentage of plagiarized content
            allows users to see exactly how much text has been copied and where
            they need to re-word.
          </p>
        </div>
        <div className={styles.benfitForUsers}>
          <div className={styles.benefit}>
            <img src="/online-education.png" alt="" />
            <h2>For Teachers</h2>
            <p>
              Before homework can be graded for quality, it must first be
              confirmed as original. Our easy-to-use tool arms teachers with a
              simple, effective way to verify and grade students’ work.
              Educators at all levels can benefit from ensuring academic
              integrity through a comprehensive plagiarism check.
            </p>
            <p>
              From K-12, all the way through higher education, teachers are
              faced with the task of verifying the originality of the work of
              dozens, if not hundreds, of students each year. Automating this
              process frees teachers up to focus on the quality of work, rather
              than be bogged down by its originality.
            </p>
          </div>
          <div className={styles.benefit}>
            <img src="/study-group.png" alt="" />
            <h2>For Students</h2>
            <p>
              While the prevalence of academic plagiarism is on the rise, much
              of it is arguably unintentional. A simple, yet accurate and
              comprehensive, plagiarism checker offers students peace of mind
              when submitting written content for grading.
            </p>
            <p>
              It is much easier to do a quick check for potential plagiarism
              before submission rather than convince a teacher after the fact
              that your academic integrity is not in question. And Quetext even
              takes checking for plagiarism a step further, helping students
              identify and cite the source itself with our built-in citation
              generator.
            </p>
          </div>
          <div className={styles.benefit}>
            <img src="/copywriter.png" alt="" />
            <h2>For Copywriters</h2>
            <p>
              Plagiarism risk is not restricted to academia. Anyone tasked with
              writing for an individual or business has an ethical and legal
              responsibility to produce original content. On top of that,
              content writers are often tasked with producing content on topics
              outside of their wheelhouse, leaving them reliant on the work of
              others for their research.
            </p>
            <p>
              Our plagiarism checker gives content writers a quick and easy
              method to prevent copyright infringement. Checking even lengthy
              pieces of writing takes only a few minutes, keeping companies'
              public content in check and writers' integrity intact.
            </p>
          </div>
        </div>
      </section>
      <FaqList />
      {/* <section className={styles.faqsSection}>
        <h3 className="__sectionTitle">
          Plagiarism <span>FAQs</span>
        </h3>
        <div className={styles.faq}>
          <h5 className="__sectionSubHeading">
            What is the pricing for Quetext?
          </h5>
          <p className="__text">
            Quetext has both a free and a paid plan, depending on what your
            needs are. The free plan is a great place to start, as it comes with
            plagiarism checks on 1 page (500 words), ColorGrade™ feedback,
            contextual analysis, fuzzy matching, and conditional scoring. But
            for just $14.99 a month, you get so much more: 200 pages (100,000
            words) that can go through the plagiarism checker, DeepSearch™
            Extended, Citation Assistant, a downloadable originality report,
            custom URL exclusion, interactive snippet text, and premium support.
            You can learn more and get started on our Quetext Pricing page.
          </p>
        </div>
        <div className={styles.faq}>
          <h5 className="__sectionSubHeading">How effective is Quetext?</h5>
          <p className="__text">
            Quetext is extremely effective for writers who need to verify their
            content's originality. Not only does the plagiarism checker quickly
            and accurately identify any and all instances of plagiarized
            writing, but it also generates citations where necessary, right on
            the spot. It can be easy to lose track of sources, and Quetext is
            there to help writers stay on top of them without creating extra
            work.
          </p>
        </div>
        <div className={styles.faq}>
          <h5 className="__sectionSubHeading">Is Quetext reliable?</h5>
          <p className="__text">
            Quetext is reliable, safe, and extremely effective for verifying
            original work with ease. Rigorous testing is involved with every
            update made to the product, and the comprehensive plagiarism score
            users receive is backed by billions of internet sources. Students,
            teachers, and content writers alike rely on Quetext for fast and
            accurate verification.
          </p>
        </div>
      </section> */}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
