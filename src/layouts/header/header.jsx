import styles from "./header.module.scss";
// packages
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import Button from "../../components/button/button";
import Backdrop from "../../components/backdrop/backdrop";
import NavItem from "../../components/nav-item/nav-item";

// redux selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";

function Header({ currentUser }) {
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

  function goTo(path) {
    navigate(path);
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* <img src="/logo-temp.svg" alt="logo" onClick={() => navigate("/")} /> */}
        <img
          src="/wic-logo-lg.png"
          alt="logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          <div
            className={styles.navItemWithOptions}
            onClick={() => navigate("/")}
          >
            <div className={styles.name}>
              <p>Plagiarism Checker</p>
              <img src="/arrow-down.png" alt="" />
            </div>
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
            <div className={styles.name}>
              <p>Company</p>
              <img src="/arrow-down.png" alt="" />
            </div>
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
          {!currentUser ? (
            <>
              <Button
                secondary
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/signup");
                }}
              >
                Sign up
              </Button>
            </>
          ) : (
            <Button secondary onClick={() => navigate("/account")}>
              <img src="/user-account.png" alt="" />
              {currentUser.email}
            </Button>
          )}
        </div>
        <img
          className={styles.toggle}
          src={isMenuOpen ? "/close-menu.png" : "/menus.png"}
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
                  src="/close-menu.png"
                  alt="menu"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div className={styles.navItemsContainer}>
                <h3
                  className={styles.navListTitle}
                  onClick={() => {
                    goTo("/");
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
                    goTo("/pricing");
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
              {/* <div className={styles.navItemsContainer}>
                <h3 className={styles.navListTitle}>Product</h3>
                <NavItem name="Deep Search" imgUrl="/copywrite.png" />
                <NavItem name="Citation Generator" imgUrl="/citation.png" />
              </div> */}
              <div className={styles.headerButtons}>
                {!currentUser ? (
                  <>
                    <Button
                      secondary
                      onClick={() => {
                        goTo("/signup");
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <Button secondary onClick={() => navigate("/account")}>
                    <img src="/user-account.png" alt="" />
                    {currentUser.email}
                  </Button>
                )}
              </div>
            </nav>
          </Backdrop>
        )}
      </div>
    </header>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
