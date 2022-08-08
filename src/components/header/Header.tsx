import React from "react";
import LogoWordmark from "../../static/images/logo-wordmark.svg";
import "./index.sass";

export const Header = () => {
  return (
    <div className={"header"}>
      <img
        src={LogoWordmark}
        className={"header logo-img"}
        alt={"background"}
      />
    </div>
  );
};
