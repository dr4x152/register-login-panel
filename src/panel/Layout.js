import { Outlet, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'

const Layout = () => {
  return (
    <>
      <Outlet />
      <Nav className="justify-content-center">
        <Link to="/Login" className="m-2">Sign in</Link>
        <Link to="/Register" className="m-2">Sign up</Link>
      </Nav>
    </>
  )
};

export default Layout;