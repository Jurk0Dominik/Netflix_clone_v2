import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // .use(Backend)

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    debug: false,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          text: {
            h1: "Unlimited movies, TV shows and more",
            h2_1: "Watch anywhere. Cancel anytime!",
            h2_2: "Ready to watch? Enter your email to create or restart your membership.",
            account: "New to Netflix?",
            signUp: "Sign In",
          },
          button: {
            logIn: "Log In",
            start: "Get Started",
            signUp: "Sign Up",
            signNow: "Sign up now",
          },
          input: {
            email: "Email Address",
            psd: "Password",
          },
        },
      },
      pl: {
        translation: {
          text: {
            h1: "Nieograniczone filmy, programy telewizyjne i nie tylko",
            h2_1: "Oglądaj gdziekolwiek. Anuluj kiedy chcesz!",
            h2_2: "Gotowy do oglądania? Wprowadź swój adres e-mail, aby utworzyć lub wznowić członkostwo.",
            account: "Nie masz konta?",
            signUp: "Logowanie",
          },
          button: {
            logIn: "Zaloguj się",
            start: "Zaczynaj",
            signUp: "Zapisz się",
            signNow: "Zaloguj się już teraz",
          },
          input: {
            email: "Adres Email",
            psd: "Hasło",
          },
        },
      },
    },
  });

export default i18n;
