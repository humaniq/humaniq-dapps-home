import React from "react";
import "./styles.sass";

export const NotRegisteredMessage = () => {
  return (
    <div className={"not-registered-container"}>
      <h1>Hey! You don’t have Humaniq ID yet</h1>
      <div>Humaniq ID allows you to: </div>
      <ul className={"list"}>
        <li>get charity donations;</li>
        <li>find a job;</li>
        <li>get business course;</li>
      </ul>
    </div>
  );
};
