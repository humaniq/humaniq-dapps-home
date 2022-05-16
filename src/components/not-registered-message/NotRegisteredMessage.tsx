import React from "react";
import "./styles.sass";
import { t } from "i18next";

export const NotRegisteredMessage = () => {
  return (
    <div className={"not-registered-container"}>
      <h1>{t("notRegistered.title")}</h1>
      <div>{t("notRegistered.description")}</div>
      <ul className={"list"}>
        <li>{t("notRegistered.one")}</li>
        <li>{t("notRegistered.two")}</li>
        <li>{t("notRegistered.three")}</li>
      </ul>
    </div>
  );
};
