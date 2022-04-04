import { Layout, Typography } from "antd"
import React from "react"
import { useTranslation } from "react-i18next"

export const ProviderNotInjected = () => {
  const { t } = useTranslation()

  return (
    <Layout style={ {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 300,
      marginBottom: 24,
      borderWidth: 0
    } }>
      <Typography.Title level={ 3 }>{ t("notAllowed") }</Typography.Title>
    </Layout>
  )
}