import styles from "./post-login.module.scss";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import postLoginPages from "./post-login-options";

// pages
import DetailsPage from "../details/details";
import SearchPage from "../search/search";
import Sidebar from "../../components/sidebar/sidebar";
import AccountPage from "../account/account";

// custom hooks
import { useSelectedPage } from "../../contexts/selectedPageContext";

function PostLoginPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { page } = useParams();

  const { selectedPage, setSelectedPage } = useSelectedPage(page);
  console.log({ selectedPage });
  useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  return (
    <div className={styles.postLoginPage}>
      <div className={styles.toggleSideBar}>
        <img
          onClick={() => setIsSidebarOpen((prevState) => !prevState)}
          src={isSidebarOpen ? "/close-2-dark.png" : "/menu-dark-64.png"}
          alt="menu"
        />
      </div>
      {/* {isSidebarOpen && <Sidebar />} */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        selectedOption={selectedPage}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={styles.page}>
        {selectedPage === "search" && <SearchPage />}
        {selectedPage === "details" && <DetailsPage />}
        {selectedPage === "account" && <AccountPage />}
      </div>
    </div>
  );
}

export default PostLoginPage;
