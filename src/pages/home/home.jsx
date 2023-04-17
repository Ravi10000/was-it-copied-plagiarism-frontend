import styles from "./home.module.scss";

// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import Button from "../../components/button/button";
import LongTextInput from "../../components/long-text-input/long-text-input";

// redux selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";

function HomePage({ currentUser }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <div className={styles.homePage}>
      <section className={styles.homeTopSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>Plagiarism Checker by Quetext</h1>
          <p className={styles.subtitle}>
            Quetext's plagiarism checker detects plagiarism in your text, checks
            for other writing issues, and helps you build citations
          </p>
          <LongTextInput value={value} setValue={setValue} />
          <Button lg color="#fe5b60" onClick={() => navigate("/search")}>
            Check For Plagiarism
          </Button>
        </div>
      </section>
      <section className={styles.howItWorks}>
        <h2>Free Plagiarism Checker: How It Works</h2>
        <div className={styles.processContainer}>
          <div className={styles.process}>
            <div className={styles.details}>
              <h3>Enter text into plagiarism detection tool</h3>
              <p>
                We make it simple. Just copy and paste all content from your
                document into our plagiarism checker and hit the 'Check
                Plagiarism' button to get started.
              </p>
            </div>
            <img src="/process.png" alt="" />
          </div>
          <div className={styles.process}>
            <div className={styles.details}>
              <h3>Evaluate text for plagiarism</h3>
              <p>
                Our plagiarism detection tool uses DeepSearch™ Technology to
                identify any content throughout your document that might be
                plagiarized. We identify plagiarized content by running the text
                through three steps:
              </p>
              <ol>
                <li>Contextual Analysis</li>
                <li>Fuzzy Matching</li>
                <li>Conditional Scoring</li>
              </ol>
            </div>
            <img src="/evaluate.png" alt="" />
          </div>
          <div className={styles.process}>
            <div className={styles.details}>
              <h3>Accurate plagiarism results</h3>
              <p>
                After evaluating the text against billions of internet sources,
                you will be provided with a plagiarism score showing the
                percentage of text that is an exact or near-match to existing
                text online.
              </p>
            </div>
            <img src="/accurate.png" alt="" />
          </div>
          <div className={styles.process}>
            <div className={styles.details}>
              <h3>Resolve plagiarism risk and use citations</h3>
              <p>
                Our ColorGrade™ feedback feature highlights exact matches vs.
                near-exact or “fuzzy” matches with corresponding colors. From
                there, you can resolve plagiarism issues by deleting or altering
                the at-risk copy. Or, you can use our handy “Cite Source”
                feature to generate citations in MLA, APA, and Chicago formats
                and insert the citations directly into your document.
              </p>
            </div>
            <img src="/resolve.png" alt="" />
          </div>
        </div>
      </section>

      <section className={styles.getStarted}>
        <p className={styles.title}>GET STARTED</p>
        <h4>Try Quetext today!</h4>
        <p>
          Ready to stop wasting time with that old-school "plagiarism tool" from
          the 90's? Start using Quetext today for free!
        </p>
        {currentUser ? (
          <h2>
            Welcome <br /> {currentUser?.fname} {currentUser?.lname}
          </h2>
        ) : (
          <Button onClick={() => navigate("/signup")}>Signup Free!</Button>
        )}
      </section>

      <section className={styles.typesOfPlagiarism}>
        <div className={styles.typesHead}>
          <h3 className={styles.heading}>Types of Plagiarism</h3>
          <p>
            It's important to understand that plagiarism expands far beyond just
            copying someone else's work word-for-word. There are several
            different types of plagiarism that should be avoided.
          </p>
        </div>
        <div className={styles.plagiarismItemContainer}>
          <div className={styles.plagiarismItem}>
            <img src="/Icon_SelfPlagiarism.png" alt="" />
            <h4>Self-Plagiarism</h4>
            <p>
              Many believe that, as long as they produced the work at some point
              in the past, they can include it in future pieces. However, even
              if you were the original author, that original work must be cited
              in order to not be flagged as plagiarism.
            </p>
            <p>
              Treat your past self as a totally separate author; be sure to
              include all relevant citations and quotations, the same as you
              would for any other source.
            </p>
          </div>
          <div className={styles.plagiarismItem}>
            <img src="/Icon_PatchworkPlagiarism.png" alt="" />
            <h4>Patchwork Plagiarism</h4>
            <p>
              Patchwork plagiarism is the act of piecing together a "patchwork"
              of existing content to form something new. Assembling unoriginal
              content in this manner often involves some paraphrasing, with only
              slight changes.
            </p>
            <p>
              This type of plagiarism can be tricky and can certainly occur
              unintentionally, especially in academia. Since academic writing is
              largely based on the research of others, a well-meaning student
              can inadvertently end up plagiarizing.
            </p>
          </div>
          <div className={styles.plagiarismItem}>
            <img src="/Icon_MosaicPlagiarism.png" alt="" />
            <h4>Mosaic Plagiarism</h4>
            <p>
              Mosaic plagiarism is synonymous with patchwork plagiarism. It
              describes the process of loosely rearranging or restating
              another's work without issuing proper credit. It can occur
              accidentally or intentionally. For authors, mosaic plagiarism
              endangers their academic integrity or reputation as a writer. For
              those checking content originality, such as teachers, mosaic
              plagiarism can easily appear to be original content, which can
              make mosaic plagiarism especially difficult to detect manually.
            </p>
          </div>
          <div className={styles.plagiarismItem}>
            <img src="/Frame.png" alt="" />
            <h4>Accidental Plagiarism</h4>
            <p>
              Plagiarism doesn't have to be intentional to still be considered
              plagiarism — even in early academia, where students are just
              learning how to properly cite others' work. While there may be no
              ill intent from the student, most schools have policies explicitly
              treating accidental plagiarism the same as intentional plagiarism.
              Students are expected to know how to properly issue credit to
              other authors. Similarly, content writers risk damage to their
              reputation if they produce plagiarized content, regardless of
              intent.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.benefitsContainer}>
        <div className={styles.benefit}>
          <h2>Plagiarism Checker Benefits</h2>
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
            <img src="/teacher-icon.png" alt="" />
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
            <img src="/student-icon.png" alt="" />
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
            <img src="/contentWriters-icon.png" alt="" />
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
      <h3 className={styles.heading}>Plagiarism FAQs</h3>
      <section className={styles.faqsSection}>
        <div className={styles.faq}>
          <h5 className={styles.question}>What is the pricing for Quetext?</h5>
          <p className={styles.answer}>
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
          <h5 className={styles.question}>How effective is Quetext?</h5>
          <p className={styles.answer}>
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
          <h5 className={styles.question}>Is Quetext reliable?</h5>
          <p className={styles.answer}>
            Quetext is reliable, safe, and extremely effective for verifying
            original work with ease. Rigorous testing is involved with every
            update made to the product, and the comprehensive plagiarism score
            users receive is backed by billions of internet sources. Students,
            teachers, and content writers alike rely on Quetext for fast and
            accurate verification.
          </p>
        </div>
      </section>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
