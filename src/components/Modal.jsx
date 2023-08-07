import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";

import { useRecoilState } from "recoil";
import { modalState, movieState, modalTitle } from "../atoms/modalAtom";

import classes from "./Modal.module.css";
import { API_KEY } from "../utils/request";
import ReactPlayer from "react-player/lazy";
import {
  FaPlus,
  FaThumbsUp,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [currentMovie, setCurrentMovie] = useState("");
  const [title, setTitle] = useRecoilState(modalTitle);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  const cutText = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      // don't read this
      const data = await fetch(
        title === "Netflix Originals" ||
          title === "Top Rated" ||
          title === "Trending Now"
          ? `https://api.themoviedb.org/3/${
              movie?.media_type === undefined ? "tv" : "movie"
            }/${
              movie?.id
            }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
          : `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      setCurrentMovie(data);
    }
    fetchMovie();
  }, [movie, title]);

  return (
    <MuiModal open={showModal} onClose={handleClose} className={classes.modal}>
      <div className={classes.modalForm}>
        <button
          onClick={() => setShowModal(false)}
          className={classes.closeBtnModal}
        >
          <FaTimes />
        </button>
        <button className={classes.addToListBtn}>
          <FaPlus />
        </button>
        <button className={classes.tumbBtn}>
          <FaThumbsUp />
        </button>
        <button
          className={classes.volumeBtn}
          onClick={() => {
            setMuted((prev) => !prev);
          }}
        >
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <div className={classes.movieContainer}>
          {trailer && (
            <ReactPlayer
              url={trailer && `https://www.youtube.com/watch?v=${trailer}`}
              playing
              loop
              muted={muted}
            />
          )}
        </div>
        {trailer && (
          <div className={classes.informContainer}>
            <span>{cutText(movie?.overview, 300)}</span>
            <div className={classes.briefInfo}>
              <p>
                Genres: {currentMovie?.genres.map((genre) => genre.name + ", ")}
              </p>
              <p>Original language: {currentMovie.original_language}</p>
              <p>Total votes: {currentMovie.vote_count}</p>
            </div>
          </div>
        )}
      </div>
    </MuiModal>
  );
}

export default Modal;
