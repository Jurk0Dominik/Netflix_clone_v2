import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import classes from "./Login.module.css";
import background from "../assets/background.jpg";
import { firebaseAuth } from "../utils/firebase-config";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
//
// import { useDispatch } from "react-redux";
// import { login, logout } from "../store/userSlice";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userRef = useRef<HTMLInputElement>(null);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState(String);

  const [emialIsValid, setEmialIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setEmialIsValid(true);
    setPasswordIsValid(true);
  }, [emailValue, passwordValue]);

  const loginFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!emailValue.includes("@")) setEmialIsValid(false);
    if (passwordValue.length >= 0) setPasswordIsValid(false);

    // try {
    //   await signInWithEmailAndPassword(firebaseAuth, emailValue, passwordValue);

    //   onAuthStateChanged(firebaseAuth, (currentUser) => {
    //     if (currentUser) {
    //       // dispatch(
    //       //   login({
    //       //     uid: currentUser.uid,
    //       //     email: currentUser.email,
    //       //   })
    //       // );
    //       //   navigate("/main-Page");
    //     } else {
    //       // dispatch(logout);
    //     }
    //     setEmailValue("");
    //     setPasswordValue("");
    //   });
    //   //
    // } catch (err) {
    //   if (!emailValue.includes("@")) setEmialIsValid(false);
    //   if (!passwordValue.length) setPasswordIsValid(false);
    // }
  };

  return (
    <form className={classes.loginContainer} onSubmit={loginFormSubmit}>
      <img src={background} alt="" className={classes.background} />
      <img src={logo} alt="Netflix-Logo" className={classes.netflixLogo} />
      <div className={classes.loginLayout}>
        <div className={classes.loginForm}>
          <h1>{t("text.signUp")}</h1>
          <div className={classes.data}>
            <input
              type="email"
              id="email"
              placeholder={t("input.email")}
              autoComplete="on"
              ref={userRef}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            {!emialIsValid && <p>Please enter a valid or phone number</p>}
          </div>
          <div className={classes.data}>
            <input
              type="password"
              id="password"
              placeholder={t("input.psd")}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              required
            />
            {!passwordIsValid && <p>Please enter a correct password</p>}
          </div>
          <button>{t("button.logIn")} &raquo;</button>
          <div className={classes.downForm}>
            <span>{t("text.account")}</span>
            <Link className={classes.link} to="/">
              {t("button.signNow")}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
