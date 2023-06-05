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
import IsNotSignedIn from "./components/auth/is-not-signed-in";
import IsUser from "./components/auth/is-user";
import IsAdmin from "./components/auth/is-admin";
import UsageHistoryPage from "./pages/usage-history/usage-history";

function App({ flash, setCurrentUser, currenUser }) {
  const { pathname } = useLocation();
  // console.log({ pathname });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostLogin, setIsPostLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  console.log({ isAdmin });
  const headerRoutes = ["/login", "/signup", "/pricing", "/"];
  const postLoginRoutes = [
    "/users",
    "/usage-history",
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
    setFetchingUser(true);
    try {
      const response = await checkAuth();
      if (response.data.status === "success") {
        if (response?.data?.user?.usertype === "ADMIN") setIsAdmin(true);
        setCurrentUser(response.data.user);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setFetchingUser(false);
    }
  }
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      handleCheckAuth();
    } else {
      setFetchingUser(false);
    }
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      return setIsPostLogin(false);
    }
    let isPostLoginTemp = false;
    postLoginRoutes.forEach((route) => {
      if (pathname.includes(route)) {
        isPostLoginTemp = true;
      }
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
            element={
              <IsNotSignedIn isLoading={fetchingUser}>
                <LoginPage />
              </IsNotSignedIn>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <IsNotSignedIn isLoading={fetchingUser}>
                <SignupPage />
              </IsNotSignedIn>
            }
          />
          <Route exact path="/pricing" element={<PricingPage />} />
          <Route exact path="/verify-email" element={<VerificationPage />} />
          <Route exact path="/verified" element={<VerifiedPage />} />

          <Route
            exact
            path="/account"
            element={
              <IsUser isLoading={fetchingUser}>
                <AccountPage />
              </IsUser>
            }
          />
          <Route
            exact
            path="/details"
            element={
              <IsUser isLoading={fetchingUser}>
                <DetailsPage isAdmin={isAdmin} />
              </IsUser>
            }
          />
          <Route
            exact
            path="/usage-history"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <UsageHistoryPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/details/:id"
            element={
              <IsUser isLoading={fetchingUser}>
                <ReportPage />
              </IsUser>
            }
          />
          <Route
            exact
            path="/search"
            element={
              <IsUser isLoading={fetchingUser}>
                <SearchPage />
              </IsUser>
            }
          />
          <Route
            exact
            path="/manage-subscriptions"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <ManageSubscriptionsPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/users"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <AllUsersPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/analysis"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <AnalysisPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/payments"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <PaymentDetailsPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/admins"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <ListAdminsPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/how-it-works"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <HowItWorksPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/plagiarism-types"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <EditPlagiarismTypes />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/edit-faqs"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <EditFAQ />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/edit-benefits"
            element={
              <IsAdmin isLoading={fetchingUser}>
                <EditBenefits />
              </IsAdmin>
            }
          />

          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:id" element={<Navigate to="/" />} />
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
