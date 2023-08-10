import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";

import classes from "./SignUp.module.css";
import background from "../assets/background.jpg";

import useAuth from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

function SignUp() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("");
  // const { user } = useAuth();

  const [click, setClick] = useState(false);

  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (password.length >= 6 && email.includes("@"))
      await signUp(email, password);
    else if (!email.includes("@"))
      alert('Enter correct adress email with "@" sign');
    else alert("Password should be at least 6 sign");
  };

  useEffect(() => {
    setLang("en");
    i18n.changeLanguage(lang);
  }, []);

  const headerHandler = (props: any) => {
    setLang(props);
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
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <input
              type="email"
              placeholder={t("input.email")}
              {...register("email")}
            />
            <input
              type="password"
              placeholder={t("input.psd")}
              className={!click ? classes.hidden : ""}
              {...register("password")}
            />
            {!click && (
              <button onClick={() => setClick(true)}>
                {t("button.start")} &raquo;
              </button>
            )}
            {click && (
              <button type="submit" className={classes.loginBtn}>
                {t("button.signUp")}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
