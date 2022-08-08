import React from "react";
import { Link } from "react-router-dom";
import "./DappCategory.sass";
import { IDappCategory } from "../../data/all-dapps";

export interface DappCategoryProps {
  data: IDappCategory;
}

export const DappCategory: React.FC<DappCategoryProps> = ({ data }) => {
  const { name, icon } = data;

  const str = { "-webkit-mask": `url(${icon}) no-repeat center / contain` };
  const url = `/${name.toLowerCase().replace(" ", "-")}`;

  return (
    <Link className={"dapp-category-container"} to={url}>
      <div className={"dapp-category"}>
        <div className={"dapp-category-image-container"}>
          <div
            style={{
              ...str,
              backgroundColor: "#0066DA",
              mask: `url(${icon}) no-repeat center / contain`,
              width: 20,
              height: 20,
            }}
          ></div>
        </div>
        <span className={"dapp-category-name"}>{name}</span>
      </div>
    </Link>
  );
};
