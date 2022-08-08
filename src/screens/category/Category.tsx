import React, { useEffect, useState } from "react";
import allDapps, { IDappCategory } from "../../data/all-dapps";
import { Dapp } from "../../components/dapp/Dapp";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import "./index.sass";
import { app, EVM_NETWORKS } from "../../stores/appStore/appStore";
import { observer } from "mobx-react";

export const Category = observer(() => {
  const [category, setCategory] = useState<IDappCategory>();
  const params = useParams();

  const updateCategory = () => {
    const cat = allDapps.find((cat) => {
      return cat.name.toLowerCase().replace(" ", "-") === params.category;
    });

    if (JSON.stringify(category) !== JSON.stringify(cat)) {
      console.log({ cat });
      setCategory(cat);
    }
  };

  useEffect(() => {
    console.log("open-category");
    updateCategory();
  }, []);

  if (!category) {
    return null;
  }
  return (
    <div className={"category-container"}>
      <Navbar title={category?.name} />
      <div className={"category-wrapper"}>
        {category.dapps
          .filter((c) =>
            app.selectedNetwork === EVM_NETWORKS.BSC ? c.isBSC : c.isEth
          )
          .map((dapp, i) => (
            <Dapp data={dapp} key={dapp.url} position={i} />
          ))}
      </div>
    </div>
  );
});
