import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./translations/i18n";
import { App } from "./App";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

ReactDOM.render(<App />, document.getElementById("root"));
