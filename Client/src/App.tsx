import { Routes, Route, Outlet } from "react-router";
import Start from "./pages/Start";
import UserLogin from "./pages/UserComponents/UserLogin";
import UserSignUp from "./pages/UserComponents/UserSignUp";
import CaptainLogin from "./pages/CaptainComponents/CaptainLogin";
import CaptainSignUp from "./pages/CaptainComponents/CaptainSignUp";
import UserLogout from "./pages/UserComponents/UserLogout";
import UserHome from "./pages/UserComponents/UserHome";
import CaptainHome from "./pages/CaptainComponents/CaptainHome";
import CaptainLogout from "./pages/CaptainComponents/CaptainLogout";
import UserEmailVerification from "./pages/UserComponents/UserEmailVerification";
import CaptainEmailVerification from "./pages/CaptainComponents/CaptainEmailVerification";
import ProtectedUserComponentWrapper from "./pages/ProtectedComponentsWrapper/ProtectedUserComponentWrapper";
import ProtectedCaptainComponentWrapper from "./pages/ProtectedComponentsWrapper/ProtectedCaptainComponentWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainComponents/CaptainRiding";

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

        {/* For the email verification page */}
        <Route path="email">
          <Route path="user" element={<UserEmailVerification />} />
          <Route path="captain" element={<CaptainEmailVerification />} />
        </Route>

        {/* Routes nested For the Users page */}
        <Route
          path="user"
          element={
            <ProtectedUserComponentWrapper>
              <Outlet />
            </ProtectedUserComponentWrapper>
          }
        >
          {/* For the home page */}
          <Route path="home" index element={<UserHome />} />
          {/* For the User logout page */}
          <Route path="logout" element={<UserLogout />} />
          {/* For the Riding page */}
          <Route path="riding" element={<Riding />} />
        </Route>
        {/* Routes nested For the Captains page */}
        <Route
          path="captain"
          element={
            // <ProtectedCaptainComponentWrapper>
            <Outlet />
            // </ProtectedCaptainComponentWrapper>
          }
        >
          {/* For the home page */}
          <Route path="home" index element={<CaptainHome />} />
          {/* For the Captain logout page */}
          <Route path="logout" element={<CaptainLogout />} />
          {/* For the Riding page */}
          <Route path="riding" element={<CaptainRiding />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
