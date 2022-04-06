import dayjs from "dayjs";
import React from "react";
import { Layout } from "antd";
import colors from "../../utils/colors";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        backgroundColor: colors.bg,
      }}
    >
      <span>
        {t("appName")} {dayjs().year()}
      </span>
    </Layout.Footer>
  );
};

export default Footer;
