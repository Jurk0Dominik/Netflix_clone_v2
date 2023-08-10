import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { Movie } from "../../typings";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
  key: "movieState",
  default: null,
});

export const modalTitle = atom({
  key: "movieTitle",
  default: "",
});

export const selectGenre = atom({
  key: "selectGenre",
  default: 16,
});

export const subscribePlan = atom({
  key: "subscribePlan",
  default: "",
});
