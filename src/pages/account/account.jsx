import styles from "./account.module.scss";

// packages
import React, { useState } from "react";

// components
import AccountSidebar from "./account-sidebar/account-sidebar";
import ProfilPage from "../profile/profile";
import SignoutPage from "../signout/signout";
import AddCardPage from "../add-card/add-card";
import DetailsPage from "../details/details";

function AccountPage() {
  const [selectedOption, setSelectedOption] = useState("account");
  return (
    <div className={styles.accountPage}>
      <AccountSidebar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <main className={styles.main}>
        {selectedOption === "account" && <ProfilPage />}
        {selectedOption === "Billing" && <AddCardPage />}
        {selectedOption === "sign out" && <SignoutPage />}
      </main>
    </div>
  );
}

export default AccountPage;
