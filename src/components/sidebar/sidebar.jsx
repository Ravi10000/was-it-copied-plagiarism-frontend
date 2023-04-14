import styles from "./sidebar.module.scss";

// packages
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// components
import SidebarOption from "../sidebar-option/sidebar-option";

// custom hooks
import { useSelectedPage } from "../../contexts/selectedPageContext";

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

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const { page } = useParams();
  const { selectedPage, setSelectedPage } = useSelectedPage(page);

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
        <img src="/app-icon.svg" alt="" />
        {/* <img src="/close-2.png" alt="" /> */}
      </div>
      <div className={styles.optionsContainer}>
        {options?.map((option) => (
          <SidebarOption
            key={option.name}
            icon={selectedPage !== option.name ? option.icon : option.iconDark}
            selected={selectedPage === option.name}
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

export default Sidebar;
