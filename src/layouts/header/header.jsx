import styles from "./header.module.scss";
// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";
import Backdrop from "../../components/backdrop/backdrop";
import NavItem from "../../components/nav-item/nav-item";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/primary.svg" alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          <p>Plagiarism Checker</p>
          <p>Pricing</p>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
          <Button primary>Get Started</Button>
        </div>
        <img
          className={styles.toggle}
          src={isMenuOpen ? "/close.png" : "/menu-dark-64.png"}
          alt="menu"
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
        />
        {isMenuOpen && (
          <Backdrop>
            <nav className={styles.nav}>
              <div className={styles.navHead}>
                <h3>Plagiarism Checker</h3>
                <img
                  className={styles.closeMenu}
                  src="/close.png"
                  alt="menu"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div className={styles.navItemsContainer}>
                <NavItem
                  name="For Student"
                  info="for students"
                  imgUrl="/student.png"
                />
                <NavItem
                  name="For School"
                  info="for schools"
                  imgUrl="teachers.png"
                />
                <NavItem name="For Copywriters" imgUrl="copywrite.png" />
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
                <Button primary>Get Started</Button>
              </div>
            </nav>
          </Backdrop>
        )}
      </div>
    </header>
  );
}

export default Header;
