import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";

import { BASE_URL } from "../utils/request";

import classes from "./Row.module.css";

function Row({ fetchUrl, title, isLarged }) {
  const rowRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [focus, setFocus] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      // console.log(scrollLeft, clientWidth);

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
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
