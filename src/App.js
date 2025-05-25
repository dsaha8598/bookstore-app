import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignupPage";
import ValidateOTPPage from "./pages/ValidateOTPPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePassword from "./pages/UpdatePassword";
import NewUserWelcome from "./pages/Store Management/NewUserWelcome";
import MultiStepStoreCreation from "./pages/Store Management/MultiStepStoreCreation";
import StoreOptionAfterLogin from "./pages/Store Management/StoreOptionAfterLogin";

function App() {
  return (
    <React.StrictMode>
      <HashRouter>

      <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/register" element={<SignupPage />} />
         <Route path="/validate/otp" element={<ValidateOTPPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/forgot/password" element={<ForgotPasswordPage />} />
         <Route path="/update/password" element={<UpdatePassword />} />
         <Route path="/welcome/createstore" element={<NewUserWelcome />} />
         <Route path="/store/multistep" element={<MultiStepStoreCreation />} />
         <Route path="/welcome/storeoption" element={<StoreOptionAfterLogin />} />
        {/* Add other routes here */}
      </Routes>

    </HashRouter>
    </React.StrictMode>
  );
}

export default App;
