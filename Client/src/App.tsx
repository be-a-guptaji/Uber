import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import UserLogin from "./pages/UserElements/UserLogin";
import UserSignUp from "./pages/UserElements/UserSignUp";
import CaptainLogin from "./pages/CaptainElements/CaptainLogin";
import CaptainSignUp from "./pages/CaptainElements/CaptainSignUp";

const App = () => {
  return (
    <>
      {/* Define routes for the application */}
      <Routes>
        {/* For the home page */}
        <Route path="/" element={<Home />} />
        {/* For the User sign up page */}
        <Route path="/signup" element={<UserSignUp />} />
        {/* For the User login page */}
        <Route path="/login" element={<UserLogin />} />
        {/* For the Captain sign up page */}
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        {/* For the Captain login page */}
        <Route path="/captain-login" element={<CaptainLogin />} />
      </Routes>
    </>
  );
};

export default App;
