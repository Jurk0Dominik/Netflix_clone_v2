import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import logo from "../assets/logo.png";
import classes from "./Navbar.module.css";
import accountImg from "../assets/accountImg.jpg";
import { FaPowerOff, FaSearch } from "react-icons/fa";

const links = [
  { name: "Home", link: "/main" },
  { name: "Tv Shows", link: "/tvShows" },
  { name: "Movies", link: "/movies" },
  { name: "New & Popular", link: "/new&popular" },
  { name: "My List", link: "/mylist" },
];

function Navbar() {
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const signOutHandler = async function () {
    // console.log(user?.email);
    await logout();
  };

  return (
    <nav className={sticky ? classes.sticky : classes.navbar}>
      <div className={classes.leftNav}>
        <img src={logo} alt="" />
        <ul className={classes.links}>
          {links.map((elem) => {
            return (
              <li key={elem.name}>
                <NavLink
                  to={elem.link}
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : ""
                  }
                >
                  {elem.name}{" "}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.rightNav}>
        <div className={classes.search}>
          <button className={classes.searchBtn}>
            <FaSearch />
          </button>
          <input type="text" placeholder="Search" />
          <button onClick={signOutHandler} className={classes.signoutBtn}>
            <FaPowerOff />
          </button>
        </div>
        <img
          src={accountImg}
          alt="accountImage"
          onClick={() => navigate("/userProfile")}
        />
      </div>
    </nav>
  );
}

export default Navbar;
