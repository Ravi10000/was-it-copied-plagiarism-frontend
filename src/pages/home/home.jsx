import styles from "./home.module.scss";

// packages
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.homePage}>
      <section className={styles.homeTopSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Original Writing, Made Easy With Quetext
          </h1>
          <p className={styles.subtitle}>
            Quetext's plagiarism checker analyzes your text to identify
            plagiarism, resolve other writing issues, and build citations with
            ease. You wouldn't want to write without it.
          </p>
          <Button
            lg
            color="#fe5b60"
            onClick={() => navigate("/plagiarism-checker")}
          >
            Check For Plagiarism
          </Button>
        </div>
      </section>
      <section className={styles.getStarted}>
        <p className={styles.title}>GET STARTED</p>
        <h4>Try Quetext today!</h4>
        <p>
          Ready to stop wasting time with that old-school "plagiarism tool" from
          the 90's? Start using Quetext today for free!
        </p>
        <Button onClick={() => navigate("/signup")}>Signup Free!</Button>
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

export default HomePage;
