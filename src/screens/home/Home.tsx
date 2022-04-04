import React, { useEffect, useRef } from "react"
import { observer } from "mobx-react"
import { Button, Card, Space, Typography, DatePicker, Avatar, Spin } from "antd"
import { useTranslation } from "react-i18next"
import HomeStore from "../../stores/home/homeStore"
import { dateFormat } from "../../utils/general"
import { FormInput } from "../../components/input/FormInput"
import colors from "../../utils/colors"
import withStore from "../../hoc/withStore"

export interface HomeScreenInterface {
  store: HomeStore
}

const HomeImpl = ({ store: homeStore }: HomeScreenInterface) => {
  const { t } = useTranslation()
  const inputGalleryRef = useRef<any>()

  useEffect(() => {
    ;(async () => {
      homeStore.setGalleryRef(inputGalleryRef)
      await homeStore.fetchProfile()
    })()

    return () => homeStore.onDestroy()
  }, [homeStore])

  if (homeStore.isFetching) {
    return (
      <Card style={ {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 300,
        borderWidth: 0
      } }>
        <Space direction={ "horizontal" }>
          <Spin/>
          <Typography.Title level={ 3 }>{ t("loading") }</Typography.Title>
        </Space>
      </Card>
    )
  }

  return (
    <Card style={ {
      textAlign: "center",
      marginBottom: 24,
      borderWidth: 0
    } }>
      <Space direction="vertical">
        <Typography.Title level={ 1 }>{ t("yourProfile") }</Typography.Title>

        <Avatar size={ 100 }
                src={ homeStore.avatar }/>

        <input onChange={ homeStore.onFileChoose } accept="image/*" type="file" id="file"
               ref={ inputGalleryRef }
               style={ { display: "none" } }/>
        <Button onClick={ homeStore.openFileExplorer } size={ "small" }
                style={ { marginBottom: 20 } }>{ t("changeAvatar") }</Button>

        <FormInput title={ t("firstName") } input={ homeStore.firstName }
                   onChange={ homeStore.setFirstName }
                   error={ homeStore.firstNameError }/>

        <FormInput title={ t("lastName") } input={ homeStore.lastName }
                   onChange={ homeStore.setLastName }
                   error={ homeStore.lastNameError }/>

        <FormInput title={ t("country") } input={ homeStore.country }
                   onChange={ homeStore.setCountry }
                   error={ homeStore.countryError }/>

        <FormInput title={ t("city") } input={ homeStore.city }
                   onChange={ homeStore.setCity }
                   error={ homeStore.cityError }/>

        <Space direction="vertical" size={ 12 }>
          <Typography.Text>{ t("birthDate") }</Typography.Text>
          <DatePicker
            onChange={ (value: any, dateString: string) => {
              homeStore.setBirthDate(dateString)
            } }
            style={ homeStore.birthDateError ? { borderWidth: 1, borderColor: colors.error } : {} }
            defaultValue={ homeStore.getBirthDate } format={ dateFormat }/>
        </Space>

        <Button onClick={ homeStore.onSubmit } size={ "large" } style={ { marginTop: 30, width: '100%' } }
                type="primary">
          { t("update") }
        </Button>
      </Space>
    </Card>
  )
}

export const Home = withStore(HomeStore, observer(HomeImpl))