import styles from "./App.module.scss";

// packages
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

// layouts
import Header from "./layouts/header/header";

// pages
import LoginPage from "./pages/login/login";
import HomePage from "./pages/home/home";
import SignupPage from "./pages/signup/signup";
import PricingPage from "./pages/pricing/pricing";
import PlagiarismChecker from "./pages/plagiarism-checker/plagiarism-checker";
import PostLoginPage from "./pages/post-login/post-login";

// components
import Flash from "./components/flash/flash";
import ProtectedRoute from "./components/protected-route/protected-route";

// redux selectors
import { selectFlash } from "./redux/flash/flash.selectors";
import { selectCurrentUser } from "./redux/user/user.selectors";

// redux actions
import { setCurrentUser } from "./redux/user/user.actions";

// api calls
import { checkAuth } from "./api/users";
import VerificationPage from "./pages/verification/verification";
import VerifiedPage from "./pages/verified/verified";

function App({ flash, setCurrentUser, currenUser }) {
  const { pathname } = useLocation();
  const headerRoutes = ["/login", "/signup", "/pricing", "/"];
  async function handleCheckAuth() {
    try {
      const response = await checkAuth();
      console.log({ response });
      if (response.data.status === "success") {
        setCurrentUser(response.data.user);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log({ authToken });
    if (!authToken) return;
    handleCheckAuth();
  }, []);

  return (
    <div className={styles.App}>
      {headerRoutes.includes(pathname) && <Header />}
      {flash && <Flash type={flash.type} message={flash.message} />}
      {/* { <Flash type={"success"} message={"This is a flash message"} />} */}
      <Routes>
        <Route
          exact
          path="/login"
          element={currenUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          exact
          path="/signup"
          element={currenUser ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route exact path="/pricing" element={<PricingPage />} />
        <Route exact path="/verify-email" element={<VerificationPage />} />
        <Route exact path="/verified" element={<VerifiedPage />} />
        <Route
          path="/:page"
          element={!currenUser ? <Navigate to="/login" /> : <PostLoginPage />}
        />
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

const mapStateToProps = createStructuredSelector({
  flash: selectFlash,
  currenUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
