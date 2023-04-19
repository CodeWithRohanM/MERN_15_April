import React from "react";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/RegisterPage";
import LogInPage from "./Components/LogInPage";
import ErrorPage from "./Components/ErrorPage";
import SecretPage from "./Components/SecretPage";

import { Routes, Route } from "react-router-dom";

const App = () => {

  return <>

    <Header />

    <Routes>
      <Route exact path="/" element={<HomePage />}></Route>
      <Route exact path="/secret" element={<SecretPage />}></Route>
      <Route exact path="/register" element={<RegisterPage />}></Route>
      <Route exact path="/logIn" element={<LogInPage />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>

    </Routes>
  </>
};

export default App;