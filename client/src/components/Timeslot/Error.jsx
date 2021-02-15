import React from "react";

export default function Error(props) {
  return (
    <main className="timeslot__card timeslot__card--error">
      <section className="timeslot__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="timeslot__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}