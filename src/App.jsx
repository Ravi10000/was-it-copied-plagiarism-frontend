import styles from "./App.module.scss";

// packages
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// layouts
import Header from "./layouts/header/header";

// pages
import LoginPage from "./pages/login/login";
import HomePage from "./pages/home/home";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
