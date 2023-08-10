import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Modal from "../components/Modal";

// import { BackHandler } from "react-native";
import requests from "../utils/request";

import { modalState } from "../atoms/modalAtom";
import { useRecoilValue } from "recoil";

import classes from "./Main.module.css";

function Main() {
  const showModal = useRecoilValue(modalState);
  //same => const [showModal, setShowModal] = useState(false);

  // const hardwareBackPress = (): any => {
  //   alert("Back button");
  // };

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", hardwareBackPress);
  }, []);

  return (
    <div className={classes.mainContainer}>
      <main>
        <Navbar />
        <Banner fetchUrl={requests.fetchNetflixOriginals} />
        <section className={classes.rowSection}>
          <Row
            title="Netflix Originals"
            fetchUrl={requests.fetchNetflixOriginals}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Top Rated"
            fetchUrl={requests.fetchTopRated}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Trending now"
            fetchUrl={requests.fetchTrending}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Action Movies"
            fetchUrl={requests.fetchActionMovies}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Comedy Movies"
            fetchUrl={requests.fetchComedyMovies}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Romance Movies"
            fetchUrl={requests.fetchRomanceMovies}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Horror Movies"
            fetchUrl={requests.fetchHorrorMovies}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
          <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
            selectByGenre={false}
            pageNum={1}
            type={""}
            myList={false}
          />
        </section>
      </main>
      {showModal && <Modal type="movie" />}
    </div>
  );
}

export default Main;
