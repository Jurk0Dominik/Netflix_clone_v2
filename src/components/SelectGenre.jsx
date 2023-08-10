import React from "react";
// import { useDispatch } from "react-redux";

import classes from "./SelectGenre.module.css";
import { useRecoilState } from "recoil";
import { selectGenre } from "../atoms/modalAtom";
// import { fetchDataByGenre } from "../store";

const genresID = {
  movies: [
    { name: "action", id: 28 },
    { name: "adventure", id: 12 },
    { name: "animation", id: 16 },
    { name: "comedy", id: 35 },
    { name: "crime", id: 80 },
    { name: "documentary", id: 99 },
    { name: "drama", id: 18 },
    { name: "family", id: 10751 },
    { name: "fantasy", id: 14 },
    { name: "history", id: 36 },
    { name: "horror", id: 27 },
    { name: "music", id: 10402 },
    { name: "mystery", id: 9648 },
    { name: "romance", id: 10749 },
    { name: "science fiction", id: 878 },
    { name: "tv movie", id: 10770 },
    { name: "thriller", id: 53 },
    { name: "war", id: 10752 },
    { name: "western", id: 37 },
  ],
  tvShows: [
    { name: "action & adventure", id: 10759 },
    { name: "animation", id: 16 },
    { name: "comedy", id: 35 },
    { name: "crime", id: 80 },
    { name: "documentary", id: 99 },
    { name: "drama", id: 18 },
    { name: "family", id: 10751 },
    { name: "kids", id: 10762 },
    { name: "mystery", id: 9648 },
    { name: "news", id: 10763 },
    { name: "reality ", id: 10764 },
    { name: "science fiction & fantasy", id: 10765 },
    { name: "soap", id: 10766 },
    { name: "talk", id: 10767 },
    { name: "war & politics", id: 10768 },
    { name: "western", id: 37 },
  ],
};

function SelectGenre({ type }) {
  const [genre, setGenre] = useRecoilState(selectGenre);

  return (
    <select
      className={classes.select}
      onChange={(e) => {
        setGenre(e.target.value);
        // dispatch(fetchDataByGenre({ genre: e.target.value, type }));
      }}
    >
      {genresID[type].map((genre) => {
        return (
          <option value={genre.id} key={genre.id} defaultValue={16}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectGenre;
