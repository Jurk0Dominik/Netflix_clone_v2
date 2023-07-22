import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import requests from "../utils/request";

import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import classes from "./Banner.module.css";

function Banner({ fetchUrl }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState("");
  // const [movie2, setMovie2] = useState();

  let imgUrl;
  if (movie !== "" && isLoaded)
    imgUrl = `url(http://image.tmdb.org/t/p/original/${movie?.backdrop_path}`;

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(film);
  //     setMovie2(request.data.results);
  //     return request;
  //   }
  //   fetchData();
  // }, [film]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
    setIsLoaded(true);
  }, [fetchUrl]);

  const cutText = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  return (
    <div className={classes.bannerContent}>
      <div
        className={classes.banner}
        style={{
          backgroundImage: imgUrl,
        }}
      >
        <div className={classes.textContainer}>
          <h1 className={classes.title}>
            {movie?.name || movie?.title || movie?.original_name}
          </h1>
          <div className={classes.buttons}>
            <button
              className={classes.playBtn}
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className={classes.infoBtn}>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
          <h1 className={classes.description}>
            {cutText(movie?.overview, 300)}
          </h1>
        </div>
        <div className={classes.fadeBottom} />
      </div>
    </div>
  );
}

export default Banner;
