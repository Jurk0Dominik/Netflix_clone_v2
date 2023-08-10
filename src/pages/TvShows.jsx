import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import Row from "../components/Row";
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";

function TvShows() {
  const showModal = useRecoilValue(modalState);

  return (
    <div>
      <main>
        <Navbar />
        <SelectGenre type="tvShows" />
        <section>
          <Row selectByGenre={true} pageNum={1} type="tv" />
          <Row selectByGenre={true} pageNum={2} type="tv" />
          <Row selectByGenre={true} pageNum={3} type="tv" />
        </section>
      </main>
      {showModal && <Modal type="tv" />}
    </div>
  );
}

export default TvShows;
