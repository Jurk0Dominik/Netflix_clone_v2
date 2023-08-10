import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";

import { API_KEY, BASE_URL } from "../utils/request";

import classes from "./Row.module.css";
import { useRecoilState } from "recoil";
import {
  modalState,
  movieState,
  modalTitle,
  movieID,
  selectGenre,
} from "../atoms/modalAtom";
import NotAvailable from "./NotAvailable";

import { db } from "../utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

function Row({ fetchUrl, title, selectByGenre, pageNum, type, myList }) {
  const rowRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [focus, setFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [titleMovie, settitleMovie] = useRecoilState(modalTitle);
  const [currrentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [genre, setGenre] = useRecoilState(selectGenre);

  const { user } = useAuth();

  function getMovies() {
    const movieCollectionRef = collection(db, user.uid);
    //read data from firebase
    getDocs(movieCollectionRef)
      .then((response) => {
        const movies = response.docs.map((doc) => ({
          data: doc.data(),
        }));

        setMovies(movies.map((movie) => movie.data));
      })
      .catch((err) => {});
  }

  useEffect(() => {
    if (myList) getMovies();
  }, [myList]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      if (selectByGenre) {
        const data = await fetch(
          `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&page=1&with_genres=${genre}&page=${pageNum}`
        )
          .then((response) => response.json())
          .catch((err) => {
            console.log(err.message);
          });
        setMovies(data.results);
        setIsLoading(true);
      } else if (myList) {
        getMovies();
      } else setMovies(request.data.results);
    }
    fetchData();
  }, [genre, fetchUrl, myList]);

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
      {<h2>{title}</h2>}
      {movies.length === 0 && <NotAvailable myList={myList} />}
      {movies.length !== 0 && focus && (
        <button onClick={() => handleClick("left")} className={classes.leftBtn}>
          &lsaquo;
        </button>
      )}
      {movies.length !== 0 && (
        <div ref={rowRef} className={`${classes.movies}`}>
          {movies.map((movie) => {
            if (
              movie?.backdrop_path ||
              movie?.poster_path ||
              movie?.data?.backdrop_path
            ) {
              return (
                <img
                  key={Math.random()}
                  src={`http://image.tmdb.org/t/p/original/${
                    movie?.backdrop_path ||
                    movie?.data?.backdrop_path ||
                    movie?.poster_path ||
                    "/n9hMXjd94hSO93lal2fcC5w20XW.jpg"
                  }`}
                  alt={movie?.name}
                  onClick={() => imageHandler(movie)}
                />
              );
            }
            return "";
          })}
        </div>
      )}

      {movies.length !== 0 && focus && (
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
