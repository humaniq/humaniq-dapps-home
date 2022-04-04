import React from "react";
import { Button, Layout } from "antd";
import { useTranslation } from "react-i18next";
import colors from "../../utils/colors";
import { getProviderStore } from "../../App";
import { renderShortAddress } from "../../utils/address";

const Header = () => {
  const { t } = useTranslation();

  return (
    <Layout.Header
      style={{
        textAlign: "center",
        backgroundColor: colors.primary,
        color: colors.white,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 22,
        }}
      >
        {t("appName")}
      </span>
      <Button
        type={"primary"}
        disabled={!getProviderStore.hasProvider}
        onClick={async () => {
          if (!getProviderStore.currentAccount) {
            await getProviderStore.connect();
          }
        }}
      >
        {renderShortAddress(getProviderStore.currentAccount) || "not connected"}
      </Button>
    </Layout.Header>
  );
};

export default Header;
