import { Routes, Route, Outlet } from "react-router";
import Start from "./pages/Start";
import UserLogin from "./pages/UserComponents/UserLogin";
import UserSignUp from "./pages/UserComponents/UserSignUp";
import CaptainLogin from "./pages/CaptainComponents/CaptainLogin";
import CaptainSignUp from "./pages/CaptainComponents/CaptainSignUp";
import ProtectedUserComponentWrapper from "./pages/ProtectedComponentsWrapper/ProtectedUserComponentWrapper";
import UserLogout from "./pages/UserComponents/UserLogout";
import UserHome from "./pages/UserComponents/UserHome";
import ProtectedCaptainComponentWrapper from "./pages/ProtectedComponentsWrapper/ProtectedCaptainComponentWrapper";
import CaptainHome from "./pages/CaptainComponents/CaptainHome";
import CaptainLogout from "./pages/CaptainComponents/CaptainLogout";

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
        </Route>
        {/* Routes nested For the Captains page */}
        <Route
          path="captain"
          element={
            <ProtectedCaptainComponentWrapper>
              <Outlet />
            </ProtectedCaptainComponentWrapper>
          }
        >
          {/* For the home page */}
          <Route path="home" index element={<CaptainHome />} />
          {/* For the Captain logout page */}
          <Route path="logout" element={<CaptainLogout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
