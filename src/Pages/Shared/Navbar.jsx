import { Link, NavLink } from "react-router-dom";
import logo from "../../../src/assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navItems = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About question </NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register </NavLink>
      </li>
       {user?.email &&  <li><NavLink to={"/bookings"}>Bookings </NavLink></li> }
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 mb-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl">
            <img src={logo} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <li className=" list-none">
              <NavLink to={"/login"}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => logoutUser()}
                >
                  Logout
                </button>{" "}
              </NavLink>
            </li>
          ) : (
            <li className=" list-none btn btn-sm btn-primary">
              <NavLink to={"/login"}>Login </NavLink>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
