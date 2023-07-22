import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import accountImg from "../assets/accountImg.jpg";
import { Link, useNavigate, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const links = [
  { name: "Home", link: "/main" },
  { name: "Tv Shows", link: "/tvShows" },
  { name: "Movies", link: "/movies" },
  { name: "New & Popular", link: "new&popular" },
  { name: "My List", link: "/mylist" },
];

function Navbar() {
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const signOutHandler = async function () {
    signOut(firebaseAuth)
      .then(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
          if (!currentUser) {
            navigate("/login");
          }
        });
      })
      .catch((err) => {});
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
