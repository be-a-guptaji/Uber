import { Link, Outlet } from "react-router";

const Home = () => {
  return (
    <div>
      Home
      <br />
      <Link to="/user/logout">logout</Link>
      <Outlet />
    </div>
  );
};

export default Home;
