import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Header from "../components/Header";

import classes from "./SignUp.module.css";
import background from "../assets/background.jpg";

function SignUp() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("");

  const [click, setClick] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    setLang("en");
    i18n.changeLanguage(lang);
  }, []);

  let dataValidate = false;
  if (passwordValue.length >= 6 && emailValue.includes("@")) {
    dataValidate = true;
  }

  const getStartBtnHandler = () => {
    setClick(!click);
  };

  const headerHandler = (props: any) => {
    setLang(props);
  };

  const signUpHandler = async (e: any) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        emailValue,
        passwordValue
      );
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          navigate("/payment");
        }
      });
      //
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.signContainer}>
      <img src={background} alt="" className={classes.background} />
      <div className={classes.signContent}>
        <Header sendData={headerHandler} />

        <div className={classes.inform}>
          <div className={classes.text}>
            <h1>{t("text.h1")}</h1>
            <h2>{t("text.h2_1")}</h2>
            <h2>{t("text.h2_2")}</h2>
          </div>
          <div className={classes.form}>
            <input
              type="email"
              placeholder={t("input.email")}
              name="email"
              autoComplete="off"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <input
              className={!click ? classes.hidden : ""}
              type="password"
              placeholder={t("input.psd")}
              name="password"
              autoComplete="off"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            {!click && (
              <button onClick={getStartBtnHandler}>
                {t("button.start")} &raquo;
              </button>
            )}
          </div>
          {click && (
            <button
              className={dataValidate ? classes.loginBtn : classes.blockBtn}
              onClick={signUpHandler}
            >
              {t("button.signUp")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
