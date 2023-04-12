import styles from "./plagiarism-checker.module.scss";
// components
import Button from "../../components/button/button";
import LongTextInput from "../../components/long-text-input/long-text-input";

function PlagiarismChecker() {
  return (
    <div className={styles.plagiarismChecker}>
      <section className={styles.topSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>Plagiarism Checker by Quetext</h1>
          <p className={styles.subtitle}>
            Quetext's plagiarism checker detects plagiarism in your text, checks
            for other writing issues, and helps you build citations
          </p>
          <LongTextInput />
          <Button lg color="#fe5b60">
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
            <img src="/process.png" alt="" />
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
            <img src="/process.png" alt="" />
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
            <img src="/process.png" alt="" />
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
    </div>
  );
}

export default PlagiarismChecker;
