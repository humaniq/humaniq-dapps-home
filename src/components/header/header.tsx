import React from "react";
import { Button, Dropdown, Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import colors from "../../utils/colors";
import { getProviderStore } from "../../App";
import { renderShortAddress } from "../../utils/address";
import { observer } from "mobx-react";

const Header = observer(() => {
  const { t } = useTranslation();

  return (
    <Layout.Header
      style={{
        padding: "0 25px",
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
          lineHeight: 24,
        }}
      >
        {t("appName")}
      </span>
      {getProviderStore.currentAccount ? (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <div onClick={getProviderStore.disconnect}>
                  {t("disconnect")}
                </div>
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
        >
          <Button
            type={"primary"}
            disabled={!getProviderStore.hasProvider}
            onClick={async () => {
              if (!getProviderStore.currentAccount) {
                await getProviderStore.connect();
              }
            }}
          >
            {renderShortAddress(getProviderStore.currentAccount) ||
              t("notConnected")}
          </Button>
        </Dropdown>
      ) : (
        <Button
          type={"primary"}
          disabled={!getProviderStore.hasProvider}
          onClick={async () => {
            if (!getProviderStore.currentAccount) {
              await getProviderStore.connect();
            }
          }}
        >
          {renderShortAddress(getProviderStore.currentAccount) ||
            t("notConnected")}
        </Button>
      )}
    </Layout.Header>
  );
});

export default Header;
