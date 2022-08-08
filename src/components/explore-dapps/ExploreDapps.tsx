import React from "react";
import allDapps from "../../data/all-dapps";
import "./index.sass";
import { DappCategory } from "./DappCategory";
import { t } from "i18next";
import { Link } from "react-router-dom";

export const ExploreDapps = () => {
  return (
    <div className={"explore-dapps"}>
      {
        <Link
          to={`/${allDapps[0].name.toLowerCase().replace(" ", "-")}`}
          className={"main-category"}
        >
          <div>
            <img src={allDapps[0].icon} alt={"africa"} />
          </div>
          <div>
            <div className={"title"}>{allDapps[0].name}</div>
            <div className={"description"}> {t("takeFirst")}</div>
          </div>
        </Link>
      }
      {allDapps.map((dapp, index) => {
        if (index === 0) return null;
        return <DappCategory data={dapp} key={dapp.name} />;
      })}
    </div>
  );
};
