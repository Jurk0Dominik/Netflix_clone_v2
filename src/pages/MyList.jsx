import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Row from "../components/Row";

import classes from "./MyList.module.css";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";

function MyList() {
  const showModal = useRecoilValue(modalState);

  return (
    <div>
      <Navbar />
      <main>
        <section className={classes.myListContainer}>
          <Row myList={true} pageNum={1} type="tv" />
        </section>
      </main>
      {showModal && <Modal type="movie" />}
    </div>
  );
}

export default MyList;
