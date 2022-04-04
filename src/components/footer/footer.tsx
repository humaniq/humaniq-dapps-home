import dayjs from "dayjs";
import React from "react";
import { Layout } from "antd";
import colors from "../../utils/colors"

const Footer = () => {
  return (
    <Layout.Footer style={ {
      textAlign: "center",
      backgroundColor: colors.bg
    } }>
      <span>
        Humaniq dApps React Boilerplate © {dayjs().year()}
      </span>
    </Layout.Footer>
  );
};

export default Footer;