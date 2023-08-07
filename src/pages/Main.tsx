import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Modal from "../components/Modal";

import requests from "../utils/request";

import { modalState } from "../atoms/modalAtom";
import { useRecoilValue } from "recoil";

import classes from "./Main.module.css";
import { current } from "@reduxjs/toolkit";

function Main() {
  const showModal = useRecoilValue(modalState);
  //same => const [showModal, setShowModal] = useState(false);

  return (
    <div className={classes.mainContainer}>
      <main>
        <Navbar />
        <Banner fetchUrl={requests.fetchNetflixOriginals} />
        <section className={classes.rowSection}>
          <Row
            title="Netflix Originals"
            fetchUrl={requests.fetchNetflixOriginals}
            isLarged={true}
            // currentMovie={currentHandler}
          />
          <Row
            title="Top Rated"
            fetchUrl={requests.fetchTopRated}
            isLarged={false}
          />
          <Row
            title="Trending now"
            fetchUrl={requests.fetchTrending}
            isLarged={false}
          />
          <Row
            title="Action Movies"
            fetchUrl={requests.fetchActionMovies}
            isLarged={false}
          />
          <Row
            title="Comedy Movies"
            fetchUrl={requests.fetchComedyMovies}
            isLarged={false}
          />
          <Row
            title="Romance Movies"
            fetchUrl={requests.fetchRomanceMovies}
            isLarged={false}
          />
          <Row
            title="Horror Movies"
            fetchUrl={requests.fetchHorrorMovies}
            isLarged={false}
          />
          <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
            isLarged={false}
          />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
}

export default Main;
