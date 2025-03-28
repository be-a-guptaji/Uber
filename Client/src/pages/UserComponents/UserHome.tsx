import { Link, Outlet } from "react-router";

const UserHome = () => {
  return (
    <div>
      Home
      <br />
      <Link to="/user/logout">logout</Link>
      <Link to="/captain/logout">logout</Link>
      <Outlet />
    </div>
  );
};

export default UserHome;
