import React from "react";
import classes from "./NotAvailable.module.css";

function NotAvailable({ myList }) {
  return (
    <div className={classes.informText}>
      {!myList && <h1>No Movies available for selected genre</h1>}
      {myList && <h1>No Movies currently in My List section</h1>}
    </div>
  );
}

export default NotAvailable;
