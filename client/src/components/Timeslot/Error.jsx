import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./styles.scss";

export default function Error(props) {
  return (
    <main className="timeslot__card timeslot__card--error">
      <section className="timeslot__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <IconButton
        aria-label="close"
        className="timeslot__error-close"
        onClick={props.onClose}
      >
        <CloseIcon />
      </IconButton>
    </main>
  );
}
