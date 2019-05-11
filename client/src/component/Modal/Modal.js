import React from "react";

const modal = props => (
  <div>
    <header>
      <h1>{props.title}</h1>
    </header>
    <section>{props.children}</section>
    <section />
  </div>
);

export default modal;
