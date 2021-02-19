import React from "react";
import "./styles.scss";

export default function Header(props) {
  return (
    <header className="timeslot__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="timeslot__separator" />
    </header>
  );
}
