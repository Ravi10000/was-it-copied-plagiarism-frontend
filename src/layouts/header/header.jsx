import styles from "./header.module.scss";
// packages
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";
import Backdrop from "../../components/backdrop/backdrop";
import NavItem from "../../components/nav-item/nav-item";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef();

  useEffect(() => {
    function handleMouseDowm(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDowm);
    return () => {
      document.removeEventListener("mousedown", handleMouseDowm);
    };
  }, [navRef]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/primary.svg" alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          <div
            className={styles.navItemWithOptions}
            onClick={() => navigate("/plagiarism-checker")}
          >
            <p>Plagiarism Checker</p>
            <div className={styles.options}>
              <NavItem
                name="For Student"
                info="Cite Your Sources"
                imgUrl="/student.png"
              />
              <NavItem
                name="For School"
                info="Empower Yourself"
                imgUrl="/teachers.png"
              />
              <NavItem name="For Copywriters" imgUrl="copywrite.png" />
            </div>
          </div>
          <div
            className={styles.navItemWithOptions}
            onClick={() => navigate("/")}
          >
            <>Company</>
            <div className={styles.options}>
              <NavItem name="About Us" imgUrl="/teachers.png" />
            </div>
          </div>
          <div
            className={styles.navItemWithOptions}
            onClick={() => navigate("/pricing")}
          >
            <p>Pricing</p>
          </div>
          <div
            className={styles.navItemWithOptions}
            onClick={() => navigate("/")}
          >
            <p>Product</p>
            <div className={styles.options}>
              <NavItem name="Deep Search" imgUrl="/copywrite.png" />
              <NavItem name="Citation Generator" imgUrl="/citation.png" />
            </div>
          </div>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
          <Button primary onClick={() => navigate("/signup")}>
            Get Started
          </Button>
        </div>
        <img
          className={styles.toggle}
          src={isMenuOpen ? "/close.png" : "/menu-dark-64.png"}
          alt="menu"
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
        />
        {isMenuOpen && (
          <Backdrop>
            <nav className={styles.nav} ref={navRef}>
              <div className={styles.navHead}>
                {/* <h3>Plagiarism Checker</h3> */}
                <img
                  className={styles.closeMenu}
                  src="/close.png"
                  alt="menu"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div className={styles.navItemsContainer}>
                <h3
                  className={styles.navListTitle}
                  onClick={() => {
                    navigate("/plagiarism-checker");
                    setIsMenuOpen(false);
                  }}
                >
                  Plagiarism Checker
                </h3>
                <NavItem
                  name="For Student"
                  info="for students"
                  imgUrl="/student.png"
                />
                <NavItem
                  name="For School"
                  info="for schools"
                  imgUrl="/teachers.png"
                />
                <NavItem name="For Copywriters" imgUrl="copywrite.png" />
              </div>
              <div className={styles.navItemsContainer}>
                <h3
                  className={styles.navListTitle}
                  onClick={() => {
                    navigate("/pricing");
                    setIsMenuOpen(false);
                  }}
                >
                  Pricing
                </h3>
                <NavItem name="Free Plan" imgUrl="/free.png" />
                <NavItem name="Premium Plan" imgUrl="/premium.png" />
                <NavItem name="Enterprise Plan" imgUrl="/enterprise.png" />
              </div>
              <div className={styles.navItemsContainer}>
                <h3 className={styles.navListTitle}>Company</h3>
                <NavItem
                  name="About Us"
                  // info=""
                  imgUrl="/teachers.png"
                />
              </div>
              <div className={styles.navItemsContainer}>
                <h3 className={styles.navListTitle}>Product</h3>
                <NavItem name="Deep Search" imgUrl="/copywrite.png" />
                <NavItem name="Citation Generator" imgUrl="/citation.png" />
              </div>
              <div className={styles.headerButtons}>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Log in
                </Button>
                <Button primary onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </div>
            </nav>
          </Backdrop>
        )}
      </div>
    </header>
  );
}

export default Header;
