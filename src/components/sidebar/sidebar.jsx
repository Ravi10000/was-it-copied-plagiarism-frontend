import styles from "./sidebar.module.scss";

// packages
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createStructuredSelector } from "reselect";

// components
import SidebarOption from "../sidebar-option/sidebar-option";

// custom hooks
import { useSelectedPage } from "../../contexts/selectedPageContext";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";

const options = [
  {
    name: "search",
    icon: "/page-icons/search.png",
    iconDark: "/page-icons/search-dark.png",
  },
  {
    name: "details",
    icon: "/page-icons/file.png",
    iconDark: "/page-icons/file-dark.png",
  },
  {
    name: "account",
    icon: "/page-icons/account.png",
    iconDark: "/page-icons/account-dark.png",
  },
];
const adminOptions = [
  {
    name: "users",
    icon: "/page-icons/users.png",
    iconDark: "/page-icons/users-dark.png",
  },
  {
    name: "usage-history",
    icon: "/page-icons/history.png",
    iconDark: "/page-icons/history-dark.png",
  },
  {
    name: "admins",
    icon: "/page-icons/admin.png",
    iconDark: "/page-icons/admin-dark.png",
  },
  {
    name: "analysis",
    icon: "/page-icons/dashboard.png",
    iconDark: "/page-icons/dashboard-dark.png",
  },
  {
    name: "payments",
    icon: "/page-icons/card.png",
    iconDark: "/page-icons/card-dark.png",
  },
  {
    name: "manage-subscriptions",
    icon: "/page-icons/subscription.png",
    iconDark: "/page-icons/subscription-dark.png",
  },
  {
    name: "how-it-works",
    icon: "/page-icons/info.png",
    iconDark: "/page-icons/info-dark.png",
  },
  {
    name: "plagiarism-types",
    icon: "/page-icons/types.png",
    iconDark: "/page-icons/types-dark.png",
  },
  {
    name: "edit-faqs",
    icon: "/page-icons/faq-2.png",
    iconDark: "/page-icons/faq-2-dark.png",
  },
  {
    name: "edit-benefits",
    icon: "/page-icons/benefits.png",
    iconDark: "/page-icons/benefits-dark.png",
  },
];

function Sidebar({ isSidebarOpen, setIsSidebarOpen, currentUser }) {
  // console.log({ currentUser });
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const sidebarRef = useRef(null);
  const { pathname } = useLocation();
  // console.log({ pathname });
  const { selectedPage, setSelectedPage } = useSelectedPage(pathname);

  useEffect(() => {
    setSelectedPage(pathname);
  }, [pathname]);

  useEffect(() => {
    if (currentUser?.usertype === "ADMIN") setIsAdmin(true);
  }, [currentUser]);

  useEffect(() => {
    function handleMouseDown(e) {
      if (!sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    }
    addEventListener("mousedown", handleMouseDown);
    return () => {
      removeEventListener("mousedown", handleMouseDown);
    };
  }, [sidebarRef]);

  return (
    <section
      className={`${styles.sidebar} ${isSidebarOpen && styles.active}`}
      ref={sidebarRef}
    >
      <div className={styles.closeSidebar} onClick={() => navigate("/")}>
        {/* <img src="/logo-temp-2.svg" alt="" /> */}
        <img className={styles.logo} src="/wic-logo-sm.svg" alt="" />
      </div>
      <div className={styles.optionsContainer}>
        {options?.map((option) => (
          <SidebarOption
            key={option.name}
            name={option.name}
            icon={
              !selectedPage.includes(option.name)
                ? option.icon
                : option.iconDark
            }
            selected={selectedPage.includes(option.name)}
            onClick={() => {
              setIsSidebarOpen(false);
              // setSelectedPage(option.name);
              navigate(`/${option.name}`);
            }}
          />
        ))}
        <div className={styles.seperator}></div>
        {isAdmin &&
          adminOptions?.map((option) => (
            <SidebarOption
              key={option.name}
              name={option.name}
              icon={
                !selectedPage.includes(option.name)
                  ? option.icon
                  : option.iconDark
              }
              selected={selectedPage.includes(option.name)}
              onClick={() => {
                setIsSidebarOpen(false);
                // setSelectedPage(option.name);
                navigate(`/${option.name}`);
              }}
            />
          ))}
      </div>
    </section>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Sidebar);
