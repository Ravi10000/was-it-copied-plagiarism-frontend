import styles from "./App.module.scss";

// packages
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

// layouts
import Header from "./layouts/header/header";

// pages
import LoginPage from "./pages/login/login";
import HomePage from "./pages/home/home";
import SignupPage from "./pages/signup/signup";
import PricingPage from "./pages/pricing/pricing";
// import PlagiarismChecker from "./pages/plagiarism-checker/plagiarism-checker";
import PostLoginPage from "./pages/post-login/post-login";
import VerificationPage from "./pages/verification/verification";
import VerifiedPage from "./pages/verified/verified";
import Sidebar from "./components/sidebar/sidebar";
import AccountPage from "./pages/account/account";
import DetailsPage from "./pages/details/details";
import SearchPage from "./pages/search/search";
import ManageSubscriptionsPage from "./pages/manage-subscriptions/manage-subscriptions";
import ReportPage from "./pages/report/report";

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
import AllUsersPage from "./pages/all-users/all-users";
import AnalysisPage from "./pages/analysis/analysis";
import PaymentDetailsPage from "./pages/payment-details/payment-details";
import Footer from "./layouts/footer/footer";
import ListAdminsPage from "./pages/list-admins/list-admins";
import HowItWorksPage from "./pages/how-it-works/how-it-works";
import ScrollToTop from "./components/scrollToTop";
import EditPlagiarismTypes from "./pages/edit-plagiarism-types/edit-plagiarism-types";
import EditFAQ from "./pages/edit-faq/edit-faq";
import EditBenefits from "./pages/edit-benefits/edit-benefits";

function App({ flash, setCurrentUser, currenUser }) {
  const { pathname } = useLocation();
  // console.log({ pathname });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostLogin, setIsPostLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log({ isPostLogin });
  const headerRoutes = ["/login", "/signup", "/pricing", "/"];
  const postLoginRoutes = [
    "/users",
    "/manage-subscriptions",
    "/search",
    "/details",
    "/account",
    "/analysis",
    "/payment",
    "/admins",
    "/how-it-works",
    "/plagiarism-types",
    "/edit-faqs",
    "/edit-benefits",
  ];
  async function handleCheckAuth() {
    try {
      const response = await checkAuth();
      // console.log({ response });
      if (response.data.status === "success") {
        response?.data?.usertype === "ADMIN" && setIsAdmin(true);
        setCurrentUser(response.data.user);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log({ pathname });
    if (authToken) handleCheckAuth();
    if (pathname === "/") {
      return setIsPostLogin(false);
    }
    let isPostLoginTemp = false;
    postLoginRoutes.forEach((route) => {
      if (pathname.includes(route)) {
        isPostLoginTemp = true;
      }
      // console.log({ route, isPostLoginTemp });
    });
    setIsPostLogin(isPostLoginTemp);
  }, [pathname]);
  return (
    <div className={`${isPostLogin ? styles.postLoginPage : ""}`}>
      <ScrollToTop />
      {flash && <Flash type={flash.type} message={flash.message} />}
      {headerRoutes.includes(pathname) && <Header />}
      {isPostLogin && (
        <>
          <div className={styles.toggleSideBar}>
            <img
              onClick={() => setIsSidebarOpen((prevState) => !prevState)}
              src={isSidebarOpen ? "/close-menu.png" : "/menus.png"}
              alt="menu"
            />
          </div>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </>
      )}
      <div className={`${isPostLogin ? styles.page : ""}`}>
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
            exact
            path="/account"
            element={!currenUser ? <Navigate to="/login" /> : <AccountPage />}
          />
          <Route
            exact
            path="/details"
            element={
              !currenUser ? (
                <Navigate to="/login" />
              ) : (
                <DetailsPage isAdmin={isAdmin} />
              )
            }
          />
          <Route
            exact
            path="/details/:id"
            element={!currenUser ? <Navigate to="/login" /> : <ReportPage />}
          />
          <Route
            exact
            path="/search"
            element={!currenUser ? <Navigate to="/login" /> : <SearchPage />}
          />
          <Route
            exact
            path="/manage-subscriptions"
            element={
              !currenUser ? (
                <Navigate to="/login" />
              ) : (
                <ManageSubscriptionsPage />
              )
            }
          />
          <Route
            exact
            path="/users"
            element={!currenUser ? <Navigate to="/login" /> : <AllUsersPage />}
          />
          <Route
            exact
            path="/analysis"
            element={!currenUser ? <Navigate to="/login" /> : <AnalysisPage />}
          />
          <Route
            exact
            path="/payments"
            element={
              !currenUser ? <Navigate to="/login" /> : <PaymentDetailsPage />
            }
          />
          <Route
            exact
            path="/admins"
            element={
              !currenUser ? <Navigate to="/login" /> : <ListAdminsPage />
            }
          />
          <Route
            exact
            path="/how-it-works"
            element={
              !currenUser ? <Navigate to="/login" /> : <HowItWorksPage />
            }
          />
          <Route
            exact
            path="/plagiarism-types"
            element={
              !currenUser ? <Navigate to="/login" /> : <EditPlagiarismTypes />
            }
          />
          <Route
            exact
            path="/edit-faqs"
            element={!currenUser ? <Navigate to="/login" /> : <EditFAQ />}
          />
          <Route
            exact
            path="/edit-benefits"
            element={!currenUser ? <Navigate to="/login" /> : <EditBenefits />}
          />

          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>
      {headerRoutes.includes(pathname) && <Footer />}
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
