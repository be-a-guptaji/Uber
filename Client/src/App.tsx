import { Routes, Route } from "react-router";
import Start from "./pages/Start";
import UserLogin from "./pages/UserComponents/UserLogin";
import UserSignUp from "./pages/UserComponents/UserSignUp";
import CaptainLogin from "./pages/CaptainComponents/CaptainLogin";
import CaptainSignUp from "./pages/CaptainComponents/CaptainSignUp";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      {/* Define routes for the application */}
      <Routes>
        {/* For the landing page */}
        <Route path="/" element={<Start />} />
        {/* For the User sign up page */}
        <Route path="/signup" element={<UserSignUp />} />
        {/* For the User login page */}
        <Route path="/login" element={<UserLogin />} />
        {/* For the Captain sign up page */}
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        {/* For the Captain login page */}
        <Route path="/captain-login" element={<CaptainLogin />} />
        {/* For the home page */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
