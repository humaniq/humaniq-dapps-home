import React from "react";
import "./styles.sass";
import { t } from "i18next";

export interface NotRegisteredMessageProps {
  isConnected: boolean;
  isRegistered: boolean;
}

export const NotRegisteredMessage: React.FC<NotRegisteredMessageProps> = ({
  isConnected = false,
  isRegistered = false,
}) => {
  return (
    <div className={"not-registered-container"}>
      {isConnected && !isRegistered && (
        <>
          <h1>{t("notRegistered.title")}</h1>
          <div>{t("notRegistered.description")}</div>
          <ul className={"list"}>
            <li>{t("notRegistered.one")}</li>
            <li>{t("notRegistered.two")}</li>
            <li>{t("notRegistered.three")}</li>
          </ul>
        </>
      )}
      {!isConnected && (
        <div className={"not-connected"}>{t("notConnectedTitle")}</div>
      )}
    </div>
  );
};
