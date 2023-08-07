import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import Modal from "./Modal";

import { API_KEY, BASE_URL } from "../utils/request";

import classes from "./Row.module.css";
import { useRecoilState } from "recoil";
import { modalState, movieState, modalTitle } from "../atoms/modalAtom";

function Row({ fetchUrl, title, isLarged }) {
  const rowRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [focus, setFocus] = useState(false);
  const [click, setClick] = useState(false);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [titleMovie, settitleMovie] = useRecoilState(modalTitle);
  const [currrentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const imageHandler = async (movie) => {
    if (!movie) return;
    setShowModal(true);
    // console.log(movie);
    settitleMovie(title);
    setCurrentMovie(movie);
  };

  return (
    <div
      className={classes.row}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => {
        setFocus(false);
      }}
    >
      <h2>{title}</h2>
      {focus && (
        <button onClick={() => handleClick("left")} className={classes.leftBtn}>
          &lsaquo;
        </button>
      )}
      <div
        ref={rowRef}
        className={`${isLarged ? classes.largeRow : classes.movies}`}
      >
        {movies.map((movie) => (
          <img
            key={movie?.id}
            src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
            alt={movie?.name}
            onClick={() => imageHandler(movie)}
          />
        ))}
      </div>

      {focus && (
        <button
          className={classes.rightBtn}
          onClick={() => handleClick("right")}
        >
          &rsaquo;
        </button>
      )}
    </div>
  );
}

export default Row;
