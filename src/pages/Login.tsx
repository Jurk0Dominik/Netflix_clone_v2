import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./Login.module.css";
import background from "../assets/background.jpg";
import logo from "../assets/logo.png";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();

  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <div className={classes.loginContainer}>
      <img src={background} alt="" className={classes.background} />
      <img src={logo} alt="Netflix-Logo" className={classes.netflixLogo} />
      <div className={classes.loginLayout}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
          <h1>{t("text.signUp")}</h1>
          <input
            type="email"
            placeholder={t("input.email")}
            {...register("email")}
          />
          {errors.email && <p>Please enter a valid or phone number</p>}
          <input
            type="password"
            placeholder={t("input.psd")}
            {...register("password")}
          />
          {errors.password && <p>Please enter a correct password</p>}
          <button type="submit">{t("button.logIn")} &raquo;</button>
          <div className={classes.downForm}>
            <span>{t("text.account")}</span>
            <Link className={classes.link} to="/">
              {t("button.signNow")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
