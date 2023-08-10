import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import Row from "../components/Row";

import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";

function Movies() {
  const showModal = useRecoilValue(modalState);
  return (
    <div>
      <main>
        <Navbar />
        <SelectGenre type="movies" />
        <section>
          <Row selectByGenre={true} pageNum={1} type="movie" />
          <Row selectByGenre={true} pageNum={2} type="movie" />
          <Row selectByGenre={true} pageNum={3} type="movie" />
        </section>
      </main>
      {showModal && <Modal type="movie" />}
    </div>
  );
}

export default Movies;
