import styles from "./App.module.scss";

// packages
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// layouts
import Header from "./layouts/header/header";

// pages
import LoginPage from "./pages/login/login";
import HomePage from "./pages/home/home";
import SignupPage from "./pages/signup/signup";
import PricingPage from "./pages/pricing/pricing";
import PlagiarismChecker from "./pages/plagiarism-checker/plagiarism-checker";
import PostLoginPage from "./pages/post-login/post-login";


function App() {
  const { pathname } = useLocation();
  const headerRoutes = ["/login", "/signup", "/pricing", "/"];
  console.log({ pathname });
  return (
    <div className={styles.App}>
      {headerRoutes.includes(pathname) && <Header />}
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/pricing" element={<PricingPage />} />
        <Route exact path="/:page" element={<PostLoginPage />} />
        {/* <Route
          exact
          path="/plagiarism-checker"
          element={<PlagiarismChecker />}
        /> */}
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
