import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../assets/logo.png";
import classes from "./Header.module.css";

const Header: React.FC<{ sendData: (data: string) => void }> = ({
  sendData,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  const buttonHandler = () => {
    navigate("/login");
  };

  const langHandler = (e: any) => {
    sendData(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={logo} alt="Netflix-Logo" />
      </div>
      <div className={classes.userOperate}>
        <select
          id="lang"
          className={classes.language}
          defaultValue="en"
          onChange={langHandler}
        >
          <option value="pl">Poland</option>
          <option value="en">English</option>
        </select>
        <button onClick={buttonHandler}>{t("button.logIn")}</button>
      </div>
    </div>
  );
};

export default Header;
