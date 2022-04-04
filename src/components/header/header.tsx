import React from "react"
import { Layout } from "antd"
import { useTranslation } from "react-i18next"
import colors from "../../utils/colors"

const Header = () => {
  const { t } = useTranslation()

  return (
    <Layout.Header style={ {
      textAlign: "center",
      backgroundColor: colors.primary,
      color: colors.white
    } }>
      <span style={ {
        fontSize: 22
      } }>{ t("appName") }</span>
    </Layout.Header>
  )
}

export default Header