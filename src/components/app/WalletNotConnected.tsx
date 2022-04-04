import { Button, Layout, Typography } from "antd"
import React from "react"
import { useTranslation } from "react-i18next"

export interface WalletNotConnectedProps {
  onClick: () => {}
}

export const WalletNotConnected = ({ onClick }: WalletNotConnectedProps) => {
  const { t } = useTranslation()

  return (
    <Layout style={ {
      textAlign: "center",
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 300,
      marginBottom: 24,
      borderWidth: 0,
      marginRight: 30,
      marginLeft: 30
    } }>
      <Typography.Title level={ 3 }>{ t("walletNotConnected") }</Typography.Title>
      <Button onClick={ onClick } size={ "large" }
              style={ { marginTop: 30, width: '100%', height: 60 } }
              type="primary">
        { t("connectWallet") }
      </Button>
    </Layout>
  )
}