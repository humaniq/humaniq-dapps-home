import { Button, Layout, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { getProviderStore } from "../../App";

export const WalletNotConnected = observer(() => {
  const { t } = useTranslation();

  return (
    <Layout
      style={{
        textAlign: "center",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 300,
        marginBottom: 24,
        borderWidth: 0,
        marginRight: 30,
        marginLeft: 30,
      }}
    >
      <Typography.Title level={3}>{t("walletNotConnected")}</Typography.Title>
      <Button
        onClick={getProviderStore.connect}
        size={"large"}
        style={{ marginTop: 30, width: "100%", height: 60 }}
        type="primary"
      >
        {t("connectWallet")}
      </Button>
    </Layout>
  );
});
