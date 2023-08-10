import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";

import { useRecoilState } from "recoil";
import { modalState, movieState, modalTitle } from "../atoms/modalAtom";

import classes from "./Modal.module.css";
import { API_KEY } from "../utils/request";
import ReactPlayer from "react-player/lazy";
import {
  FaMinus,
  FaPlus,
  FaThumbsUp,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase-config";
import useAuth from "../hooks/useAuth";

function Modal(type) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [currentMovie, setCurrentMovie] = useState("");

  const [title, setTitle] = useRecoilState(modalTitle);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(true);
  const { user } = useAuth();

  const addMovieHandler = (e) => {
    // e.preventDefault();
    const movieCollectionRef = collection(db, user.uid);
    getDocs(movieCollectionRef)
      .then((response) => {
        const movies = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        const id = movies.map((mvs) => mvs.id === `${movie.id}`);

        if (id.includes(true)) return alert("Movie already exist in MY LIST");
        setDoc(doc(db, user.uid, movie.id.toString()), {
          imgTitle: title,
          ...movie,
        });
        alert("Movie added to MY LIST");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeMovieHandler = async () => {
    const movieCollectionRef = collection(db, user.uid);
    getDocs(movieCollectionRef)
      .then(async (response) => {
        const movies = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        const id = movies.map((mvs) => mvs.id === `${movie.id}`);
        if (id.includes(true)) {
          const docRef = doc(db, user.uid, movie.id.toString());
          await deleteDoc(docRef)
            .then(() => {})
            .catch((err) => err.message);
          window.location.reload();
          alert("Movie removed from My List");
          // setMovie()
        } else return alert("Movie don't exist in MY LIST");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        (title || movie?.imgTitle) === "Netflix Originals" ||
          (title || movie?.imgTitle) === "Trending Now"
          ? `https://api.themoviedb.org/3/${
              movie?.media_type === undefined ? "tv" : "movie"
            }/${
              movie.id
            }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
          : `https://api.themoviedb.org/3/${type.type}/${
              movie.id || movie.data.id
            }?api_key=${API_KEY}&append_to_response=videos`
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
        <button
          className={classes.addToListBtn}
          onClick={() => addMovieHandler()}
        >
          <FaPlus />
        </button>
        <button
          className={classes.removeFromListBtn}
          onClick={() => removeMovieHandler()}
        >
          <FaMinus />
        </button>
        <button className={classes.tumbBtn}>
          <FaThumbsUp />
        </button>
        {trailer && (
          <button
            className={classes.volumeBtn}
            onClick={() => {
              setMuted((prev) => !prev);
            }}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        )}
        <div className={classes.movieContainer}>
          {!trailer && (
            <img
              alt="images"
              src={`http://image.tmdb.org/t/p/original${
                currentMovie?.backdrop_path || currentMovie?.poster_path
              }`}
            />
          )}
          {trailer && (
            <ReactPlayer
              url={trailer && `https://www.youtube.com/watch?v=${trailer}`}
              playing
              loop
              muted={muted}
            />
          )}
        </div>

        <div className={classes.informContainer}>
          <div>
            <h1>{currentMovie?.name || currentMovie?.original_title}</h1>
            <span>
              {cutText(
                currentMovie?.overview || currentMovie?.original_name,
                300
              )}
            </span>
          </div>
          <div className={classes.briefInfo}>
            {trailer && (
              <p>
                Genres:{" "}
                {currentMovie?.genres.map((genre) => genre?.name + ", ")}
              </p>
            )}
            <p>Original language: {currentMovie.original_language}</p>
            <p>Total votes: {currentMovie.vote_count}</p>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
